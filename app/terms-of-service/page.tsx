import styles from '../privacy-policy/page.module.css';

export const metadata = {
    title: 'Terms of Service | Indemsy',
    description: 'Read the terms and conditions for using Indemsy flight compensation services.',
};

export default function TermsOfService() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Terms of Service</h1>
                <p className={styles.lastUpdated}>Last updated: January 2026</p>

                <section className={styles.section}>
                    <h2>1. Introduction</h2>
                    <p>
                        These Terms of Service ("Terms") govern your use of the Indemsy website and services.
                        By using our services, you agree to be bound by these Terms. Please read them carefully.
                    </p>
                    <p>
                        Indemsy provides flight compensation claim services, helping passengers claim compensation
                        for flight disruptions under EU Regulation 261/2004 and other applicable passenger rights regulations.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Definitions</h2>
                    <ul>
                        <li><strong>"Indemsy," "we," "us," "our"</strong> refers to Indemsy and its affiliates</li>
                        <li><strong>"Customer," "you," "your"</strong> refers to the person using our services</li>
                        <li><strong>"Services"</strong> refers to our flight compensation claim services</li>
                        <li><strong>"Claim"</strong> refers to a compensation claim for a flight disruption</li>
                        <li><strong>"Compensation"</strong> refers to the monetary amount recovered from an airline</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Our Services</h2>
                    <p>Indemsy provides the following services:</p>
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
                    <h2>4. Service Fee</h2>
                    <p>
                        Our service fee is 25% (plus applicable VAT) of the compensation amount successfully recovered.
                        This fee is deducted from the compensation before payment is transferred to you.
                    </p>
                    <p>
                        If legal action is required to recover your compensation, an additional legal action fee of
                        up to 25% may apply. You will be informed before any legal proceedings commence.
                    </p>
                    <p>
                        If we are unsuccessful in recovering compensation, you owe us nothing.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Assignment of Claim</h2>
                    <p>
                        By submitting a claim through Indemsy, you authorize us to act on your behalf and assign
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
                    <h2>6. Your Obligations</h2>
                    <p>When using our services, you agree to:</p>
                    <ul>
                        <li>Provide accurate and complete information</li>
                        <li>Not pursue the same claim independently while we handle it</li>
                        <li>Not engage another company for the same claim</li>
                        <li>Respond promptly to our requests for information</li>
                        <li>Inform us of any direct communication from the airline</li>
                        <li>Provide necessary documents (booking confirmation, boarding passes, ID)</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>7. Eligibility</h2>
                    <p>To use our services, you must:</p>
                    <ul>
                        <li>Be at least 18 years old or have parental consent</li>
                        <li>Have a valid compensation claim under applicable regulations</li>
                        <li>Not have already received compensation for the same claim</li>
                        <li>Have the legal right to claim (passenger or authorized representative)</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>8. Payment Terms</h2>
                    <p>
                        Upon successful recovery of compensation, we will transfer the net amount (compensation minus
                        our fees) to your designated bank account within 5 business days.
                    </p>
                    <p>
                        You are responsible for providing accurate bank details. We are not liable for delays or
                        losses caused by incorrect payment information.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>9. Cancellation</h2>
                    <p>
                        You may cancel your claim at any time before compensation is received. However, if you cancel
                        after we have invested significant resources or initiated legal proceedings, a cancellation
                        fee may apply.
                    </p>
                    <p>
                        If you accept a direct offer from the airline without our involvement after submitting a
                        claim to us, our full service fee remains payable.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>10. Limitation of Liability</h2>
                    <p>
                        Indemsy's liability is limited to the amount of our service fee. We are not responsible for:
                    </p>
                    <ul>
                        <li>Unsuccessful claims or rejected claims by airlines</li>
                        <li>Delays in processing caused by airlines or courts</li>
                        <li>Loss of potential compensation due to ineligibility</li>
                        <li>Indirect or consequential damages</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>11. Intellectual Property</h2>
                    <p>
                        All content on the Indemsy website, including text, graphics, logos, and software, is the
                        property of Indemsy and protected by intellectual property laws. You may not reproduce,
                        distribute, or create derivative works without our permission.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>12. Governing Law</h2>
                    <p>
                        These Terms are governed by and construed in accordance with the laws of the European Union.
                        Any disputes shall be submitted to the exclusive jurisdiction of the courts in [Jurisdiction].
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>13. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these Terms at any time. Changes will be effective upon posting
                        to our website. Continued use of our services constitutes acceptance of the updated Terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>14. Contact</h2>
                    <p>For questions about these Terms, please contact us:</p>
                    <ul>
                        <li>Email: legal@indemsy.com</li>
                        <li>Website: www.indemsy.com</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
