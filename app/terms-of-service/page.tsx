
import styles from './page.module.css';

export const metadata = {
    title: 'Terms of Service | FlyCompense',
    description: 'Read the terms and conditions for using FlyCompense flight compensation services.',
};

export default function TermsOfService() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>Terms of Service</h1>
                    <p className={styles.heroSubtitle}>
                        Clear and transparent terms for our partnership in protecting your air passenger rights.
                    </p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.card}>
                    <span className={styles.lastUpdated}>Last updated: January 2026</span>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Introduction</h2>
                        <p>
                            These Terms of Service ("Terms") govern your use of the FlyCompense website and services.
                            By using our services, you agree to be bound by these Terms.
                        </p>
                        <p>
                            FlyCompense provides flight compensation claim services, helping passengers claim compensation
                            for flight disruptions under EU Regulation 261/2004 and other applicable regulations.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Definitions</h2>
                        <ul>
                            <li><strong>"FlyCompense," "we," "us," "our"</strong> refers to FlyCompense and its affiliates.</li>
                            <li><strong>"Customer," "you," "your"</strong> refers to the person using our services.</li>
                            <li><strong>"Services"</strong> refers to our flight compensation claim services.</li>
                            <li><strong>"Claim"</strong> refers to a compensation claim for a flight disruption.</li>
                            <li><strong>"Compensation"</strong> refers to the monetary amount recovered from an airline.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Our Services</h2>
                        <p>FlyCompense provides the following services:</p>
                        <ul>
                            <li>Assessment of flight compensation eligibility</li>
                            <li>Preparation and submission of compensation claims to airlines</li>
                            <li>Communication and negotiation with airlines on your behalf</li>
                            <li>Legal action when necessary to recover compensation</li>
                            <li>Processing and transfer of compensation payments</li>
                        </ul>
                        <p>
                            We operate on a "No Win, No Fee" basis. You only pay our service fee if we successfully
                            recover compensation on your behalf.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Service Fee</h2>
                        <p>
                            Our service fee is <strong>25% (plus applicable VAT)</strong> of the compensation amount successfully recovered.
                            This fee is deducted from the compensation before payment is transferred to you.
                        </p>
                        <p>
                            If legal action is required to recover your compensation, an additional legal action fee of
                            up to 25% may apply. If we are unsuccessful in recovering compensation, you owe us nothing.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Assignment of Claim</h2>
                        <p>
                            By submitting a claim through FlyCompense, you authorize us to act on your behalf and assign
                            the compensation claim to us. This assignment allows us to:
                        </p>
                        <ul>
                            <li>Communicate with the airline in your name</li>
                            <li>Accept or reject settlement offers</li>
                            <li>Initiate legal proceedings if necessary</li>
                            <li>Receive compensation payments on your behalf</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Your Obligations</h2>
                        <p>When using our services, you agree to:</p>
                        <ul>
                            <li>Provide accurate and complete information</li>
                            <li>Not pursue the same claim independently while we handle it</li>
                            <li>Inform us of any direct communication from the airline</li>
                            <li>Provide necessary documents (booking confirmation, ID, etc.)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Payment Terms</h2>
                        <p>
                            Upon successful recovery of compensation, we will transfer the net amount (compensation minus
                            our fees) to your designated bank account within 5 business days.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Governing Law</h2>
                        <p>
                            These Terms are governed by and construed in accordance with the laws of the European Union.
                            Any disputes shall be submitted to the exclusive jurisdiction of the courts in Luxembourg.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
