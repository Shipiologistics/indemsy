'use client';

import { useEffect, useState } from 'react';
import styles from '../air-passenger-rights/page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function USARightsPage() {
    const t = useTranslations('usRights');
    const [activeSection, setActiveSection] = useState('essentiel');
    const navItems = [
        { id: 'essentiel', label: t('nav.essentiel') },
        { id: 'surbooking', label: t('nav.surbooking') },
        { id: 'retards', label: t('nav.retards') },
        { id: 'tissage', label: t('nav.tissage') }
    ];

    useEffect(() => {
        const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) setActiveSection(visible[0].target.id);
            },
            { rootMargin: '-35% 0px -50% 0px', threshold: [0, 1] }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [navItems]);

    return (
        <div className={styles.main}>
            <PastelHero
                title={t('heroTitle')}
                checkmarks={[
                    { icon: 'money', text: t('heroCheckmarks.amount') },
                    { icon: 'shield', text: t('heroCheckmarks.care') },
                    { icon: 'legal', text: t('heroCheckmarks.eu') }
                ]}
            />
            <div className={styles.container}>
                <div className={styles.pageGrid}>
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarInner}>
                            <h5 className={styles.sidebarTitle}>{t('sidebarTitle')}</h5>
                            <nav className={styles.sideNav}>
                                <ul>
                                    {navItems.map((item) => (
                                        <li key={item.id}>
                                            <a href={`#${item.id}`} className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>
                    <div className={styles.content}>
                        <section id="essentiel" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.essentiel.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.essentiel.p1')}</p>
                            </div>
                        </section>

                        <section id="surbooking" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.surbooking.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.surbooking.p1')}</p>
                            </div>
                        </section>

                        <section id="retards" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.retards.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.retards.p1')}</p>
                            </div>
                        </section>

                        <section id="tissage" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.tissage.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.tissage.p1')}</p>
                            </div>
                        </section>

                        <Link href="/claim"><button className={styles.ctaButton}>Check US Flight</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
