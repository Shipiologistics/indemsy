
import styles from './page.module.css';

export const metadata = {
    title: 'Imprint - Legal Notice | FlyCompense',
    description: 'Legal information and company details for FlyCompense.',
};

export default function Imprint() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroPattern} />
                <div className={styles.container}>
                    <h1 className={styles.heroTitle}>Imprint & Legal Notice</h1>
                    <p className={styles.heroSubtitle}>
                        Transparency and legal compliance are fundamental to our mission of protecting air passenger rights.
                    </p>
                </div>
            </section>

            <div className={styles.container}>
                <div className={styles.card}>
                    {/* Company Details */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Company Information</h2>
                        <div className={styles.grid}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Company Name</span>
                                <div className={styles.infoValue}><strong>FlyCompense S.A.</strong></div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Legal Form</span>
                                <div className={styles.infoValue}>Société Anonyme</div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Registered Office</span>
                                <div className={styles.infoValue}>
                                    123 Aviation Boulevard<br />
                                    L-1234 Luxembourg<br />
                                    Grand Duchy of Luxembourg
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Registration</span>
                                <div className={styles.infoValue}>
                                    RCS Luxembourg: B123456<br />
                                    VAT ID: LU 98765432
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contact & Management */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Contact & Management</h2>
                        <div className={styles.grid}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Communication</span>
                                <div className={styles.infoValue}>
                                    Email: <a href="mailto:contact@flycompense.com" className={styles.link}>contact@flycompense.com</a><br />
                                    Phone: <a href="tel:0035227864487" className={styles.link}>+352 27 86 44 87</a><br />
                                    Web: <a href="https://www.flycompense.com" className={styles.link}>www.flycompense.com</a>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Represented By</span>
                                <div className={styles.infoValue}>
                                    <strong>Managing Directors:</strong><br />
                                    Jean Dupont, CEO<br />
                                    Sarah Meyer, COO
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Regulatory & Insurance */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Regulatory Details</h2>
                        <div className={styles.grid}>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>EU Compliance</span>
                                <div className={styles.infoValue}>
                                    FlyCompense operates as a professional claim service provider specialized in air passenger rights according to Regulation (EC) No 261/2004.
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <span className={styles.infoLabel}>Professional Liability</span>
                                <div className={styles.infoValue}>
                                    Insurer: EuroProtect Insurance S.A.<br />
                                    Policy No: EP-99887766<br />
                                    Scope: European Union & EEA
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Dispute Resolution */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Dispute Resolution</h2>
                        <div className={styles.infoValue}>
                            <p>
                                The European Commission provides a platform for online dispute resolution (ODR), which you can find here:
                                <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className={styles.link}> https://ec.europa.eu/consumers/odr</a>.
                            </p>
                            <p>
                                We are neither obligated nor willing to participate in dispute resolution proceedings before a consumer arbitration board.
                                We always strive to resolve any differences with our customers directly and amicably.
                            </p>
                        </div>
                    </section>

                    {/* Content & Copyright */}
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Legal Notices</h2>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Editorially Responsible</span>
                            <div className={styles.infoValue}>
                                <strong>Marco Weber</strong><br />
                                Head of Communications<br />
                                123 Aviation Boulevard, L-1234 Luxembourg
                            </div>
                        </div>
                        <div className={styles.disclaimerBox}>
                            <p className={styles.disclaimerText}>
                                <strong>Disclaimer:</strong> Despite careful control of the content, we assume no liability for the content of external links.
                                For the content of the linked pages, the operators are exclusively responsible.
                                The information provided on this website does not constitute legal advice.
                            </p>
                        </div>
                    </section>
                </div>

                <div className={styles.footerNote}>
                    <p>© {new Date().getFullYear()} FlyCompense S.A. All rights reserved.</p>
                </div>
            </div>
        </main>
    );
}
