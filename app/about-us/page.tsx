'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';

// SVG Icons
const GlobeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
);

const SearchIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

const ScaleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 16l0 4"></path>
        <path d="M8 16l0 4"></path>
        <rect x="4" y="4" width="16" height="12" rx="2"></rect>
        <path d="M4 8l16 0"></path>
    </svg>
); // Using a simplified representation or calculator/scale

const ShieldIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
);

const UsersIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const CheckIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

// Map indices to icons for "Who We Are"
const whoWeAreIcons = [
    <ScaleIcon key="scale" />,
    <SearchIcon key="search" />, // Rigor/Transparency
    <ShieldIcon key="shield" />, // No win no fee (Protection)
    <UsersIcon key="users" />,   // Thousands of passengers
];

export default function AboutUs() {
    const t = useTranslations('aboutUsPage');

    return (
        <div className={styles.mainContainer}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
                <div className={`${styles.blob} ${styles.blob1}`}></div>
                <div className={`${styles.blob} ${styles.blob2}`}></div>

                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{t('title')}</h1>
                    <p className={styles.heroDescription}>{t('description')}</p>
                    <div className={styles.heroRegulation}>
                        {t('regulations')}
                    </div>
                </div>
            </div>

            <div className={styles.sectionContainer}>
                {/* Section: Who We Are */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('whoWeAre.title')}</h2>
                    <p className={styles.sectionSubtitle}>{t('whoWeAre.description')}</p>

                    <div className={styles.cardGrid}>
                        {/* @ts-ignore */}
                        {t.raw('whoWeAre.points').map((point: string, index: number) => (
                            <div key={index} className={styles.featureCard}>
                                <div className={styles.cardIcon}>
                                    {whoWeAreIcons[index] || <GlobeIcon />}
                                </div>
                                <p className={styles.cardText}>{point}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section: How We Help */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>{t('howWeHelp.title')}</h2>
                    <p className={styles.sectionSubtitle}>{t('howWeHelp.description')}</p>

                    <div className={styles.stepsContainer}>
                        {/* @ts-ignore */}
                        {t.raw('howWeHelp.steps').map((step: string, index: number) => (
                            <div key={index} className={styles.stepCard}>
                                <span className={styles.stepNumber}>{index + 1}</span>
                                <p className={styles.stepText}>{step}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.stepsFooter}>
                        {t('howWeHelp.footer')}
                    </div>
                </section>

                {/* Section: Commitment */}
                <section className={`${styles.section} ${styles.commitmentSection}`}>
                    <div className={styles.commitmentContent}>
                        <h2 className={`${styles.sectionTitle} ${styles.commitmentTitle}`}>{t('commitment.title')}</h2>
                        <p className={styles.commitmentIntro}>{t('commitment.intro')}</p>

                        <div className={styles.commitmentGrid}>
                            {/* @ts-ignore */}
                            {t.raw('commitment.points').map((point: string, index: number) => (
                                <div key={index} className={styles.commitmentItem}>
                                    <div className={styles.checkIcon}>
                                        <CheckIcon />
                                    </div>
                                    <p>{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
