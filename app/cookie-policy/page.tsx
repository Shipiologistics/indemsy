
import styles from './page.module.css';

export const metadata = {
    title: 'Cookie Policy | FlyCompense',
    description: 'Learn how FlyCompense uses cookies to improve your experience.',
};

export default function CookiePolicy() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>Cookie Policy</h1>
                    <p className={styles.heroSubtitle}>
                        We use cookies to enhance your experience and ensure our website works as intended.
                    </p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.card}>
                    <span className={styles.lastUpdated}>Last updated: January 2026</span>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. What are Cookies?</h2>
                        <p>
                            Cookies are small text files that are stored on your computer or mobile device when you
                            visit our website. They are widely used to make websites work or work more efficiently,
                            as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. How We Use Cookies</h2>
                        <p>
                            FlyCompense uses cookies for various purposes: to enable certain functions, to provide
                            analytics, to store your preferences, and to enable advertisements delivery.
                        </p>

                        <div className={styles.tableContainer}>
                            <table className={styles.cookieTable}>
                                <thead>
                                    <tr>
                                        <th>Cookie Type</th>
                                        <th>Purpose</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>Session</strong></td>
                                        <td>Necessary for basic site navigation and security.</td>
                                        <td><span className={`${styles.tag} ${styles.tagEssential}`}>Essential</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Google Analytics</strong></td>
                                        <td>Helps us understand how visitors interact with our site.</td>
                                        <td><span className={`${styles.tag} ${styles.tagAnalytics}`}>Analytics</span></td>
                                    </tr>
                                    <tr>
                                        <td><strong>Facebook Pixel</strong></td>
                                        <td>Used to measure the impact of our advertising campaigns.</td>
                                        <td><span className={`${styles.tag} ${styles.tagMarketing}`}>Marketing</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Managing Cookies</h2>
                        <p>
                            Most web browsers allow some control of most cookies through the browser settings.
                            To find out more about cookies, including how to see what cookies have been set,
                            visit <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb' }}>www.aboutcookies.org</a>.
                        </p>
                        <p>
                            Please note that deleting or disabling essential cookies may affect the functionality
                            of certain parts of our website.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Contact Us</h2>
                        <p>
                            If you have any questions about our Cookie Policy, please contact us at:
                            <a href="mailto:privacy@flycompense.com" style={{ color: '#2563eb', fontWeight: 600, marginLeft: '0.5rem' }}>
                                privacy@flycompense.com
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
