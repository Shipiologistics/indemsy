
'use client';

import { useState } from 'react';
import styles from './page.module.css';

export default function ContactUs() {
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
                setStatus('error'); // Need to handle error state in UI or just alert
                alert('Something went wrong. Please try again.');
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
                    <h1 className={styles.heroTitle}>Get in Touch</h1>
                    <p className={styles.heroSubtitle}>
                        Have questions about your claim or need legal assistance?
                        Our team of experts is here to help you every step of the way.
                    </p>
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
                                <h3>Email Us</h3>
                                <p>General Inquiries:</p>
                                <a href="mailto:contact@flycompense.com">contact@flycompense.com</a>
                                <p style={{ marginTop: '0.5rem' }}>Support:</p>
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
                                <h3>Call Us</h3>
                                <p>Mon - Fri, 9am - 6pm CET</p>
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
                                <h3>Visit Us</h3>
                                <p>
                                    FlyCompense headquarters<br />
                                    123 Aviation Boulevard<br />
                                    L-1234 Luxembourg
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className={styles.formCard}>
                        <h2 className={styles.formTitle}>Send a Message</h2>
                        <p className={styles.formSubtitle}>Fill out the form below and we'll get back to you within 24 hours.</p>

                        <form onSubmit={handleSubmit}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={styles.inputField}
                                    placeholder="Jane Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={styles.inputField}
                                    placeholder="jane@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className={styles.inputField}
                                    placeholder="Claim status update"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className={styles.textareaField}
                                    placeholder="How can we help you?"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className={styles.submitButton} disabled={status === 'sending'}>
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    'Message Sent! ✓'
                                ) : (
                                    <>
                                        Send Message
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
                    <div className={styles.featureBox}>
                        <span className={styles.featureIcon}>⚡</span>
                        <h4>Fast Response</h4>
                        <p>Our average response time for support queries is less than 24 business hours.</p>
                    </div>
                    <div className={styles.featureBox}>
                        <span className={styles.featureIcon}>⚖️</span>
                        <h4>Legal Support</h4>
                        <p>Direct access to our legal team handles complex airline negotiations for you.</p>
                    </div>
                    <div className={styles.featureBox}>
                        <span className={styles.featureIcon}>🛡️</span>
                        <h4>Secure Communication</h4>
                        <p>All your data and communications are encrypted and 100% GDPR compliant.</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
