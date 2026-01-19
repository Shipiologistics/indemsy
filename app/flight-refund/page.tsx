'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FaqAccordion from '../components/FaqAccordion/FaqAccordion';

export default function Page() {
    const t = useTranslations('flightRefund');
    const tHero = useTranslations('commonHero');
    const tHeroMain = useTranslations('hero');
    const tHeader = useTranslations('header');
    const [activeSection, setActiveSection] = useState('summary');

    const navItems = [
        { id: 'summary', label: t('nav.summary') },
        { id: 'refund-or-comp', label: t('nav.when') },
        { id: 'cancellation-refund', label: t('nav.cancellation') },
        { id: 'delay-refund', label: t('nav.delay') },
        { id: 'changes-refunds', label: t('nav.changes') },
        { id: 'faq', label: t('nav.faq') },
        { id: 'why', label: t('nav.why') },
    ];

    const faqItems = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
        { question: t('faq.q5'), answer: t('faq.a5') },
        { question: t('faq.q6'), answer: t('faq.a6') },
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
                {/* New Hero Section with AirHelp-style layout */}
                {/* New Hero Section with AirHelp-style layout */}
                <PastelHero
                    title={t('heroTitle')}
                    checkmarks={[
                        { icon: 'money', text: tHero('chips.years') },
                        { icon: 'shield', text: tHero('chips.global') },
                        { icon: 'legal', text: tHero('chips.negotiations') }
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
                                <h2 className={styles.sectionTitle}>{t('summary.title')}</h2>
                                <p className={styles.introText}>{t('summary.p1')}</p>
                                <p className={styles.introText}>{t('summary.p2')}</p>
                            </section>

                            <section id="refund-or-comp" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('entitled.title')}</h2>

                                <h3 className={styles.subTitle}>{t('entitled.h3Refund')}</h3>
                                <p className={styles.note}>{t('entitled.noteRefund')}</p>
                                <ul>
                                    <li>{t('entitled.li1')}</li>
                                    <li>{t('entitled.li2')}</li>
                                    <li>{t('entitled.li3')}</li>
                                </ul>
                                <p>{t('entitled.p1')}</p>
                                <p>{t('entitled.p2')}</p>

                                <h3 className={styles.subTitle}>{t('entitled.h3Comp')}</h3>
                                <p className={styles.note}>{t('entitled.noteComp')}</p>
                                <ul>
                                    <li>{t('entitled.compLi1')}</li>
                                    <li>{t('entitled.compLi2')}</li>
                                    <li>{t('entitled.compLi3')}</li>
                                    <li>{t('entitled.compLi4')}</li>
                                    <li>{t('entitled.compLi5')}</li>
                                    <li>{t('entitled.compLi6')}</li>
                                    <li>{t('entitled.compLi7')}</li>
                                </ul>

                                <div className={styles.inlineCta}>
                                    <div>
                                        <div className={styles.inlineCtaTitle}>{t('inlineCta.title1')}</div>
                                        <div className={styles.inlineCtaChips}>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip1')}</span>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip2')}</span>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip3')}</span>
                                        </div>
                                    </div>
                                    <a className={styles.inlineCtaButton} href="#">{t('inlineCta.btn')}</a>
                                </div>
                            </section>

                            <section id="cancellation-refund" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('cancellation.title')}</h2>

                                <h3 className={styles.subTitle}>{t('cancellation.h3Can')}</h3>
                                <p>{t('cancellation.p1')}</p>
                                <ul>
                                    <li>{t('cancellation.li1')}</li>
                                    <li>{t('cancellation.li2')}</li>
                                    <li>{t('cancellation.li3')}</li>
                                </ul>
                                <p>{t('cancellation.p2')}</p>
                                <p>{t('cancellation.p3')}</p>
                                <p>{t('cancellation.p4')}</p>
                                <ul>
                                    <li>{t('cancellation.li4')}</li>
                                    <li>{t('cancellation.li5')}</li>
                                    <li>{t('cancellation.li6')}</li>
                                </ul>

                                <h3 className={styles.subTitle}>{t('cancellation.h3Add')}</h3>
                                <p>{t('cancellation.addP1')}</p>
                                <p>{t('cancellation.addP2')}</p>

                                <h3 className={styles.subTitle}>{t('cancellation.h3HowMuch')}</h3>
                                <p className={styles.note}>{t('cancellation.noteHowMuch')}</p>

                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('cancellation.thDist')}</th>
                                            <th>{t('cancellation.thLess2')}</th>
                                            <th>{t('cancellation.th23')}</th>
                                            <th>{t('cancellation.th34')}</th>
                                            <th>{t('cancellation.thMore4')}</th>
                                            <th>{t('cancellation.thNever')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('cancellation.dist1')}</td>
                                            <td>€125</td>
                                            <td>€250</td>
                                            <td>€250</td>
                                            <td>€250</td>
                                            <td>€250</td>
                                        </tr>
                                        <tr>
                                            <td>{t('cancellation.dist2')}</td>
                                            <td>€200</td>
                                            <td>€200</td>
                                            <td>€400</td>
                                            <td>€400</td>
                                            <td>€400</td>
                                        </tr>
                                        <tr>
                                            <td>{t('cancellation.dist3')}</td>
                                            <td>€200</td>
                                            <td>€200</td>
                                            <td>€400</td>
                                            <td>€400</td>
                                            <td>€400</td>
                                        </tr>
                                        <tr>
                                            <td>{t('cancellation.dist4')}</td>
                                            <td>€300</td>
                                            <td>€300</td>
                                            <td>€300</td>
                                            <td>€600</td>
                                            <td>€600</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3 className={styles.subTitle}>{t('cancellation.h3NotEntitled')}</h3>
                                <p>{t('cancellation.notEntP1')}</p>
                                <p>{t('cancellation.notEntP2')}</p>
                                <div className={styles.badListTitle}>{t('cancellation.extraTitle')}</div>
                                <ul className={styles.badList}>
                                    <li>❌ {t('cancellation.extraLi1')}</li>
                                    <li>❌ {t('cancellation.extraLi2')}</li>
                                    <li>❌ {t('cancellation.extraLi3')}</li>
                                    <li>❌ {t('cancellation.extraLi4')}</li>
                                </ul>
                                <p className={styles.note}>{t('cancellation.notEntNote')}</p>

                                <div className={styles.inlineCta}>
                                    <div>
                                        <div className={styles.inlineCtaTitle}>{t('inlineCta.title2')}</div>
                                        <div className={styles.inlineCtaChips}>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip1')}</span>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip2')}</span>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip3')}</span>
                                        </div>
                                    </div>
                                    <a className={styles.inlineCtaButton} href="#">{t('inlineCta.btn')}</a>
                                </div>
                            </section>

                            <section id="delay-refund" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('delay.title')}</h2>

                                <h3 className={styles.subTitle}>{t('delay.h3Can')}</h3>
                                <p>{t('delay.p1')}</p>
                                <p>{t('delay.p2')}</p>
                                <p>{t('delay.p3')}</p>
                                <p>{t('delay.p4')}</p>

                                <h3 className={styles.subTitle}>{t('delay.h3Add')}</h3>
                                <p>{t('delay.addP1')}</p>
                                <p>{t('delay.addP2')}</p>

                                <h3 className={styles.subTitle}>{t('delay.h3HowMuch')}</h3>
                                <p className={styles.note}>{t('delay.noteHowMuch')}</p>

                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('delay.thDelay')}</th>
                                            <th>{t('delay.thUnder3')}</th>
                                            <th>{t('cancellation.th23') /* Reuse some since they are the same */}</th>
                                            <th>{t('cancellation.th34')}</th>
                                            <th>{t('cancellation.thMore4')}</th>
                                            <th>{t('cancellation.thNever')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('cancellation.dist1')}</td>
                                            <td>❌ {t('delay.valNone')}</td>
                                            <td>✔️ €250</td>
                                            <td>✔️ €250</td>
                                            <td>✔️ €250</td>
                                            <td>✔️ €250</td>
                                        </tr>
                                        <tr>
                                            <td>{t('cancellation.dist2')}</td>
                                            <td>❌ {t('delay.valNone')}</td>
                                            <td>✔️ €400</td>
                                            <td>✔️ €400</td>
                                            <td>✔️ €400</td>
                                            <td>✔️ €400</td>
                                        </tr>
                                        <tr>
                                            <td>{t('cancellation.dist3')}</td>
                                            <td>❌ {t('delay.valNone')}</td>
                                            <td>✔️ €400</td>
                                            <td>✔️ €400</td>
                                            <td>✔️ €400</td>
                                            <td>✔️ €400</td>
                                        </tr>
                                        <tr>
                                            <td>{t('cancellation.dist4')}</td>
                                            <td>❌ {t('delay.valNone')}</td>
                                            <td>✔️ €300</td>
                                            <td>✔️ €600</td>
                                            <td>✔️ €600</td>
                                            <td>✔️ €600</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3 className={styles.subTitle}>{t('delay.h3NotEntitled')}</h3>
                                <p>{t('delay.notEntP1')}</p>
                                <div className={styles.badListTitle}>{t('cancellation.extraTitle')}</div>
                                <ul className={styles.badList}>
                                    <li>❌ {t('cancellation.extraLi1')}</li>
                                    <li>❌ {t('cancellation.extraLi2')}</li>
                                    <li>❌ {t('cancellation.extraLi3')}</li>
                                    <li>❌ {t('cancellation.extraLi4')}</li>
                                </ul>
                                <p>{t('delay.notEntP2')}</p>

                                <div className={styles.inlineCta}>
                                    <div>
                                        <div className={styles.inlineCtaTitle}>{t('inlineCta.title3')}</div>
                                        <div className={styles.inlineCtaChips}>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip1')}</span>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip2')}</span>
                                            <span className={styles.inlineChip}>{t('inlineCta.chip3')}</span>
                                        </div>
                                    </div>
                                    <a className={styles.inlineCtaButton} href="#">{t('inlineCta.btn')}</a>
                                </div>
                            </section>

                            <section id="changes-refunds" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('changes.title')}</h2>
                                <p>{t('changes.p1')}</p>

                                <h3 className={styles.subTitle}>{t('changes.h3Free')}</h3>
                                <p>{t('changes.freeP1')}</p>
                                <p>{t('changes.freeP2')}</p>

                                <h3 className={styles.subTitle}>{t('changes.h3Flex')}</h3>
                                <p>{t('changes.flexP1')}</p>
                                <p>{t('changes.flexP2')}</p>
                            </section>

                            <section id="faq" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>
                                <FaqAccordion items={faqItems} />
                            </section>

                            <section id="why" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('why.title')}</h2>
                                <p>{t('why.p1')}</p>
                                <p>{t('why.p2')}</p>
                            </section>
                        </div>
                    </div>

                    <section className={styles.bottomCta} aria-label="Bottom call to action">
                        <div className={styles.bottomCtaCard}>
                            <h2 className={styles.bottomCtaTitle}>{t('bottomCta.title')}</h2>
                            <div className={styles.bottomCtaChips}>
                                <span className={styles.bottomChip}>{t('inlineCta.chip1')}</span>
                                <span className={styles.bottomChip}>{t('inlineCta.chip2')}</span>
                                <span className={styles.bottomChip}>{t('inlineCta.chip3')}</span>
                            </div>
                            <a className={styles.bottomCtaButton} href="#">{t('inlineCta.btn')}</a>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
