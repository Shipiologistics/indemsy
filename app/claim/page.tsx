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
                        <img
                            src="/ChatGPT_Image_Jan_20__2026__02_21_19_PM-removebg-preview.png"
                            alt="FlyCompense"
                            className={styles.logoImage}
                        />
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
                            {[
                                { name: "L'essentiel", url: "https://www.lessentiel.lu/fr", logo: "/media/lessentiel.svg" },
                                { name: "Virgule", url: "https://www.virgule.lu/", logo: "/media/virgule.svg" },
                                { name: "Le Quotidien", url: "https://lequotidien.lu/", logo: "/media/lequotidien.svg" },
                                { name: "Paperjam", url: "https://paperjam.lu/", logo: "/media/paperjam.svg" },
                                { name: "RTL", url: "https://www.rtl.lu/", logo: "/media/rtl.svg" }
                            ].map((media) => (
                                <img
                                    key={media.name}
                                    src={media.logo}
                                    alt={media.name}
                                    className={styles.mediaLogo}
                                />
                            ))}
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
                        <Link href="/contact-us">{t('footer.help')}</Link>
                        <Link href="/terms">{t('footer.terms')}</Link>
                        <Link href="/privacy-policy">{t('footer.privacy')}</Link>
                    </div>
                    <div className={styles.footerTrust}>

                        <span>{t('footer.copyright')}</span>
                    </div>
                </footer>
            </main>
        </div>
    );
}
