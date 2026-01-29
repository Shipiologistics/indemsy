
import { getLocale } from 'next-intl/server';
import styles from './page.module.css';

export const metadata = {
    title: 'Cookie Policy | FlyCompense',
    description: 'Learn how FlyCompense uses cookies to improve your experience.',
};

type Locale = 'en' | 'fr';

const localizedContent = {
    en: {
        heroTitle: 'Cookie Policy',
        heroSubtitle: 'We use cookies to enhance your experience and ensure our website works as intended.',
        lastUpdated: 'Last updated: January 2026',
        sections: [
            {
                title: '1. What are Cookies?',
                paragraphs: [
                    'Cookies are small text files stored on your device when you visit a website. They help websites function properly, remember preferences, and provide insights to site owners.',
                ],
            },
            {
                title: '2. How We Use Cookies',
                paragraphs: ['FlyCompense uses cookies to keep essential features running, understand how visitors interact with the site, and improve marketing relevance.'],
                table: {
                    columns: ['Cookie Type', 'Purpose', 'Category'],
                    rows: [
                        { name: 'Session', purpose: 'Necessary for basic navigation, security, and keeping you logged in.', tag: 'Essential', tagClass: styles.tagEssential },
                        { name: 'Google Analytics', purpose: 'Measures traffic and usage patterns so we can improve the experience.', tag: 'Analytics', tagClass: styles.tagAnalytics },
                        { name: 'Facebook Pixel', purpose: 'Helps evaluate the effectiveness of our advertising campaigns.', tag: 'Marketing', tagClass: styles.tagMarketing },
                    ],
                },
            },
            {
                title: '3. Managing Cookies',
                paragraphs: [
                    'Most browsers let you control cookies through their settings. To learn more, including how to see the cookies that have been set, visit www.aboutcookies.org.',
                    'Deleting or disabling essential cookies may prevent parts of our site from working correctly.',
                ],
                linkLabel: 'www.aboutcookies.org',
            },
            {
                title: '4. Contact Us',
                paragraphs: ['If you have any questions about this Cookie Policy, write to privacy@flycompense.com.'],
                email: 'privacy@flycompense.com',
            },
        ],
    },
    fr: {
        heroTitle: 'Politique des cookies',
        heroSubtitle: 'Nous utilisons des cookies pour garantir le bon fonctionnement du site et améliorer votre expérience.',
        lastUpdated: 'Dernière mise à jour : janvier 2026',
        sections: [
            {
                title: '1. Qu’est-ce qu’un cookie ?',
                paragraphs: [
                    'Les cookies sont de petits fichiers texte enregistrés sur votre appareil lorsque vous consultez un site web. Ils permettent au site de fonctionner correctement, de mémoriser vos préférences et d’apporter des informations aux éditeurs.',
                ],
            },
            {
                title: '2. Comment nous utilisons les cookies',
                paragraphs: ['FlyCompense utilise des cookies pour assurer les fonctions essentielles, analyser la fréquentation et adapter nos communications marketing.'],
                table: {
                    columns: ['Type de cookie', 'Objectif', 'Catégorie'],
                    rows: [
                        { name: 'Session', purpose: 'Indispensable pour la navigation, la sécurité et le maintien de votre session.', tag: 'Essentiel', tagClass: styles.tagEssential },
                        { name: 'Google Analytics', purpose: 'Mesure la fréquentation et les parcours afin d’améliorer l’expérience.', tag: 'Analyse', tagClass: styles.tagAnalytics },
                        { name: 'Facebook Pixel', purpose: 'Évalue l’efficacité de nos campagnes publicitaires.', tag: 'Marketing', tagClass: styles.tagMarketing },
                    ],
                },
            },
            {
                title: '3. Gérer vos cookies',
                paragraphs: [
                    'La plupart des navigateurs vous permettent de contrôler les cookies via leurs paramètres. Pour en savoir plus, y compris consulter les cookies déposés, rendez-vous sur www.aboutcookies.org.',
                    'La suppression ou la désactivation des cookies essentiels peut limiter certaines fonctionnalités du site.',
                ],
                linkLabel: 'www.aboutcookies.org',
            },
            {
                title: '4. Contact',
                paragraphs: ['Pour toute question concernant cette politique, écrivez-nous à privacy@flycompense.com.'],
                email: 'privacy@flycompense.com',
            },
        ],
    },
} satisfies Record<Locale, any>;

export default async function CookiePolicy() {
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

                            {section.table && (
                                <div className={styles.tableContainer}>
                                    <table className={styles.cookieTable}>
                                        <thead>
                                            <tr>
                                                {section.table.columns.map((col) => (
                                                    <th key={col}>{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {section.table.rows.map((row) => (
                                                <tr key={row.name}>
                                                    <td><strong>{row.name}</strong></td>
                                                    <td>{row.purpose}</td>
                                                    <td>
                                                        <span className={`${styles.tag} ${row.tagClass}`}>{row.tag}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {section.linkLabel && (
                                <p>
                                    <a
                                        href="https://www.aboutcookies.org"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: '#2563eb' }}
                                    >
                                        {section.linkLabel}
                                    </a>
                                </p>
                            )}

                            {section.email && (
                                <p>
                                    <a
                                        href={`mailto:${section.email}`}
                                        style={{ color: '#2563eb', fontWeight: 600 }}
                                    >
                                        {section.email}
                                    </a>
                                </p>
                            )}
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
