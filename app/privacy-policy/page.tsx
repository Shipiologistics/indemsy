
import styles from './page.module.css';

export const metadata = {
    title: 'Privacy Policy | FlyCompense',
    description: 'Learn how FlyCompense collects, uses, and protects your personal data.',
};

export default function PrivacyPolicy() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>Privacy Policy</h1>
                    <p className={styles.heroSubtitle}>
                        Your trust is our most important asset. Learn how we handle your data with care and transparency.
                    </p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.card}>
                    <span className={styles.lastUpdated}>Last updated: January 2026</span>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Introduction</h2>
                        <p>
                            Welcome to FlyCompense ("we," "our," or "us"). We are committed to protecting your personal data
                            and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
                            safeguard your information when you use our website and services.
                        </p>
                        <p>
                            FlyCompense is a flight compensation claim service that helps passengers claim compensation for
                            delayed, cancelled, or overbooked flights under EU Regulation 261/2004 and other applicable laws.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Data Controller</h2>
                        <p>
                            FlyCompense is the data controller responsible for your personal data. If you have any questions
                            about this Privacy Policy or our data practices, please contact us at:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> contact@flycompense.com</li>
                            <li><strong>Address:</strong> 26 Boulevard Royal, L-2449 Luxembourg, Luxembourg</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul>
                            <li><strong>Personal Identification:</strong> Name, email address, phone number, postal address</li>
                            <li><strong>Travel Information:</strong> Flight details, booking references, airline information, travel dates</li>
                            <li><strong>Identity Documents:</strong> Passport or ID copies (when required for claims)</li>
                            <li><strong>Financial Information:</strong> Bank account details for compensation payments</li>
                            <li><strong>Communication Data:</strong> Correspondence with us and airlines</li>
                        </ul>
                        <p>We also automatically collect certain information when you visit our website:</p>
                        <ul>
                            <li><strong>IP Address:</strong> Basic device and connection information</li>
                            <li><strong>Browser:</strong> Type and version for compatibility details</li>
                            <li><strong>Usage:</strong> Pages visited and time spent</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. How We Use Your Information</h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul>
                            <li>To process and manage your compensation claims</li>
                            <li>To communicate with airlines on your behalf</li>
                            <li>To verify your identity and eligibility for compensation</li>
                            <li>To process compensation payments</li>
                            <li>To improve our services and website functionality</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Legal Basis for Processing</h2>
                        <p>We process your personal data based on the following legal grounds:</p>
                        <ul>
                            <li><strong>Contract Performance:</strong> Processing necessary to fulfill our service agreement</li>
                            <li><strong>Legal Obligation:</strong> Processing required to comply with applicable laws</li>
                            <li><strong>Legitimate Interest:</strong> Processing necessary for our business interests</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Data Sharing</h2>
                        <p>We may share your personal data with:</p>
                        <ul>
                            <li><strong>Airlines:</strong> To pursue your compensation claim</li>
                            <li><strong>Legal Partners:</strong> Law firms and legal representatives handling claims</li>
                            <li><strong>Payment Processors:</strong> To process compensation payments</li>
                        </ul>
                        <p>We do not sell your personal data to third parties.</p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Data Retention</h2>
                        <p>
                            We retain your personal data for as long as necessary to fulfill the purposes outlined in this
                            Privacy Policy. Typically, claim-related data is retained for 10 years after resolution to comply with legal requirements.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us:</p>
                        <ul>
                            <li><strong>Email:</strong> contact@flycompense.com</li>
                            <li><strong>Website:</strong> www.flycompense.com</li>
                        </ul>
                    </section>
                </div>
            </div>
        </main>
    );
}
