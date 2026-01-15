import styles from './page.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

export const metadata = {
    title: 'Privacy Policy | Indemsy',
    description: 'Learn how Indemsy collects, uses, and protects your personal data.',
};

export default function PrivacyPolicy() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.lastUpdated}>Last updated: January 2026</p>

                    <section className={styles.section}>
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to Indemsy ("we," "our," or "us"). We are committed to protecting your personal data
                            and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
                            safeguard your information when you use our website and services.
                        </p>
                        <p>
                            Indemsy is a flight compensation claim service that helps passengers claim compensation for
                            delayed, cancelled, or overbooked flights under EU Regulation 261/2004 and other applicable laws.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>2. Data Controller</h2>
                        <p>
                            Indemsy is the data controller responsible for your personal data. If you have any questions
                            about this Privacy Policy or our data practices, please contact us at:
                        </p>
                        <ul>
                            <li>Email: privacy@indemsy.com</li>
                            <li>Address: [Company Address]</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>3. Information We Collect</h2>
                        <p>We collect information that you provide directly to us, including:</p>
                        <ul>
                            <li><strong>Personal Identification Information:</strong> Name, email address, phone number, postal address</li>
                            <li><strong>Travel Information:</strong> Flight details, booking references, airline information, travel dates</li>
                            <li><strong>Identity Documents:</strong> Passport or ID copies (when required for claims)</li>
                            <li><strong>Financial Information:</strong> Bank account details for compensation payments</li>
                            <li><strong>Communication Data:</strong> Correspondence with us and airlines</li>
                        </ul>
                        <p>We also automatically collect certain information when you visit our website:</p>
                        <ul>
                            <li>IP address and device information</li>
                            <li>Browser type and version</li>
                            <li>Pages visited and time spent</li>
                            <li>Referral source</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>4. How We Use Your Information</h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul>
                            <li>To process and manage your compensation claims</li>
                            <li>To communicate with airlines on your behalf</li>
                            <li>To verify your identity and eligibility for compensation</li>
                            <li>To send you updates about your claim status</li>
                            <li>To process compensation payments</li>
                            <li>To improve our services and website functionality</li>
                            <li>To comply with legal obligations</li>
                            <li>To send marketing communications (with your consent)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>5. Legal Basis for Processing</h2>
                        <p>We process your personal data based on the following legal grounds:</p>
                        <ul>
                            <li><strong>Contract Performance:</strong> Processing necessary to fulfill our service agreement with you</li>
                            <li><strong>Legal Obligation:</strong> Processing required to comply with applicable laws</li>
                            <li><strong>Legitimate Interest:</strong> Processing necessary for our legitimate business interests</li>
                            <li><strong>Consent:</strong> Processing based on your explicit consent (e.g., marketing communications)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2>6. Data Sharing</h2>
                        <p>We may share your personal data with:</p>
                        <ul>
                            <li><strong>Airlines:</strong> To pursue your compensation claim</li>
                            <li><strong>Legal Partners:</strong> Law firms and legal representatives handling claims</li>
                            <li><strong>Payment Processors:</strong> To process compensation payments</li>
                            <li><strong>Regulatory Authorities:</strong> When required by law</li>
                            <li><strong>Service Providers:</strong> Third parties who assist in operating our services</li>
                        </ul>
                        <p>We do not sell your personal data to third parties.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>7. Data Retention</h2>
                        <p>
                            We retain your personal data for as long as necessary to fulfill the purposes outlined in this
                            Privacy Policy, unless a longer retention period is required by law. Typically, claim-related
                            data is retained for 10 years after the claim is resolved to comply with legal requirements.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>8. Your Rights</h2>
                        <p>Under GDPR and applicable data protection laws, you have the right to:</p>
                        <ul>
                            <li><strong>Access:</strong> Request a copy of your personal data</li>
                            <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                            <li><strong>Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                            <li><strong>Restriction:</strong> Request limitation of data processing</li>
                            <li><strong>Portability:</strong> Receive your data in a portable format</li>
                            <li><strong>Objection:</strong> Object to certain types of processing</li>
                            <li><strong>Withdraw Consent:</strong> Withdraw previously given consent</li>
                        </ul>
                        <p>To exercise these rights, please contact us at privacy@indemsy.com.</p>
                    </section>

                    <section className={styles.section}>
                        <h2>9. Cookies</h2>
                        <p>
                            We use cookies and similar tracking technologies to enhance your experience on our website.
                            For more information, please see our <a href="/cookie-policy">Cookie Policy</a>.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>10. Data Security</h2>
                        <p>
                            We implement appropriate technical and organizational measures to protect your personal data
                            against unauthorized access, alteration, disclosure, or destruction. This includes encryption,
                            secure servers, and regular security assessments.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>11. International Transfers</h2>
                        <p>
                            Your data may be transferred to and processed in countries outside the European Economic Area.
                            We ensure appropriate safeguards are in place, such as Standard Contractual Clauses, to protect
                            your data during such transfers.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>12. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any material changes
                            by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>13. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us:</p>
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
