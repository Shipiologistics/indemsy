'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Image from 'next/image';
import FaqAccordion from '../components/FaqAccordion/FaqAccordion';

import { useTranslations } from 'next-intl';

export default function Page() {
    const t = useTranslations('flightDelay');
    const tHeroMain = useTranslations('hero');

    const navItems = [
        { id: 'summary', label: t('nav.summary') },
        { id: 'eligibility', label: t('nav.eligibility') },
        { id: 'amount', label: t('nav.amount') },
        { id: 'how-to-claim', label: t('nav.howToClaim') },
        { id: 'care-rights', label: t('nav.care') },
        { id: 'regulations', label: t('nav.regulations') },
        { id: 'faq', label: t('nav.faq') },
    ];

    const experienceHighlights = [
        {
            title: t('experience.title1'),
            body: t('experience.body1'),
        },
        {
            title: t('experience.title2'),
            body: t('experience.body2'),
        },
        {
            title: t('experience.title3'),
            body: t('experience.body3'),
        },
    ];

    const faqItems = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
        { question: t('faq.q5'), answer: t('faq.a5') },
        { question: t('faq.q6'), answer: t('faq.a6') },
        { question: t('faq.q7'), answer: t('faq.a7') },
        { question: t('faq.q8'), answer: t('faq.a8') },
        { question: t('faq.q9'), answer: t('faq.a9') },
        { question: t('faq.q10'), answer: t('faq.a10') },
        { question: t('faq.q11'), answer: t('faq.a11') },
        { question: t('faq.q12'), answer: t('faq.a12') },
        { question: t('faq.q13'), answer: t('faq.a13') },
    ];

    const eligibilityChecklist = [
        t('checklist.item1'),
        t('checklist.item2'),
        t('checklist.item3'),
        t('checklist.item4'),
        t('checklist.item5'),
    ];

    const whenDelayedSteps = [
        t('howTo.doStep1'),
        t('howTo.doStep2'),
        t('howTo.doStep3'),
        t('checklist.step1'),
    ];

    const claimSteps = [
        t('howTo.claimStep1'),
        t('howTo.claimStep2'),
        t('howTo.claimStep3'),
    ];

    const careItems = [
        { label: t('care.label1'), detail: t('care.detail1') },
        { label: t('care.label2'), detail: t('care.detail2') },
        { label: t('care.label3'), detail: t('care.detail3') },
        { label: t('care.label4'), detail: t('care.detail4') },
        { label: t('care.label5'), detail: t('care.detail5') },
        { label: t('care.label6'), detail: t('care.detail6') },
    ];

    const regulationHighlights = [
        {
            title: t('moreRegs.extTitle'),
            body: t('moreRegs.extBody'),
        },
        {
            title: t('moreRegs.strikeTitle'),
            body: t('moreRegs.strikeBody'),
        },
        {
            title: t('moreRegs.montrealTitle'),
            body: t('moreRegs.montrealBody'),
        },
    ];

    const [activeSection, setActiveSection] = useState('summary');

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
                {/* New Hero Section with AirHelp-style layout */}
                {/* New Hero Section with AirHelp-style layout */}
                <PastelHero
                    title={t('heroTitle')}
                    checkmarks={[
                        { icon: 'money', text: t('heroChip1') },
                        { icon: 'shield', text: t('heroChip2') },
                        { icon: 'legal', text: t('heroChip3') }
                    ]}
                />

                <div className={styles.container}>
                    <div className={styles.pageGrid}>
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarInner}>
                                <h5 className={styles.sidebarTitle}>{t('sidebarTitle')}</h5>
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
                                <div className={styles.liquidPanel}>
                                    <p>{t('summary.p1')}</p>
                                    <p>{t('summary.p2')}</p>
                                </div>

                                <div className={styles.highlightGrid}>
                                    {experienceHighlights.map((item) => (
                                        <div key={item.title} className={styles.highlightCard}>
                                            <h4>{item.title}</h4>
                                            <p>{item.body}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.inlineMediaCard}>
                                    <div>
                                        <p className={styles.note}>{t('tracker.eyebrow')}</p>
                                        <h3>{t('tracker.title')}</h3>
                                        <p>{t('tracker.body')}</p>
                                        <button className={styles.ghostButton}>{t('tracker.cta')}</button>
                                    </div>
                                    <div className={styles.inlineMediaArt}></div>
                                </div>
                            </section>

                            <section id="eligibility" className={styles.section}>
                                <div className={styles.sectionHeaderRow}>
                                    <div>
                                        <p className={styles.eyebrow}>{t('checklist.eyebrow')}</p>
                                        <h2 className={styles.sectionTitle}>{t('checklist.title')}</h2>
                                    </div>
                                    <span className={styles.tag}>{t('checklist.tag')}</span>
                                </div>
                                <div className={styles.checklistCard}>
                                    <ul>
                                        {eligibilityChecklist.map((item) => (
                                            <li key={item}>
                                                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                                                    <path fill="currentColor" d="M9.55 18.54 3.4 12.39l1.41-1.41 4.73 4.72 9.65-9.65 1.41 1.42z" />
                                                </svg>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            <section id="amount" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('table.title')}</h2>
                                <p>{t('table.subtitle')}</p>
                                <div className={styles.glassTableWrapper}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>{t('table.thDistance')}</th>
                                                <th>{t('table.thLess3')}</th>
                                                <th>{t('table.th3to4')}</th>
                                                <th>{t('table.thMore4')}</th>
                                                <th>{t('table.thNever')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{t('table.dist1')}</td>
                                                <td>{t('table.valNone')}</td>
                                                <td>{t('table.val250')}</td>
                                                <td>{t('table.val250')}</td>
                                                <td>{t('table.val250')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('table.dist2')}</td>
                                                <td>{t('table.valNone')}</td>
                                                <td>{t('table.val400')}</td>
                                                <td>{t('table.val400')}</td>
                                                <td>{t('table.val400')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('table.dist3')}</td>
                                                <td>{t('table.valNone')}</td>
                                                <td>{t('table.val400')}</td>
                                                <td>{t('table.val400')}</td>
                                                <td>{t('table.val400')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('table.dist4')}</td>
                                                <td>{t('table.valNone')}</td>
                                                <td>{t('table.val300')}</td>
                                                <td>{t('table.val600')}</td>
                                                <td>{t('table.val600')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.tipGrid}>
                                    <p>{t('table.tip1')}</p>
                                    <p>{t('table.tip2')}</p>
                                </div>
                            </section>

                            <section id="how-to-claim" className={styles.section}>
                                <div className={styles.sectionHeaderRow}>
                                    <div>
                                        <p className={styles.eyebrow}>{t('howTo.eyebrow')}</p>
                                        <h2 className={styles.sectionTitle}>{t('howTo.title')}</h2>
                                    </div>
                                    <button className={styles.ghostButton}>{tHeroMain('checkCompensation')}</button>
                                </div>
                                <div className={styles.dualCardLayout}>
                                    <div className={styles.listCard}>
                                        <h3>{t('howTo.doTitle')}</h3>
                                        <ol>
                                            {whenDelayedSteps.map((step) => (
                                                <li key={step}>{step}</li>
                                            ))}
                                        </ol>
                                    </div>
                                    <div className={styles.listCard}>
                                        <h3>{t('howTo.indemsyTitle')}</h3>
                                        <ol>
                                            {claimSteps.map((step) => (
                                                <li key={step}>{step}</li>
                                            ))}
                                        </ol>
                                        <div className={styles.docCallout}>
                                            <h4>{t('howTo.docsTitle')}</h4>
                                            <p>{t('howTo.docsBody')}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="care-rights" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('care.title')}</h2>
                                <div className={styles.careGrid}>
                                    {careItems.map((item) => (
                                        <div key={item.label} className={styles.careCard}>
                                            <h4>{item.label}</h4>
                                            <p>{item.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section id="regulations" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('moreRegs.title')}</h2>
                                <div className={styles.glassTableWrapper}>
                                    <table className={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>{t('moreRegs.thItinerary')}</th>
                                                <th>{t('moreRegs.thEuAirline')}</th>
                                                <th>{t('moreRegs.thNonEuAirline')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{t('moreRegs.row1')}</td>
                                                <td>{t('moreRegs.covered')}</td>
                                                <td>{t('moreRegs.covered')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('moreRegs.row2')}</td>
                                                <td>{t('moreRegs.covered')}</td>
                                                <td>{t('moreRegs.covered')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('moreRegs.row3')}</td>
                                                <td>{t('moreRegs.covered')}</td>
                                                <td>{t('moreRegs.notCovered')}</td>
                                            </tr>
                                            <tr>
                                                <td>{t('moreRegs.row4')}</td>
                                                <td>{t('moreRegs.notCovered')}</td>
                                                <td>{t('moreRegs.notCovered')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className={styles.regulationHighlightGrid}>
                                    {regulationHighlights.map((card) => (
                                        <div key={card.title} className={styles.highlightCard}>
                                            <h4>{card.title}</h4>
                                            <p>{card.body}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className={styles.tipGrid}>
                                    <p>{t('moreRegs.usTip')}</p>
                                    <p>{t('moreRegs.mtTip')}</p>
                                </div>
                            </section>

                            <section id="faq" className={styles.section}>
                                <div className={styles.sectionHeaderRow}>
                                    <div>
                                        <p className={styles.eyebrow}>{t('faq.eyebrow')}</p>
                                        <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>
                                    </div>
                                    <button className={styles.ghostButton}>{t('faq.cta')}</button>
                                </div>
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
