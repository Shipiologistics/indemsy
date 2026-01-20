'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import FaqAccordion from '../components/FaqAccordion/FaqAccordion';
import { CtaBanner } from '../components/ModernPageElements/ModernPageElements';

export default function Page() {
    const t = useTranslations('overbooking');
    const tHero = useTranslations('commonHero');
    const tHeroMain = useTranslations('hero');
    const tHeader = useTranslations('header');
    const [activeSection, setActiveSection] = useState('summary');

    const scrollToHero = () => {
        const element = document.getElementById('check');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navItems = [
        { id: 'summary', label: t('nav.overview') },
        { id: 'eligibility', label: t('nav.eligibility') },
        { id: 'rights', label: t('nav.rights') },
        { id: 'amount', label: t('nav.amount') },
        { id: 'what-to-do', label: t('nav.whatToDo') },
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
                        { icon: 'calendar', text: tHero('chips.years') },
                        { icon: 'globe', text: tHero('chips.global') },
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
                                <p className={styles.note}>{t('summary.note')}</p>
                            </section>

                            <section id="eligibility" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('eligibility.title')}</h2>
                                <p className={styles.note}>{t('eligibility.note')}</p>
                                <ul>
                                    <li>{t('eligibility.li1')}</li>
                                    <li>{t('eligibility.li2')}</li>
                                    <li>{t('eligibility.li3')}</li>
                                    <li>{t('eligibility.li4')}</li>
                                    <li>{t('eligibility.li5')}</li>
                                </ul>
                            </section>

                            <section id="rights" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('rights.title')}</h2>

                                <h3>{t('rights.h3Def')}</h3>
                                <h4>{t('rights.h4Over')}</h4>
                                <p>{t('rights.overP1')}</p>
                                <p className={styles.note}>{t('rights.overNote')}</p>

                                <h4>{t('rights.h4Denied')}</h4>
                                <p>{t('rights.deniedP1')}</p>

                                <h3>{t('rights.h3Eu')}</h3>
                                <p>{t('rights.euP1')}</p>
                                <p className={styles.note}>{t('rights.euNote')}</p>
                                <ul>
                                    <li>{t('rights.euLi1')}</li>
                                    <li>{t('rights.euLi2')}</li>
                                </ul>

                                <h4>{t('rights.h4Itin')}</h4>
                                <p>{t('rights.itinP1')}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('rights.thItin')}</th>
                                            <th>{t('rights.thEu')}</th>
                                            <th>{t('rights.thNonEu')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('rights.row1')}</td>
                                            <td>{t('rights.covered')}</td>
                                            <td>{t('rights.covered')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('rights.row2')}</td>
                                            <td>{t('rights.covered')}</td>
                                            <td>{t('rights.covered')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('rights.row3')}</td>
                                            <td>{t('rights.covered')}</td>
                                            <td>{t('rights.notCovered')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('rights.row4')}</td>
                                            <td>{t('rights.notCovered')}</td>
                                            <td>{t('rights.notCovered')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className={styles.note}>{t('rights.itinNote1')}</p>
                                <p className={styles.note}>{t('rights.itinNote2')}</p>

                                <h3>{t('rights.h3Us')}</h3>
                                <p>{t('rights.usP1')}</p>
                                <ul>
                                    <li>{t('rights.usLi1')}</li>
                                    <li>{t('rights.usLi2')}</li>
                                    <li>{t('rights.usLi3')}</li>
                                </ul>
                            </section>

                            <section id="amount" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('amount.title')}</h2>

                                <h3>{t('amount.h3Eu')}</h3>
                                <p className={styles.note}>{t('amount.euNote')}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('amount.thDist')}</th>
                                            <th>{t('amount.thComp')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('amount.dist1')}</td>
                                            <td>{t('amount.val250')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.dist2')}</td>
                                            <td>{t('amount.val400')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.dist3')}</td>
                                            <td>{t('amount.val400')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.dist4')}</td>
                                            <td>{t('amount.val600')}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3>{t('amount.h3Other')}</h3>
                                <h4>{t('amount.h4Inform')}</h4>
                                <p>{t('amount.informP1')}</p>

                                <h4>{t('amount.h4Reimb')}</h4>
                                <p className={styles.note}>{t('amount.reimbNote')}</p>
                                <ul>
                                    <li>{t('amount.reimbLi1')}</li>
                                    <li>{t('amount.reimbLi2')}</li>
                                    <li>{t('amount.reimbLi3')}</li>
                                </ul>
                                <p className={styles.note}>{t('amount.reimbNote2')}</p>

                                <h4>{t('amount.h4Care')}</h4>
                                <p>{t('amount.careP1')}</p>

                                <h4>{t('amount.h4Up')}</h4>
                                <p>{t('amount.upP1')}</p>

                                <h4>{t('amount.h4Further')}</h4>
                                <p>{t('amount.furtherP1')}</p>

                                <h3>{t('amount.h3Us')}</h3>
                                <p className={styles.note}>{t('amount.usNote')}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('amount.thDelay')}</th>
                                            <th>{t('amount.th01')}</th>
                                            <th>{t('amount.th12')}</th>
                                            <th>{t('amount.th24')}</th>
                                            <th>{t('amount.th4plus')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('amount.dom')}</td>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val200')}</td>
                                            <td>{t('amount.val400Us')}</td>
                                            <td>{t('amount.val400Us')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.intl')}</td>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val200')}</td>
                                            <td>{t('amount.val200')}</td>
                                            <td>{t('amount.val400Us')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className={styles.note}>{t('amount.usNote2')}</p>
                                <p className={styles.note}>{t('amount.usNote3')}</p>
                            </section>

                            <section id="what-to-do" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('whatToDo.title')}</h2>
                                <p>{t('whatToDo.p1')}</p>
                                <ol>
                                    <li>{t('whatToDo.li1')}</li>
                                    <li>{t('whatToDo.li2')}</li>
                                    <li>{t('whatToDo.li3')}</li>
                                    <li>{t('whatToDo.li4')}</li>
                                    <li>{t('whatToDo.li5')}</li>
                                    <li>{t('whatToDo.li6')}</li>
                                    <li>{t('whatToDo.li7')}</li>
                                    <li>{t('whatToDo.li8')}</li>
                                    <li>{t('whatToDo.li9')}</li>
                                </ol>

                                <h3>{t('whatToDo.h3Collect')}</h3>
                                <ul>
                                    <li>{t('whatToDo.collLi1')}</li>
                                    <li>{t('whatToDo.collLi2')}</li>
                                    <li>{t('whatToDo.collLi3')}</li>
                                    <li>{t('whatToDo.collLi4')}</li>
                                </ul>

                                <h3>{t('whatToDo.h3Bought')}</h3>
                                <p>{t('whatToDo.boughtP1')}</p>

                                <h3>{t('whatToDo.h3Helper')}</h3>
                                <p>{t('whatToDo.helpP1')}</p>
                                <p className={styles.note}>{t('whatToDo.helpNote')}</p>
                            </section>

                            <CtaBanner
                                title="Denied boarding? Check what you're owed"
                                subtitle="Takes just 2 minutes"
                                buttonText={tHeroMain('checkCompensation')}
                                buttonHref="#check"
                                chips={[tHero('chips.years'), tHero('chips.global'), tHero('chips.negotiations')]}
                                variant="gradient"
                            />

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
