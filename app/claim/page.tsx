'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import ClaimForm from '../components/ClaimForm/ClaimForm';
import styles from './page.module.css';

function LoadingSpinner() {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading claim form...</p>
        </div>
    );
}

export default function ClaimPage() {
    return (
        <div className={styles.page}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarContent}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>✈</span>
                        <span className={styles.logoText}>FlyCompensate</span>
                    </Link>

                    <nav className={styles.progressNav}>
                        <div className={`${styles.progressItem} ${styles.active}`}>
                            <div className={styles.progressDot}></div>
                            <span>Eligibility Check</span>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressDot}></div>
                            <span>Additional Information</span>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressDot}></div>
                            <span>Documents</span>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressDot}></div>
                            <span>Finish</span>
                        </div>
                    </nav>
                </div>

                <div className={styles.sidebarFooter}>
                    <div className={styles.featuredIn}>
                        <p>FlyCompensate has been featured in</p>
                        <div className={styles.featuredLogos}>
                            <span className={styles.washingtonPost}>The Washington Post</span>
                            <div className={styles.logoRow}>
                                <span className={styles.usaToday}>🔴 USA TODAY</span>
                                <span className={styles.wsj}>WSJ</span>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Shape */}
                    <div className={styles.decorativeShape}></div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.headerBadge}>
                        <span className={styles.checkIcon}>✓</span>
                        We enforce your rights as a consumer
                    </div>
                </header>

                <div className={styles.formContainer}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ClaimForm />
                    </Suspense>
                </div>

                <footer className={styles.footer}>
                    <div className={styles.footerLinks}>
                        <Link href="#">Help</Link>
                        <Link href="#">Terms and Conditions</Link>
                        <Link href="#">Privacy Policy</Link>
                    </div>
                    <div className={styles.footerTrust}>
                        <span className={styles.trustpilot}>Excellent ★★★★★ 229,860 reviews on ★ Trustpilot</span>
                        <span>© 2026 FlyCompensate</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
