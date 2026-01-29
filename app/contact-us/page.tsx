'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import styles from './page.module.css';

type Locale = 'en' | 'fr';

const localizedCopy = {
    en: {
        heroTitle: 'Get in Touch',
        heroSubtitle: 'Have questions about your claim or need legal assistance? Our team of experts is here to help you every step of the way.',
        emailCard: {
            title: 'Email Us',
            generalLabel: 'General Inquiries:',
            supportLabel: 'Support:',
        },
        callCard: {
            title: 'Call Us',
            hours: 'Mon - Fri, 9am - 6pm CET',
        },
        visitCard: {
            title: 'Visit Us',
            line1: 'FlyCompense headquarters',
            line2: '26 Boulevard Royal',
            line3: 'Luxembourg, Luxembourg, 2449',
        },
        formTitle: 'Send a Message',
        formSubtitle: "Fill out the form below and we'll get back to you within 24 hours.",
        formLabels: {
            name: 'Full Name',
            namePlaceholder: 'Jane Doe',
            email: 'Email Address',
            emailPlaceholder: 'jane@example.com',
            subject: 'Subject',
            subjectPlaceholder: 'Claim status update',
            message: 'Message',
            messagePlaceholder: 'How can we help you?',
        },
        buttonDefault: 'Send Message',
        buttonSending: 'Sending...',
        buttonSuccess: 'Message Sent! ✓',
        errorAlert: 'Something went wrong. Please try again.',
        features: [
            { icon: '⚡', title: 'Fast Response', description: 'Our average response time for support queries is less than 24 business hours.' },
            { icon: '⚖️', title: 'Legal Support', description: 'Direct access to our legal team handles complex airline negotiations for you.' },
            { icon: '🛡️', title: 'Secure Communication', description: 'All your data and communications are encrypted and 100% GDPR compliant.' },
        ],
        heroEyebrow: 'We reply fast',
    },
    fr: {
        heroTitle: 'Contactez-nous',
        heroSubtitle: 'Vous avez des questions sur votre dossier ou besoin d’assistance juridique ? Nos experts vous accompagnent à chaque étape.',
        emailCard: {
            title: 'Écrivez-nous',
            generalLabel: 'Questions générales :',
            supportLabel: 'Support :',
        },
        callCard: {
            title: 'Appelez-nous',
            hours: 'Lun - Ven, 9h - 18h (CET)',
        },
        visitCard: {
            title: 'Rendez-nous visite',
            line1: 'Siège FlyCompense',
            line2: '26 Boulevard Royal',
            line3: 'Luxembourg, Luxembourg, 2449',
        },
        formTitle: 'Envoyer un message',
        formSubtitle: 'Remplissez le formulaire et nous vous répondrons sous 24 heures.',
        formLabels: {
            name: 'Nom complet',
            namePlaceholder: 'Jeanne Dupont',
            email: 'Adresse e-mail',
            emailPlaceholder: 'jeanne@example.com',
            subject: 'Objet',
            subjectPlaceholder: 'Suivi de réclamation',
            message: 'Message',
            messagePlaceholder: 'Comment pouvons-nous vous aider ?',
        },
        buttonDefault: 'Envoyer',
        buttonSending: 'Envoi en cours...',
        buttonSuccess: 'Message envoyé ! ✓',
        errorAlert: 'Une erreur est survenue. Veuillez réessayer.',
        features: [
            { icon: '⚡', title: 'Réponse rapide', description: 'Nous répondons à la plupart des demandes en moins de 24 h ouvrées.' },
            { icon: '⚖️', title: 'Soutien juridique', description: 'Accès direct à notre équipe juridique pour les négociations complexes.' },
            { icon: '🛡️', title: 'Communication sécurisée', description: 'Vos données sont chiffrées et 100 % conformes au RGPD.' },
        ],
        heroEyebrow: 'Réponse rapide assurée',
    },
} satisfies Record<Locale, any>;

export default function ContactUs() {
    const locale = useLocale() as Locale;
    const copy = localizedCopy[locale] ?? localizedCopy.en;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('subject', formData.subject);
        formDataObj.append('message', formData.message);

        try {
            // Import dynamically or assume it's imported at top (better to import at top but let's do dynamic for minimal diff if possible, 
            // actually better to add import to top, but here I can only replace block. 
            // Wait, I can't easily add import to top with replace_file_content unless I replace top of file.
            // I'll assume I can use a relative import or I'll add the import in a separate call if needed, 
            // or just use `import('@/app/actions/submit-contact')` dynamic import if supported well for actions.
            // Actually, server actions must be imported. I should add the import line at the top first, or...
            // better yet, I will replace the whole file content or a large chunk to include imports?
            // "replace_file_content" is local.
            // I'll replace the top of the file to add import, then replace handleSubmit.
            // Let's assume I do two edits.)

            const { submitContactForm } = await import('@/app/actions/submit-contact');
            const result = await submitContactForm(formDataObj);

            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                console.error(result.error);
                setStatus('error');
                alert(copy.errorAlert);
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <span className={styles.heroEyebrow}>{copy.heroEyebrow}</span>
                    <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
                    <p className={styles.heroSubtitle}>{copy.heroSubtitle}</p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Left Column: Info */}
                    <div className={styles.infoColumn}>
                        <div className={styles.infoCard}>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <div className={styles.infoContent}>
                                <h3>{copy.emailCard.title}</h3>
                                <p>{copy.emailCard.generalLabel}</p>
                                <a href="mailto:contact@flycompense.com">contact@flycompense.com</a>
                                <p style={{ marginTop: '0.5rem' }}>{copy.emailCard.supportLabel}</p>
                                <a href="mailto:support@flycompense.com">support@flycompense.com</a>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div className={styles.infoContent}>
                                <h3>{copy.callCard.title}</h3>
                                <p>{copy.callCard.hours}</p>
                                <a href="tel:0035227864487">+352 27 86 44 87</a>
                            </div>
                        </div>

                        <div className={styles.infoCard}>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className={styles.infoContent}>
                                <h3>{copy.visitCard.title}</h3>
                                <p>
                                    {copy.visitCard.line1}<br />
                                    {copy.visitCard.line2}<br />
                                    {copy.visitCard.line3}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>{copy.formTitle}</h2>
                        <p className={styles.formSubtitle}>{copy.formSubtitle}</p>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">{copy.formLabels.name}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={styles.inputField}
                                    placeholder={copy.formLabels.namePlaceholder}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">{copy.formLabels.email}</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.inputField}
                                    placeholder={copy.formLabels.emailPlaceholder}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject">{copy.formLabels.subject}</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className={styles.inputField}
                                    placeholder={copy.formLabels.subjectPlaceholder}
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message">{copy.formLabels.message}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className={styles.textareaField}
                                    placeholder={copy.formLabels.messagePlaceholder}
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={status === 'sending'}>
                                {status === 'sending' ? (
                                    copy.buttonSending
                                ) : status === 'success' ? (
                                    copy.buttonSuccess
                                ) : (
                                    <>
                                        {copy.buttonDefault}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Additional Features Section */}
                <div className={styles.bottomSection}>
                    {copy.features.map((feature) => (
                        <div key={feature.title} className={styles.featureBox}>
                            <span className={styles.featureIcon}>{feature.icon}</span>
                            <h4>{feature.title}</h4>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
