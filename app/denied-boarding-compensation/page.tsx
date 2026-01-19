'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FaqAccordion from '../components/FaqAccordion/FaqAccordion';
import PastelHero from '../components/PastelHero/PastelHero';

export default function Page() {
    const t = useTranslations('deniedBoarding');
    const [activeSection, setActiveSection] = useState('summary');

    const navItems = [
        { id: 'summary', label: t('nav.overview') },
        { id: 'eu', label: t('nav.eu') },

        { id: 'us', label: t('nav.us') },
        { id: 'international', label: t('nav.international') },
        { id: 'faq', label: t('nav.faq') },
    ];

    const faqItems = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
    ];

    useEffect(() => {
        const sectionIds = navItems.map((item) => item.id);
        const sections = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible.length > 0) {
                    setActiveSection(visible[0].target.id);
                }
            },
            {
                root: null,
                rootMargin: '-35% 0px -50% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, [navItems]);

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* New Pastel Hero Section */}
                <PastelHero title={t('heroTitle')} />

                <div className={styles.container}>
                    <div className={styles.pageGrid}>
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarInner}>
                                <h5 className={styles.sidebarTitle}>{t('heroTitle')}</h5>
                                <nav className={styles.sideNav} aria-label="In-page navigation">
                                    <ul>
                                        {navItems.map((item) => (
                                            <li key={item.id}>
                                                <a
                                                    href={`#${item.id}`}
                                                    className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                                                    onClick={() => setActiveSection(item.id)}
                                                >
                                                    {item.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        </aside>

                        <div className={styles.content}>
                            <section id="summary" className={styles.section}>
                                <p className={styles.introText}>{t('summary.p1')}</p>
                                <p className={styles.note}>{t('summary.note')}</p>
                            </section>

                            <section id="eu" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('eu.title')}</h2>
                                <p>{t('eu.p1')}</p>
                                <p>{t('eu.p2')}</p>
                                <ul>
                                    <li>{t('eu.liP2_1')}</li>
                                    <li>{t('eu.liP2_2')}</li>
                                </ul>
                                <p>{t('eu.p3')}</p>
                                <ol>
                                    <li>{t('eu.li1')}</li>
                                    <li>{t('eu.li2')}</li>
                                    <li>{t('eu.li3')}</li>
                                    <li>{t('eu.li4')}</li>
                                    <li>{t('eu.li5')}</li>
                                    <li>{t('eu.li6')}</li>
                                    <li>{t('eu.li7')}</li>
                                    <li>{t('eu.li8')}</li>
                                    <li>{t('eu.li9')}</li>
                                </ol>

                                <h3>{t('eu.tableTitle')}</h3>
                                <p>{t('eu.tableIntro')}</p>
                                <ul>
                                    <li>{t('eu.factor1')}</li>
                                    <li>{t('eu.factor2')}</li>
                                </ul>
                                <p>{t('eu.tableDesc')}</p>
                                <div className={styles.tableReflow}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>{t('eu.distHeader')}</th>
                                                <th>{t('eu.compHeader')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{t('eu.dist1')}</td>
                                                <td>{t('eu.comp1')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('eu.dist2')}</td>
                                                <td>{t('eu.comp2')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('eu.dist3')}</td>
                                                <td>{t('eu.comp3')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('eu.dist4')}</td>
                                                <td>{t('eu.comp4')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section id="us" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('us.title')}</h2>
                                <p>{t('us.p1')}</p>
                                <ol>
                                    <li>{t('us.li1')}</li>
                                    <li>{t('us.li2')}</li>
                                    <li>{t('us.li3')}</li>
                                    <li>{t('us.li4')}</li>
                                    <li>{t('us.li5')}</li>
                                    <li>{t('us.li6')}</li>
                                </ol>
                                <p className={styles.note}>{t('us.note')}</p>

                                <h3>{t('us.tableTitle')}</h3>
                                <p>{t('us.tableIntro')}</p>
                                <ul>
                                    <li>{t('us.factor1')}</li>
                                    <li>{t('us.factor2')}</li>
                                </ul>
                                <p>{t('us.p2')}</p>
                                <p>{t('us.tableDesc')}</p>
                                <div className={styles.tableReflow}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>{t('us.headerDelay')}</th>
                                                <th>{t('us.header01')}</th>
                                                <th>{t('us.header12')}</th>
                                                <th>{t('us.header24')}</th>
                                                <th>{t('us.header4Plus')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{t('us.rowDomestic')}</td>
                                                <td>{t('us.val0')}</td>
                                                <td>{t('us.val200')}</td>
                                                <td>{t('us.val400')}</td>
                                                <td>{t('us.val400')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('us.rowInternational')}</td>
                                                <td>{t('us.val0')}</td>
                                                <td>{t('us.val200Int')}</td>
                                                <td>{t('us.val200Int')}</td>
                                                <td>{t('us.val400Int')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </section>

                            <section id="international" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('international.title')}</h2>
                                <p>{t('international.p1')}</p>
                                <ol>
                                    <li>{t('international.li1')}</li>
                                    <li>{t('international.li2')}</li>
                                    <li>{t('international.li3')}</li>
                                    <li>{t('international.li4')}</li>
                                    <li>{t('international.li5')}</li>
                                </ol>
                                <p className={styles.note}>{t('international.note')}</p>
                            </section>

                            <section id="faq" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>
                                <FaqAccordion items={faqItems} />
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
