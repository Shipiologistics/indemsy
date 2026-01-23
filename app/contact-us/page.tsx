
import styles from '../privacy-policy/page.module.css';

export const metadata = {
    title: 'Contact Us | FlyCompense',
    description: 'Get in touch with FlyCompense for any questions about your flight compensation claim.',
};

export default function ContactUs() {
    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Contact Us</h1>
                <p className={styles.lastUpdated}>We're here to help</p>

                <section className={styles.section}>
                    <h2>Get in Touch</h2>
                    <p>
                        Have questions about your claim or our services? Our team is ready to assist you.
                    </p>
                    <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <strong>General Inquiries:</strong><br />
                            <a href="mailto:contact@flycompense.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
                                contact@flycompense.com
                            </a>
                        </li>
                        <li style={{ marginBottom: '1rem' }}>
                            <strong>Support:</strong><br />
                            <a href="mailto:support@flycompense.com" style={{ color: '#0066cc', textDecoration: 'none' }}>
                                support@flycompense.com
                            </a>
                        </li>
                        <li style={{ marginBottom: '1rem' }}>
                            <strong>Phone:</strong><br />
                            <a href="tel:0035227864487" style={{ color: '#0066cc', textDecoration: 'none' }}>
                                +352 27 86 44 87
                            </a>
                        </li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>Office Address</h2>
                    <p>
                        FlyCompense<br />
                        [Street Address]<br />
                        [City, Postal Code]<br />
                        Luxembourg
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>Business Hours</h2>
                    <p>
                        Monday - Friday: 9:00 AM - 6:00 PM (CET)<br />
                        Saturday - Sunday: Closed
                    </p>
                </section>
            </div>
        </div>
    );
}
