'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';

import FaqAccordion from '../components/FaqAccordion/FaqAccordion';
import {
    GlassCard,
    IconList,
    InfoCallout,
    CtaBanner
} from '../components/ModernPageElements/ModernPageElements';

export default function Page() {
    const t = useTranslations('delayedBaggage');
    const tHero = useTranslations('commonHero');
    const tHeroMain = useTranslations('hero');
    const [activeSection, setActiveSection] = useState('summary');

    const navItems = [
        { id: 'summary', label: t('nav.overview') },
        { id: 'delayed-us', label: t('nav.delayedUs') },
        { id: 'delayed-us-comp', label: t('nav.delayedUsComp') },
        { id: 'delayed-eu', label: t('nav.delayedEu') },
        { id: 'delayed-eu-comp', label: t('nav.delayedEuComp') },
        { id: 'lost-us', label: t('nav.lostUs') },
        { id: 'lost-eu', label: t('nav.lostEu') },
        { id: 'insurance', label: t('nav.insurance') },
        { id: 'damage-us', label: t('nav.damageUs') },
        { id: 'damage-eu', label: t('nav.damageEu') },
        { id: 'faq', label: t('nav.faq') },
    ];

    const faqItems = [
        { question: t('faq.q1'), answer: t('faq.a1') },
        { question: t('faq.q2'), answer: t('faq.a2') },
        { question: t('faq.q3'), answer: t('faq.a3') },
        { question: t('faq.q4'), answer: t('faq.a4') },
    ];

    // Helper to generate items for IconList
    const getListItems = (sectionKey: string, count: number) => {
        return Array.from({ length: count }, (_, i) => i + 1).map((num) => ({
            icon: `${num}`,
            title: t(`${sectionKey}.li${num}`),
            text: t(`${sectionKey}.li${num}Note`)
        }));
    };

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
                    { icon: 'calendar', text: tHero('chips.years') },
                    { icon: 'globe', text: tHero('chips.global') },
                    { icon: 'legal', text: tHero('chips.negotiations') }
                ]}
            />

            <div className={styles.container}>
                <div className={styles.pageGrid}>
                    <aside className={styles.sidebar}>
                        <GlassCard variant="light">
                            <h5 className={styles.sidebarTitle}>{t('heroTitle')}</h5>
                            <nav className={styles.sideNav} aria-label="In-page navigation">
                                <ul>
                                    {navItems.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setActiveSection(item.id);
                                                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                                                }}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </GlassCard>
                    </aside>

                    <div className={styles.content}>
                        <div className={styles.baggageHero}>
                            <img
                                src="/Airline passengers blast ‘rude’ airport baggage___.jpg"
                                alt="Airline passengers blast ‘rude’ airport baggage"
                            />
                        </div>
                        <section id="summary" className={styles.section}>
                            <GlassCard variant="gradient">
                                <p className={styles.introText}>{t('summary.p1')}</p>
                                <p className={styles.introText}>{t('summary.p2')}</p>
                            </GlassCard>
                        </section>

                        <section id="delayed-us" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🇺🇸</span>
                                {t('delayedUs.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('delayedUs.p')}</p>
                            <IconList items={getListItems('delayedUs', 7)} variant="number" />
                            <InfoCallout variant="info" text={t('delayedUs.footer')} />
                        </section>

                        <section id="delayed-us-comp" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>💰</span>
                                {t('delayedUsComp.title')}
                            </h2>
                            <GlassCard variant="light">
                                <p>{t('delayedUsComp.p1')}</p>
                                <p>{t('delayedUsComp.p2')}</p>
                            </GlassCard>
                        </section>

                        <section id="delayed-eu" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🇪🇺</span>
                                {t('delayedEu.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('delayedEu.p')}</p>
                            <IconList items={getListItems('delayedEu', 6)} variant="number" />
                        </section>

                        <section id="delayed-eu-comp" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>💶</span>
                                {t('delayedEuComp.title')}
                            </h2>
                            <GlassCard variant="light">
                                <p>{t('delayedEuComp.p1')}</p>
                                <p>{t('delayedEuComp.p2')}</p>
                            </GlassCard>
                        </section>

                        <section id="lost-us" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🕵️</span>
                                {t('lostUs.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('lostUs.p')}</p>
                            <IconList items={getListItems('lostUs', 4)} variant="number" />
                            <InfoCallout variant="warning" text={t('lostUs.footer')} />
                        </section>

                        <section id="lost-eu" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🌍</span>
                                {t('lostEu.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('lostEu.p')}</p>
                            <IconList items={getListItems('lostEu', 4)} variant="number" />
                        </section>

                        <section id="insurance" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🛡️</span>
                                {t('insurance.title')}
                            </h2>
                            <GlassCard variant="gradient">
                                <p>{t('insurance.p1')}</p>
                                <p>{t('insurance.p2')}</p>
                                <InfoCallout variant="success" text={t('insurance.p3')} />
                            </GlassCard>
                        </section>

                        <CtaBanner
                            title="Claim compensation for your bag problems"
                            buttonText={tHeroMain('checkCompensation')}
                            buttonHref="#check"
                            chips={[tHero('chips.years'), tHero('chips.global')]}
                            variant="glass"
                        />

                        <section id="damage-us" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>💔</span>
                                {t('damageUs.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('damageUs.p')}</p>
                            <IconList items={getListItems('damageUs', 5)} variant="check" />
                        </section>

                        <section id="damage-eu" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🧳</span>
                                {t('damageEu.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('damageEu.p')}</p>
                            <IconList items={getListItems('damageEu', 5)} variant="check" />
                        </section>

                        <section id="faq" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>❓</span>
                                {t('faq.title')}
                            </h2>
                            <FaqAccordion items={faqItems} />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
