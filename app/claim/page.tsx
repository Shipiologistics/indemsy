'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import ClaimForm from '../components/ClaimForm/ClaimForm';
import styles from './page.module.css';

function LoadingSpinner() {
    const t = useTranslations('claimPage');
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>{t('loading')}</p>
        </div>
    );
}

export default function ClaimPage() {
    const t = useTranslations('claimPage');
    return (
        <div className={styles.page}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarContent}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoIcon}>✈</span>
                        <span className={styles.logoText}>FLYCOMPENSE</span>
                    </Link>

                    <nav className={styles.progressNav}>
                        <div className={`${styles.progressItem} ${styles.active}`}>
                            <div className={styles.progressDot}></div>
                            <span>{t('sidebar.eligibility')}</span>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressDot}></div>
                            <span>{t('sidebar.additionalInfo')}</span>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressDot}></div>
                            <span>{t('sidebar.documents')}</span>
                        </div>
                        <div className={styles.progressItem}>
                            <div className={styles.progressDot}></div>
                            <span>{t('sidebar.finish')}</span>
                        </div>
                    </nav>
                </div>

                <div className={styles.sidebarFooter}>
                    <div className={styles.featuredIn}>
                        <p>{t('sidebar.featuredIn')}</p>
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
                        {t('header.rights')}
                    </div>
                </header>

                <div className={styles.formContainer}>
                    <Suspense fallback={<LoadingSpinner />}>
                        <ClaimForm />
                    </Suspense>
                </div>

                <footer className={styles.footer}>
                    <div className={styles.footerLinks}>
                        <Link href="#">{t('footer.help')}</Link>
                        <Link href="#">{t('footer.terms')}</Link>
                        <Link href="#">{t('footer.privacy')}</Link>
                    </div>
                    <div className={styles.footerTrust}>

                        <span>{t('footer.copyright')}</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
