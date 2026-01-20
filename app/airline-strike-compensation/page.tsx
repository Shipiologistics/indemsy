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
    const t = useTranslations('airlineStrike');
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
        { id: 'amount', label: t('nav.amount') },
        { id: 'rights', label: t('nav.rights') },
        { id: 'faq', label: t('nav.faq') },
        { id: 'why', label: t('nav.why') },
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
                                <p className={styles.note}>{t('summary.note')}</p>
                            </section>

                            <section id="eligibility" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('eligibility.title')}</h2>

                                <h3>{t('eligibility.subtitleYes')}</h3>
                                <p className={styles.note}>{t('eligibility.noteYes')}</p>
                                <ul>
                                    <li>{t('eligibility.li1')}</li>
                                    <li>{t('eligibility.li2')}</li>
                                    <li>{t('eligibility.li3')}</li>
                                    <li>{t('eligibility.li4')}</li>
                                    <li>{t('eligibility.li5')}</li>
                                    <li>{t('eligibility.li6')}</li>
                                </ul>
                                <p>{t('eligibility.staffP')}</p>
                                <p className={styles.note}>{t('eligibility.staffNote')}</p>

                                <h3>{t('eligibility.subtitleNo')}</h3>
                                <p className={styles.note}>{t('eligibility.noteNo')}</p>
                                <ul>
                                    <li>{t('eligibility.noLi1')}</li>
                                    <li>{t('eligibility.noLi2')}</li>
                                    <li>{t('eligibility.noLi3')}</li>
                                    <li>{t('eligibility.noLi4')}</li>
                                </ul>

                                <h3>{t('eligibility.subtitleCheck')}</h3>
                                <p>{t('eligibility.checkP')}</p>
                            </section>

                            <section id="amount" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('amount.title')}</h2>
                                <p>{t('amount.p1')}</p>

                                <h3>{t('amount.h3Cancel')}</h3>
                                <p>{t('amount.cancelP')}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('amount.thLess2')}</th>
                                            <th>{t('amount.th23')}</th>
                                            <th>{t('amount.th34')}</th>
                                            <th>{t('amount.thMore4')}</th>
                                            <th>{t('amount.thNever')}</th>
                                            <th>{t('amount.thDist')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('amount.val125')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.dist1')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.val200')}</td>
                                            <td>{t('amount.val200')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.dist2')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.val200')}</td>
                                            <td>{t('amount.val200')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.dist3')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.val300')}</td>
                                            <td>{t('amount.val300')}</td>
                                            <td>{t('amount.val300')}</td>
                                            <td>{t('amount.val600')}</td>
                                            <td>{t('amount.val600')}</td>
                                            <td>{t('amount.dist4')}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3>{t('amount.h3Delay')}</h3>
                                <p>{t('amount.delayP')}</p>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>{t('amount.thLess3')}</th>
                                            <th>{t('amount.th34')}</th>
                                            <th>{t('amount.thMore4')}</th>
                                            <th>{t('amount.thNever')}</th>
                                            <th>{t('amount.thDist')}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.val250')}</td>
                                            <td>{t('amount.dist1')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.dist2')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.val400')}</td>
                                            <td>{t('amount.dist3')}</td>
                                        </tr>
                                        <tr>
                                            <td>{t('amount.valNone')}</td>
                                            <td>{t('amount.val300')}</td>
                                            <td>{t('amount.val600')}</td>
                                            <td>{t('amount.val600')}</td>
                                            <td>{t('amount.dist4')}</td>
                                        </tr>
                                    </tbody>
                                </table>

                                <h3>{t('amount.h3Denied')}</h3>
                                <p>{t('amount.deniedP')}</p>
                            </section>

                            <section id="rights" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('rights.title')}</h2>

                                <h3>{t('rights.subtitleEntitled')}</h3>
                                <p className={styles.note}>{t('rights.noteCare')}</p>
                                <ul>
                                    <li>{t('rights.careLi1')}</li>
                                    <li>{t('rights.careLi2')}</li>
                                    <li>{t('rights.careLi3')}</li>
                                </ul>

                                <h3>{t('rights.subtitleRebook')}</h3>
                                <p>{t('rights.rebookP')}</p>

                                <h3>{t('rights.subtitlePast')}</h3>
                                <p>{t('rights.pastP')}</p>
                            </section>

                            <CtaBanner
                                title="Flight cancelled? Check what you're owed"
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

                            <section id="why" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('why.title')}</h2>
                                <ul>
                                    <li>{t('why.li1')}</li>
                                    <li>{t('why.li2')}</li>
                                    <li>{t('why.li3')}</li>
                                    <li>{t('why.li4')}</li>
                                    <li>{t('why.li5')}</li>
                                </ul>
                                <p>{t('why.p')}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
