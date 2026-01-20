'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';

import FaqAccordion from '../components/FaqAccordion/FaqAccordion';

const navItems = [
    { id: 'summary', label: 'Overview' },
    { id: 'rights', label: 'What are my rights?' },
    { id: 'assistance', label: 'How to request special assistance' },
    { id: 'regulations', label: 'Regulations around the world' },
    { id: 'whats-airhelp', label: "What's Indemsy?" },
    { id: 'faq', label: 'Commonly asked questions' },
    { id: 'resources', label: 'Resources & further reading' },
];

export default function Page() {
    const t = useTranslations('passengersWithDisabilities');
    const h = useTranslations('header');
    const heroT = useTranslations('commonHero');
    const [activeSection, setActiveSection] = useState('summary');

    const navItems = [
        { id: 'summary', label: t('nav.summary') },
        { id: 'rights', label: t('nav.rights') },
        { id: 'assistance', label: t('nav.assistance') },
        { id: 'regulations', label: t('nav.regulations') },
        { id: 'whats-airhelp', label: t('nav.whatsIndemsy') },
        { id: 'faq', label: t('nav.faq') },
        { id: 'resources', label: t('nav.resources') },
    ];

    const faqItems = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
        {
            question: t('faq.q5'),
            answer: (
                <>
                    <p>{t('faq.a5')}</p>
                    <p className={styles.note}>{t('faq.note5')}</p>
                </>
            )
        },
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
    }, []);

    return (
        <div className={styles.main}>
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
                                {t('summary.intro')}
                            </p>
                            <p className={styles.note}>
                                {t('summary.note')}
                            </p>
                        </section>

                        <section id="rights" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('rights.title')}</h2>
                            <p>
                                {t('rights.p1')}
                            </p>
                            <p>
                                {t('rights.p2')}
                            </p>
                            <p>
                                {t('rights.p3')}
                            </p>
                        </section>

                        <section id="assistance" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('assistance.title')}</h2>
                            <p>
                                {t('assistance.p1')}
                            </p>
                            <p>
                                {t('assistance.p2')}
                            </p>
                            <p className={styles.note}>{t('assistance.note1')}</p>
                            <p>
                                {t('assistance.p3')}
                            </p>
                            <p className={styles.note}>{t('assistance.note2')}</p>
                            <p>
                                {t('assistance.p4')}
                            </p>
                            <p className={styles.note}>{t('assistance.note3')}</p>
                        </section>

                        <section id="regulations" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('regulations.title')}</h2>
                            <p>
                                {t('regulations.intro')}
                            </p>

                            <h3>{t('regulations.us.title')}</h3>
                            <p className={styles.note}>{t('regulations.us.note')}</p>
                            <ul>
                                <li>{t('regulations.us.li1')}</li>
                                <li>{t('regulations.us.li2')}</li>
                            </ul>
                            <p>
                                {t('regulations.us.p')}
                            </p>

                            <h3>{t('regulations.uk.title')}</h3>
                            <p className={styles.note}>{t('regulations.uk.note')}</p>
                            <ul>
                                <li>{t('regulations.uk.li1')}</li>
                                <li>{t('regulations.uk.li2')}</li>
                            </ul>
                            <p>
                                {t('regulations.uk.p')}
                            </p>

                            <h3>{t('regulations.eu.title')}</h3>
                            <p className={styles.note}>{t('regulations.eu.note')}</p>
                            <ul>
                                <li>{t('regulations.eu.li1')}</li>
                                <li>{t('regulations.eu.li2')}</li>
                            </ul>
                            <p>
                                {t('regulations.eu.p')}
                            </p>

                            <h3>{t('regulations.canada.title')}</h3>
                            <p className={styles.note}>{t('regulations.canada.note')}</p>
                            <ul>
                                <li>{t('regulations.canada.li1')}</li>
                                <li>{t('regulations.canada.li2')}</li>
                            </ul>
                            <p>
                                {t('regulations.canada.p')}
                            </p>

                            <h3>{t('regulations.brazil.title')}</h3>
                            <p className={styles.note}>{t('regulations.brazil.note')}</p>
                            <ul>
                                <li>{t('regulations.brazil.li1')}</li>
                                <li>{t('regulations.brazil.li2')}</li>
                            </ul>
                            <p>
                                {t('regulations.brazil.p')}
                            </p>
                        </section>

                        <section id="whats-airhelp" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('whatsIndemsy.title')}</h2>
                            <p>
                                {t('whatsIndemsy.p')}
                            </p>
                            <p className={styles.note}>{t('whatsIndemsy.note')}</p>
                        </section>

                        <section id="faq" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>
                            <FaqAccordion items={faqItems} />
                        </section>

                        <section id="resources" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('resources.title')}</h2>

                            <h3>{t('resources.canada.title')}</h3>
                            <ul>
                                <li>{t('resources.canada.li1')}</li>
                                <li>{t('resources.canada.li2')}</li>
                            </ul>

                            <h3>{t('resources.uk.title')}</h3>
                            <ul>
                                <li>{t('resources.uk.li1')}</li>
                                <li>{t('resources.uk.li2')}</li>
                            </ul>

                            <h3>{t('resources.usa.title')}</h3>
                            <ul>
                                <li>{t('resources.usa.li1')}</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
