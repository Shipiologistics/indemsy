'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FaqAccordion from '../components/FaqAccordion/FaqAccordion';

export default function Page() {
    const t = useTranslations('airlinesPage');
    const h = useTranslations('header');
    const heroT = useTranslations('commonHero');
    const [activeSection, setActiveSection] = useState('summary');

    const navItems = [
        { id: 'summary', label: t('nav.summary') },
        { id: 'at-a-glance', label: t('nav.atAGlance') },
        { id: 'ec261', label: t('nav.ec261') },
        { id: 'delay', label: t('nav.delay') },
        { id: 'cancellation', label: t('nav.cancellation') },
        { id: 'overbooking', label: t('nav.overbooking') },
        { id: 'missed-connections', label: t('nav.missedConnections') },
        { id: 'strike', label: t('nav.strike') },
        { id: 'baggage', label: t('nav.baggage') },
        { id: 'airhelp-score', label: t('nav.airhelpScore') },
        { id: 'how-to-claim', label: t('nav.howToClaim') },
        { id: 'faq', label: t('nav.faq') },
    ];

    const faqItems = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
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
    }, []);

    return (
        <>
            <Header />
            <main className={styles.main}>
                <PastelHero
                    title={t('heroTitle')}
                    checkmarks={[
                        { icon: 'calendar', text: heroT('chips.years') },
                        { icon: 'globe', text: heroT('chips.global') },
                        { icon: 'legal', text: heroT('chips.negotiations') }
                    ]}
                />

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
                                <p className={styles.introText}>
                                    {t('summary.intro1')}
                                </p>
                                <p className={styles.introText}>
                                    {t('summary.intro2')}
                                </p>
                            </section>

                            <section id="at-a-glance" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('atAGlance.title')}</h2>
                                <ul>
                                    <li>{t('atAGlance.li1')}</li>
                                    <li>{t('atAGlance.li2')}</li>
                                    <li>{t('atAGlance.li3')}</li>
                                    <li>{t('atAGlance.li4')}</li>
                                </ul>
                            </section>

                            <section id="ec261" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('ec261.title')}</h2>
                                <p>
                                    {t('ec261.p1')}
                                </p>
                                <p className={styles.note}>
                                    {t('ec261.note')}
                                </p>

                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('ec261.table.itinerary')}</th>
                                            <th>{t('ec261.table.euCarrier')}</th>
                                            <th>{t('ec261.table.nonEuCarrier')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('ec261.table.row1')}</td>
                                            <td>{t('ec261.table.covered')}</td>
                                            <td>{t('ec261.table.covered')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('ec261.table.row2')}</td>
                                            <td>{t('ec261.table.covered')}</td>
                                            <td>{t('ec261.table.covered')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('ec261.table.row3')}</td>
                                            <td>{t('ec261.table.covered')}</td>
                                            <td>{t('ec261.table.notCovered')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('ec261.table.row4')}</td>
                                            <td>{t('ec261.table.notCovered')}</td>
                                            <td>{t('ec261.table.notCovered')}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3>{t('ec261.calc.title')}</h3>
                                <p className={styles.note}>{t('ec261.calc.note')}</p>
                                <div className={styles.calcGrid}>
                                    <div className={styles.calcCard}>
                                        <div className={styles.calcAmount}>€250</div>
                                        <div className={styles.calcLabel}>{t('ec261.calc.l1500')}</div>
                                    </div>
                                    <div className={styles.calcCard}>
                                        <div className={styles.calcAmount}>€400</div>
                                        <div className={styles.calcLabel}>{t('ec261.calc.l1500_3500')}</div>
                                    </div>
                                    <div className={styles.calcCard}>
                                        <div className={styles.calcAmount}>€600</div>
                                        <div className={styles.calcLabel}>{t('ec261.calc.l3500')}</div>
                                    </div>
                                </div>
                            </section>

                            <section id="delay" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('delay.title')}</h2>
                                <p className={styles.note}>{t('delay.note')}</p>
                                <ul>
                                    <li>{t('delay.li1')}</li>
                                    <li>{t('delay.li2')}</li>
                                    <li>{t('delay.li3')}</li>
                                    <li>{t('delay.li4')}</li>
                                </ul>
                                <p>
                                    {t('delay.p')}
                                </p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('delay.table.distance')}</th>
                                            <th>{t('delay.table.delay')}</th>
                                            <th>{t('delay.table.comp')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('delay.table.row1Dist')}</td>
                                            <td>{t('delay.table.row1Delay')}</td>
                                            <td>{t('delay.table.row1Comp')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('delay.table.row2Dist')}</td>
                                            <td>{t('delay.table.row2Delay')}</td>
                                            <td>{t('delay.table.row2Comp')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('delay.table.row3Dist')}</td>
                                            <td>{t('delay.table.row3Delay')}</td>
                                            <td>{t('delay.table.row3Comp')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('delay.table.row4Dist')}</td>
                                            <td>{t('delay.table.row4Delay')}</td>
                                            <td>{t('delay.table.row4Comp')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>

                            <section id="cancellation" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('cancellation.title')}</h2>
                                <p className={styles.note}>{t('cancellation.note1')}</p>
                                <ul>
                                    <li>{t('cancellation.li1')}</li>
                                    <li>{t('cancellation.li2')}</li>
                                    <li>{t('cancellation.li3')}</li>
                                    <li>{t('cancellation.li4')}</li>
                                    <li>{t('cancellation.li5')}</li>
                                </ul>
                                <p className={styles.note}>{t('cancellation.note2')}</p>
                            </section>

                            <section id="overbooking" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('overbooking.title')}</h2>
                                <p>
                                    {t('overbooking.p')}
                                </p>
                                <ul>
                                    <li>{t('overbooking.li1')}</li>
                                    <li>{t('overbooking.li2')}</li>
                                </ul>
                            </section>

                            <section id="missed-connections" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('missedConnections.title')}</h2>
                                <p>
                                    {t('missedConnections.p')}
                                </p>
                            </section>

                            <section id="strike" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('strike.title')}</h2>
                                <p className={styles.note}>{t('strike.note')}</p>
                                <ul>
                                    <li>{t('strike.li1')}</li>
                                    <li>{t('strike.li2')}</li>
                                    <li>{t('strike.li3')}</li>
                                    <li>{t('strike.li4')}</li>
                                    <li>{t('strike.li5')}</li>
                                </ul>
                                <p>
                                    {t('strike.p')}
                                </p>
                            </section>

                            <section id="baggage" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('baggage.title')}</h2>
                                <p>
                                    {t('baggage.p1')}
                                </p>
                                <p className={styles.note}>
                                    {t('baggage.note')}
                                </p>
                                <p>
                                    {t('baggage.p2')}
                                </p>
                            </section>

                            <section id="airhelp-score" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('airhelpScore.title')}</h2>
                                <p className={styles.note}>{t('airhelpScore.note')}</p>
                                <ul>
                                    <li>{t('airhelpScore.li1')}</li>
                                    <li>{t('airhelpScore.li2')}</li>
                                    <li>{t('airhelpScore.li3')}</li>
                                </ul>
                                <p>{t('airhelpScore.text')}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('airhelpScore.table.airline')}</th>
                                            <th>{t('airhelpScore.table.country')}</th>
                                            <th>{t('airhelpScore.table.score')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1. Brussels Airlines</td>
                                            <td>Belgium</td>
                                            <td>8.12/10</td>
                                        </tr>
                                        <tr>
                                            <td>2. Qatar Airways</td>
                                            <td>Qatar</td>
                                            <td>8.11/10</td>
                                        </tr>
                                        <tr>
                                            <td>3. United Airlines</td>
                                            <td>United States</td>
                                            <td>8.04/10</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>

                            <section id="how-to-claim" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('howToClaim.title')}</h2>
                                <p>
                                    {t('howToClaim.p')}
                                </p>
                                <ul>
                                    <li>{t('howToClaim.li1')}</li>
                                    <li>{t('howToClaim.li2')}</li>
                                    <li>{t('howToClaim.li3')}</li>
                                    <li>{t('howToClaim.li4')}</li>
                                </ul>
                                <p className={styles.note}>{t('howToClaim.note')}</p>
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
