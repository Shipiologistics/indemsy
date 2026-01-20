import styles from '../privacy-policy/page.module.css';

export const metadata = {
    title: 'Imprint - Legal Notice | Indemsy',
    description: 'Legal information and company details for Indemsy.',
};

export default function Imprint() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Imprint / Legal Notice</h1>
                <p className={styles.lastUpdated}>Company Information</p>

                <section className={styles.section}>
                    <h2>Company Details</h2>
                    <p>
                        <strong>Indemsy</strong><br />
                        Flight Compensation Services<br />
                        [Company Registration Number]<br />
                    </p>
                    <p>
                        <strong>Registered Address:</strong><br />
                        [Street Address]<br />
                        [City, Postal Code]<br />
                        [Country]
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Contact Information</h2>
                    <ul>
                        <li><strong>Email:</strong> contact@indemsy.com</li>
                        <li><strong>Phone:</strong> [Phone Number]</li>
                        <li><strong>Website:</strong> www.indemsy.com</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Management</h2>
                    <p>
                        <strong>Managing Directors:</strong><br />
                        [Director Name(s)]
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Registration</h2>
                    <ul>
                        <li><strong>Commercial Register:</strong> [Register Court], [Registration Number]</li>
                        <li><strong>VAT Identification Number:</strong> [VAT ID]</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Regulatory Information</h2>
                    <p>
                        Indemsy operates as a flight compensation claim service in accordance with EU Regulation
                        261/2004 and applicable national laws. We are committed to helping air passengers exercise
                        their rights to compensation for flight disruptions.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Professional Liability Insurance</h2>
                    <p>
                        <strong>Insurance Provider:</strong> [Insurance Company Name]<br />
                        <strong>Policy Number:</strong> [Policy Number]<br />
                        <strong>Geographic Scope:</strong> European Union and EEA
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Dispute Resolution</h2>
                    <p>
                        The European Commission provides an Online Dispute Resolution (ODR) platform for consumers.
                        You can access it at: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                            https://ec.europa.eu/consumers/odr</a>
                    </p>
                    <p>
                        We are committed to resolving any disputes amicably. Please contact us directly before
                        initiating any formal dispute resolution procedures.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Content Responsibility</h2>
                    <p>
                        <strong>Responsible for content according to § 55 Abs. 2 RStV:</strong><br />
                        [Responsible Person Name]<br />
                        [Address]
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Disclaimer</h2>
                    <p>
                        While we strive to keep the information on this website accurate and up-to-date, Indemsy
                        makes no warranties or representations regarding the completeness, accuracy, or reliability
                        of any information provided. The content is for general information purposes only and does
                        not constitute legal advice.
                    </p>
                    <p>
                        We are not responsible for the content of external websites linked from our site.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Copyright Notice</h2>
                    <p>
                        © {new Date().getFullYear()} Indemsy. All rights reserved. The content, design, and layout
                        of this website are protected by copyright and other intellectual property laws. Unauthorized
                        reproduction or distribution is prohibited.
                    </p>
                </section>
            </div>
        </div>
    );
}
