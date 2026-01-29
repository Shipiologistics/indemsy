
import { getLocale } from 'next-intl/server';
import styles from './page.module.css';

export const metadata = {
    title: 'Privacy Policy | FlyCompense',
    description: 'Learn how FlyCompense collects, uses, and protects your personal data.',
};

type Locale = 'en' | 'fr';

const localizedContent = {
    en: {
        heroTitle: 'Privacy Policy',
        heroSubtitle: 'Your trust is our most important asset. Learn how we handle your data with care and transparency.',
        lastUpdated: 'Last updated: January 2026',
        sections: [
            {
                title: '1. Introduction',
                paragraphs: [
                    'Welcome to FlyCompense ("we," "our," or "us"). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.',
                    'FlyCompense is a flight compensation claim service that helps passengers claim compensation for delayed, cancelled, or overbooked flights under EU Regulation 261/2004 and other applicable laws.',
                ],
            },
            {
                title: '2. Data Controller',
                paragraphs: [
                    'FlyCompense is the data controller responsible for your personal data. If you have any questions about this Privacy Policy or our data practices, please contact us at:',
                ],
                details: [
                    { label: 'Email', value: 'contact@flycompense.com' },
                    { label: 'Address', value: '26 Boulevard Royal, L-2449 Luxembourg, Luxembourg' },
                ],
            },
            {
                title: '3. Information We Collect',
                paragraphs: ['We collect information that you provide directly to us, including:'],
                bullets: [
                    'Personal identification (name, email address, phone number, postal address)',
                    'Travel information (flight details, booking references, airline information, travel dates)',
                    'Identity documents (passport or ID copies when required for claims)',
                    'Financial information (bank account details for compensation payments)',
                    'Communication data (correspondence with us and airlines)',
                ],
                extraParagraphs: ['We also automatically collect certain information when you visit our website:'],
                extraBullets: [
                    'IP address – basic device and connection information',
                    'Browser – type and version for compatibility details',
                    'Usage – pages visited and time spent on our platform',
                ],
            },
            {
                title: '4. How We Use Your Information',
                paragraphs: ['We use the collected information for the following purposes:'],
                bullets: [
                    'To process and manage your compensation claims',
                    'To communicate with airlines on your behalf',
                    'To verify your identity and eligibility for compensation',
                    'To process compensation payments',
                    'To improve our services and website functionality',
                ],
            },
            {
                title: '5. Legal Basis for Processing',
                paragraphs: ['We process your personal data based on the following legal grounds:'],
                bullets: [
                    'Contract performance – processing necessary to fulfill our service agreement',
                    'Legal obligation – processing required to comply with applicable laws',
                    'Legitimate interest – processing necessary for our business interests',
                ],
            },
            {
                title: '6. Data Sharing',
                paragraphs: ['We may share your personal data with:'],
                bullets: [
                    'Airlines, to pursue your compensation claim',
                    'Legal partners, including law firms and representatives handling claims',
                    'Payment processors, to send compensation payments',
                ],
                paragraphsAfterList: ['We do not sell your personal data to third parties.'],
            },
            {
                title: '7. Data Retention',
                paragraphs: [
                    'We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy. Typically, claim-related data is retained for 10 years after resolution to comply with legal requirements.',
                ],
            },
            {
                title: '8. Contact Us',
                paragraphs: ['If you have questions about this Privacy Policy, please contact us:'],
                details: [
                    { label: 'Email', value: 'contact@flycompense.com' },
                    { label: 'Website', value: 'www.flycompense.com' },
                ],
            },
        ],
    },
    fr: {
        heroTitle: 'Politique de confidentialité',
        heroSubtitle: 'Votre confiance est essentielle. Découvrez comment nous protégeons vos données avec transparence et rigueur.',
        lastUpdated: 'Dernière mise à jour : janvier 2026',
        sections: [
            {
                title: '1. Introduction',
                paragraphs: [
                    'Bienvenue chez FlyCompense (« nous »). Nous sommes engagés à protéger vos données personnelles et à respecter votre vie privée. La présente politique explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site et nos services.',
                    'FlyCompense aide les passagers à réclamer des indemnités pour les vols retardés, annulés ou surbookés conformément au règlement (CE) n°261/2004 et aux autres lois applicables.',
                ],
            },
            {
                title: '2. Responsable du traitement',
                paragraphs: ['FlyCompense est responsable du traitement de vos données personnelles. Pour toute question concernant la présente politique ou nos pratiques, contactez-nous :'],
                details: [
                    { label: 'E-mail', value: 'contact@flycompense.com' },
                    { label: 'Adresse', value: '26 Boulevard Royal, L-2449 Luxembourg, Luxembourg' },
                ],
            },
            {
                title: '3. Données collectées',
                paragraphs: ['Nous collectons les informations que vous nous fournissez directement :'],
                bullets: [
                    'Identité (nom, adresse e-mail, téléphone, adresse postale)',
                    'Informations de voyage (détails du vol, références de réservation, compagnie aérienne, dates)',
                    'Documents d’identité (passeport ou carte, lorsque nécessaire)',
                    'Informations financières (coordonnées bancaires pour le versement des indemnités)',
                    'Correspondances avec nous ou avec les compagnies aériennes',
                ],
                extraParagraphs: ['Nous collectons également automatiquement certaines données lors de votre visite :'],
                extraBullets: [
                    'Adresse IP – informations techniques de base',
                    'Navigateur – type et version pour garantir la compatibilité',
                    'Usage – pages consultées et durée de visite',
                ],
            },
            {
                title: '4. Utilisation de vos données',
                paragraphs: ['Nous utilisons vos informations pour :'],
                bullets: [
                    'Traiter et gérer vos demandes d’indemnisation',
                    'Communiquer avec les compagnies aériennes en votre nom',
                    'Vérifier votre identité et votre éligibilité',
                    'Effectuer les paiements d’indemnisation',
                    'Améliorer nos services et l’expérience sur le site',
                ],
            },
            {
                title: '5. Base légale du traitement',
                paragraphs: ['Nous traitons vos données sur les bases juridiques suivantes :'],
                bullets: [
                    'Exécution du contrat – nécessaire pour fournir nos services',
                    'Obligation légale – conforme aux lois applicables',
                    'Intérêt légitime – indispensable à notre activité',
                ],
            },
            {
                title: '6. Partage des données',
                paragraphs: ['Vos données peuvent être partagées avec :'],
                bullets: [
                    'Les compagnies aériennes pour défendre votre dossier',
                    'Nos partenaires juridiques (cabinets et représentants)',
                    'Les prestataires de paiement pour transférer les fonds',
                ],
                paragraphsAfterList: ['Nous ne vendons jamais vos données personnelles à des tiers.'],
            },
            {
                title: '7. Durée de conservation',
                paragraphs: ['Nous conservons vos données aussi longtemps que nécessaire pour atteindre les objectifs décrits. Les dossiers liés aux réclamations sont généralement conservés 10 ans après leur résolution pour respecter nos obligations légales.'],
            },
            {
                title: '8. Contact',
                paragraphs: ['Pour toute question concernant cette politique, contactez-nous :'],
                details: [
                    { label: 'E-mail', value: 'contact@flycompense.com' },
                    { label: 'Site web', value: 'www.flycompense.com' },
                ],
            },
        ],
    },
} satisfies Record<Locale, any>;

export default async function PrivacyPolicy() {
    const locale = (await getLocale()) as Locale;
    const copy = localizedContent[locale] ?? localizedContent.en;

    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>{copy.heroTitle}</h1>
                    <p className={styles.heroSubtitle}>{copy.heroSubtitle}</p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.card}>
                    <span className={styles.lastUpdated}>{copy.lastUpdated}</span>

                    {copy.sections.map((section) => (
                        <section key={section.title} className={styles.section}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>
                            {section.paragraphs?.map((paragraph, idx) => (
                                <p key={idx}>{paragraph}</p>
                            ))}

                            {section.details && (
                                <ul>
                                    {section.details.map((detail) => (
                                        <li key={detail.label}>
                                            <strong>{detail.label}:</strong> {detail.value}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {section.bullets && (
                                <ul>
                                    {section.bullets.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.extraParagraphs?.map((paragraph, idx) => (
                                <p key={`extra-${idx}`}>{paragraph}</p>
                            ))}

                            {section.extraBullets && (
                                <ul>
                                    {section.extraBullets.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            )}

                            {section.paragraphsAfterList?.map((paragraph, idx) => (
                                <p key={`after-${idx}`}>{paragraph}</p>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
