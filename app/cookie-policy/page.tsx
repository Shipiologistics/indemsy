import styles from '../privacy-policy/page.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const metadata = {
    title: 'Cookie Policy | Indemsy',
    description: 'Learn about how Indemsy uses cookies and similar technologies.',
};

export default function CookiePolicy() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Cookie Policy</h1>
                    <p className={styles.lastUpdated}>Last updated: January 2026</p>

                    <section className={styles.section}>
                        <h2>1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that are stored on your device when you visit a website.
                            They help websites remember your preferences and understand how you interact with the site.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>2. How We Use Cookies</h2>
                        <p>Indemsy uses cookies for the following purposes:</p>
                        <ul>
                            <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., session management, security)</li>
                            <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                            <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>3. Types of Cookies We Use</h2>

                        <h3>3.1 Essential Cookies</h3>
                        <p>These cookies are necessary for the website to function and cannot be disabled.</p>
                        <ul>
                            <li>Session cookies for maintaining your login state</li>
                            <li>Security cookies to prevent fraud</li>
                            <li>Load balancing cookies</li>
                        </ul>

                        <h3>3.2 Performance Cookies</h3>
                        <p>These cookies help us understand how visitors interact with our website.</p>
                        <ul>
                            <li>Google Analytics - to analyze website traffic and usage patterns</li>
                            <li>Hotjar - to understand user behavior through heatmaps</li>
                        </ul>

                        <h3>3.3 Functional Cookies</h3>
                        <p>These cookies enable enhanced functionality and personalization.</p>
                        <ul>
                            <li>Language preference cookies</li>
                            <li>User interface customization</li>
                            <li>Form auto-fill data</li>
                        </ul>

                        <h3>3.4 Marketing Cookies</h3>
                        <p>These cookies are used to track visitors across websites for advertising purposes.</p>
                        <ul>
                            <li>Facebook Pixel - for targeted advertising</li>
                            <li>Google Ads - for remarketing campaigns</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>4. Third-Party Cookies</h2>
                        <p>
                            Some cookies on our website are set by third-party services. We have no control over
                            these cookies. Third parties that may set cookies include:
                        </p>
                        <ul>
                            <li>Google (Analytics, Ads)</li>
                            <li>Facebook</li>
                            <li>Trustpilot</li>
                            <li>Payment processors</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>5. Managing Cookies</h2>
                        <p>
                            You can control and manage cookies in several ways:
                        </p>
                        <ul>
                            <li><strong>Browser Settings:</strong> Most browsers allow you to block or delete cookies through settings</li>
                            <li><strong>Cookie Consent Banner:</strong> Use our cookie consent tool to manage preferences</li>
                            <li><strong>Opt-Out Links:</strong> Many third-party services provide opt-out mechanisms</li>
                        </ul>
                        <p>
                            Please note that blocking certain cookies may impact website functionality.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>6. Cookie Retention</h2>
                        <p>Cookie retention periods vary:</p>
                        <ul>
                            <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
                            <li><strong>Persistent Cookies:</strong> Remain for a specified period (typically 1-24 months)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>7. Updates to This Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time. Any changes will be posted on this page
                            with an updated revision date.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>8. Contact Us</h2>
                        <p>If you have questions about our use of cookies, please contact us:</p>
                        <ul>
                            <li>Email: privacy@indemsy.com</li>
                            <li>Website: www.indemsy.com</li>
                        </ul>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
