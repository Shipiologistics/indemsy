'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FaqAccordion from '../components/FaqAccordion/FaqAccordion';

export default function Page() {
    const t = useTranslations('missedConnection');
    const tHero = useTranslations('commonHero');
    const tHeroMain = useTranslations('hero');
    const tHeader = useTranslations('header');
    const [activeSection, setActiveSection] = useState('summary');

    const navItems = [
        { id: 'summary', label: t('nav.overview') },
        { id: 'eligibility', label: t('nav.eligibility') },
        { id: 'amount', label: t('nav.amount') },
        { id: 'rights', label: t('nav.rights') },
        { id: 'how-to-claim', label: t('nav.howToClaim') },
        { id: 'faq', label: t('nav.faq') },
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
                                <p className={styles.introText}>{t('summary.p1')}</p>
                                <p className={styles.introText}>{t('summary.p2')}</p>
                                <p className={styles.note}>{t('summary.note')}</p>
                            </section>

                            <section id="eligibility" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('eligibility.title')}</h2>
                                <p className={styles.note}>{t('eligibility.note1')}</p>
                                <ul>
                                    <li>{t('eligibility.li1')}</li>
                                    <li>{t('eligibility.li2')}</li>
                                    <li>{t('eligibility.li3')}</li>
                                    <li>{t('eligibility.li4')}</li>
                                    <li>{t('eligibility.li5')}</li>
                                    <li>{t('eligibility.li6')}</li>
                                    <li>{t('eligibility.li7')}</li>
                                    <li>{t('eligibility.li8')}</li>
                                </ul>

                                <p className={styles.note}>{t('eligibility.note2')}</p>

                                <h3>{t('eligibility.subtitleRes')}</h3>
                                <p>{t('eligibility.resP')}</p>
                                <p className={styles.note}>{t('eligibility.resNote')}</p>

                                <h3>{t('eligibility.subtitleWhere')}</h3>
                                <p>{t('eligibility.whereP')}</p>

                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('eligibility.thItin')}</th>
                                            <th>{t('eligibility.thEu')}</th>
                                            <th>{t('eligibility.thNonEu')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('eligibility.row1')}</td>
                                            <td>{t('eligibility.yes')}</td>
                                            <td>{t('eligibility.yes')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('eligibility.row2')}</td>
                                            <td>{t('eligibility.yes')}</td>
                                            <td>{t('eligibility.yes')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('eligibility.row3')}</td>
                                            <td>{t('eligibility.yes')}</td>
                                            <td>{t('eligibility.noUnless')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('eligibility.row4')}</td>
                                            <td>{t('eligibility.noUnless')}</td>
                                            <td>{t('eligibility.noUnless')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className={styles.note}>{t('eligibility.itinNote1')}</p>
                                <p className={styles.note}>{t('eligibility.itinNote2')}</p>

                                <h3>{t('eligibility.subtitleCovered')}</h3>
                                <p>{t('eligibility.covP')}</p>
                                <ul>
                                    <li>{t('eligibility.covLi1')}</li>
                                    <li>{t('eligibility.covLi2')}</li>
                                    <li>{t('eligibility.covLi3')}</li>
                                </ul>

                                <h3>{t('eligibility.subtitleNotCovered')}</h3>
                                <p className={styles.note}>{t('eligibility.extNote')}</p>
                                <p>{t('eligibility.extP')}</p>
                                <p className={styles.note}>{t('eligibility.strikeNote')}</p>
                                <p>{t('eligibility.strikeP')}</p>
                                <p className={styles.note}>{t('eligibility.personalNote')}</p>
                                <p>{t('eligibility.personalP')}</p>

                                <h3>{t('eligibility.subtitleBusiness')}</h3>
                                <p>{t('eligibility.busP')}</p>
                            </section>

                            <section id="amount" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('amount.title')}</h2>
                                <h3>{t('amount.subtitleEC261')}</h3>
                                <p>{t('amount.ecP')}</p>

                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('amount.thDist')}</th>
                                            <th>{t('amount.thLess3')}</th>
                                            <th>{t('amount.th3to4')}</th>
                                            <th>{t('amount.thMore4')}</th>
                                            <th>{t('amount.thNever')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('amount.dist1')}</td>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.val250')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.dist2')}</td>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.dist3')}</td>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.dist4')}</td>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val300')}</td>
                                            <td>{t('amount.val600')}</td>
                                            <td>{t('amount.val600')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className={styles.note}>{t('amount.note1')}</p>

                                <h3>{t('amount.subtitleDist')}</h3>
                                <p>{t('amount.distP')}</p>
                                <p className={styles.note}>{t('amount.distNote')}</p>
                            </section>

                            <section id="rights" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('rights.title')}</h2>

                                <h3>{t('rights.subtitleEC261')}</h3>
                                <p>{t('rights.ecP1')}</p>
                                <p>{t('rights.ecP2')}</p>
                                <p className={styles.note}>{t('rights.ecNote')}</p>

                                <h3>{t('rights.subtitleOther')}</h3>
                                <h4>{t('rights.careTitle')}</h4>
                                <p>{t('rights.careP1')}</p>
                                <p>{t('rights.careP2')}</p>

                                <h4>{t('rights.reimbTitle')}</h4>
                                <p>{t('rights.reimbP')}</p>

                                <h4>{t('rights.upgradeTitle')}</h4>
                                <p>{t('rights.upP')}</p>

                                <h4>{t('rights.furtherTitle')}</h4>
                                <p>{t('rights.furtherP')}</p>
                            </section>

                            <section id="how-to-claim" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('howToClaim.title')}</h2>
                                <h3>{t('howToClaim.subtitleWhat')}</h3>
                                <p>{t('howToClaim.whatP')}</p>
                                <ol>
                                    <li>{t('howToClaim.li1')}</li>
                                    <li>{t('howToClaim.li2')}</li>
                                    <li>{t('howToClaim.li3')}</li>
                                    <li>{t('howToClaim.li4')}</li>
                                    <li>{t('howToClaim.li5')}</li>
                                    <li>{t('howToClaim.li6')}</li>
                                    <li>{t('howToClaim.li7')}</li>
                                    <li>{t('howToClaim.li8')}</li>
                                    <li>{t('howToClaim.li9')}</li>
                                </ol>

                                <h3>{t('howToClaim.subtitleIndemsy')}</h3>
                                <p>{t('howToClaim.inP')}</p>
                                <ul>
                                    <li>{t('howToClaim.inLi1')}</li>
                                    <li>{t('howToClaim.inLi2')}</li>
                                    <li>{t('howToClaim.inLi3')}</li>
                                </ul>
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
