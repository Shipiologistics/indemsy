'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './page.module.css';
import PastelHero from '../components/PastelHero/PastelHero';

import FaqAccordion from '../components/FaqAccordion/FaqAccordion';
import {
    GlassCard,
    FeatureGrid,
    StatsBar,
    ModernTable,
    CtaBanner,
    IconList,
    InfoCallout,
    CompensationCards
} from '../components/ModernPageElements/ModernPageElements';

export default function Page() {
    const t = useTranslations('flightCancellation');
    const tHero = useTranslations('commonHero');
    const tHeroMain = useTranslations('hero');
    const tSticky = useTranslations('stickyCta');
    const [activeSection, setActiveSection] = useState('summary');

    const navItems = [
        { id: 'summary', label: t('nav.overview') },
        { id: 'rules', label: t('nav.rules') },
        { id: 'entitlements', label: t('nav.entitlements') },
        { id: 'amount', label: t('nav.amount') },
        { id: 'eligibility', label: t('nav.eligibility') },
        { id: 'ec261-where', label: t('nav.where') },
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
        { question: t('faq.q7'), answer: t('faq.a7') },
        { question: t('faq.q8'), answer: t('faq.a8') },
        { question: t('faq.q9'), answer: t('faq.a9') },
        { question: t('faq.q10'), answer: t('faq.a10') },
        { question: t('faq.q11'), answer: t('faq.a11') },
    ];

    // Stats data
    const statsData = [
        { value: '€600', label: 'Max compensation', icon: '💶' },
        { value: '3 yrs', label: 'Claim window', icon: '📅' },
        { value: '98%', label: 'Success rate', icon: '✅' },
    ];

    // Compensation amounts for cards
    const compensationAmounts = [
        { amount: '€250', distance: '≤ 1,500 km' },
        { amount: '€400', distance: '1,500 - 3,500 km' },
        { amount: '€600', distance: '> 3,500 km' },
    ];

    // Coverage table data
    const coverageColumns = [
        { key: 'itinerary', header: t('where.thItin'), icon: '✈️' },
        { key: 'euCarrier', header: t('where.thEu'), icon: '🇪🇺' },
        { key: 'nonEuCarrier', header: t('where.thNonEu'), icon: '🌍' },
    ];

    const coverageRows = [
        { itinerary: t('where.row1'), euCarrier: <span className={styles.covered}>{t('where.covered')}</span>, nonEuCarrier: <span className={styles.covered}>{t('where.covered')}</span> },
        { itinerary: t('where.row2'), euCarrier: <span className={styles.covered}>{t('where.covered')}</span>, nonEuCarrier: <span className={styles.covered}>{t('where.covered')}</span> },
        { itinerary: t('where.row3'), euCarrier: <span className={styles.covered}>{t('where.covered')}</span>, nonEuCarrier: <span className={styles.notCovered}>{t('where.notCovered')}</span> },
        { itinerary: t('where.row4'), euCarrier: <span className={styles.notCovered}>{t('where.notCovered')}</span>, nonEuCarrier: <span className={styles.notCovered}>{t('where.notCovered')}</span> },
    ];

    // Rules list items
    const rulesItems = [
        { icon: '✓', text: t('rules.li1') },
        { icon: '✓', text: t('rules.li2') },
        { icon: '✓', text: t('rules.li3') },
        { icon: '✓', text: t('rules.li4') },
        { icon: '✓', text: t('rules.li5') },
        { icon: '✓', text: t('rules.li6') },
    ];

    // How to claim steps
    const claimSteps = [
        { icon: '1', text: t('howToClaim.li1') },
        { icon: '2', text: t('howToClaim.li2') },
        { icon: '3', text: t('howToClaim.li3') },
        { icon: '4', text: t('howToClaim.li4') },
        { icon: '5', text: t('howToClaim.li5') },
        { icon: '6', text: t('howToClaim.li6') },
        { icon: '7', text: t('howToClaim.li7') },
        { icon: '8', text: t('howToClaim.li8') },
    ];

    // Entitlement features
    const entitlementFeatures = [
        { icon: '💰', title: 'Full Refund', description: t('entitlements.re1') },
        { icon: '✈️', title: 'Re-routing', description: t('entitlements.altP') },
        { icon: '🍽️', title: 'Right to Care', description: t('entitlements.careP') },
        { icon: '🏨', title: 'Accommodation', description: t('entitlements.careLi3') },
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
            {/* Original Hero Section with Form */}
            {/* New Hero Section with AirHelp-style layout */}
            <PastelHero
                title={t('heroTitle')}
                checkmarks={[
                    { icon: 'money', text: tHero('chips.years') },
                    { icon: 'shield', text: tHero('chips.global') },
                    { icon: 'legal', text: tHero('chips.negotiations') }
                ]}
            />

            {/* Stats Bar */}
            <div className={styles.statsWrapper}>
                <StatsBar stats={statsData} variant="gradient" />
            </div>

            <div className={styles.container}>
                <div className={styles.pageGrid}>
                    {/* Sticky Sidebar Navigation */}
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
                                                onClick={() => setActiveSection(item.id)}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </GlassCard>
                    </aside>

                    {/* Main Content */}
                    <div className={styles.content}>
                        {/* Summary Section */}
                        <section id="summary" className={styles.section}>
                            <div className={styles.summaryGrid}>
                                <div className={styles.summaryContent}>
                                    <p className={styles.introText}>{t('summary.p1')}</p>
                                    <p className={styles.introText}>{t('summary.p2')}</p>
                                </div>
                                <div className={styles.summaryImage}>
                                    <Image
                                        src="/spirit-cancellation-refund.jpg"
                                        alt="Flight cancellation at airport"
                                        width={400}
                                        height={280}
                                        className={styles.roundedImage}
                                    />
                                </div>
                            </div>

                            <InfoCallout
                                variant="tip"
                                title="Pro Tip"
                                text={t('summary.p3')}
                            />
                        </section>

                        {/* CTA Banner */}
                        <CtaBanner
                            title="Flight cancelled? Check what you're owed"
                            subtitle="Takes just 2 minutes"
                            buttonText={tHeroMain('checkCompensation')}
                            buttonHref="#pastel-hero"
                            chips={[tSticky('allAirlines'), tSticky('allCountries'), tSticky('noWinNoFee')]}
                            variant="gradient"
                        />

                        {/* Rules Section */}
                        <section id="rules" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>📋</span>
                                {t('rules.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('rules.p1')}</p>

                            <InfoCallout variant="info" text={t('rules.note1')} />

                            <IconList items={rulesItems} variant="check" />

                            <div className={styles.noticeBox}>
                                <h3 className={styles.noticeTitle}>{t('rules.subtitle')}</h3>
                                <div className={styles.noticeGrid}>
                                    <div className={styles.noticeCard + ' ' + styles.noticeNegative}>
                                        <span className={styles.noticeIcon}>❌</span>
                                        <div>
                                            <strong>{t('rules.more14').split(':')[0]}:</strong>
                                            <span>{t('rules.more14').split(':')[1]}</span>
                                        </div>
                                    </div>
                                    <div className={styles.noticeCard + ' ' + styles.noticePositive}>
                                        <span className={styles.noticeIcon}>✅</span>
                                        <div>
                                            <strong>{t('rules.less14').split(':')[0]}:</strong>
                                            <span>{t('rules.less14').split(':')[1]}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <div className={styles.contentImage}>
                            <Image
                                src="/AIRLINES_ Know Your Rights_ Airline Refunds and Delay Compensation Course.jpg"
                                alt="Airline Refunds and Delay Compensation Rights Infographic"
                                width={1200}
                                height={600}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                        {/* Entitlements Section */}
                        <section id="entitlements" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🎯</span>
                                {t('entitlements.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('entitlements.p1')}</p>

                            <FeatureGrid items={entitlementFeatures} columns={2} />

                            <div className={styles.gradientSection}>
                                <h3 className={styles.gradientTitle}>{t('entitlements.subtitle1')}</h3>
                                <InfoCallout variant="success" text={t('entitlements.note1')} />
                                <ul className={styles.modernList}>
                                    <li>{t('entitlements.li1')}</li>
                                    <li>{t('entitlements.li2')}</li>
                                    <li>{t('entitlements.li3')}</li>
                                </ul>
                            </div>

                            <GlassCard variant="gradient">
                                <h3 className={styles.cardTitle}>{t('entitlements.subtitleOther')}</h3>

                                <div className={styles.careGrid}>
                                    <div className={styles.careItem}>
                                        <span className={styles.careIcon}>🍜</span>
                                        <div>
                                            <h4>{t('entitlements.careTitle')}</h4>
                                            <p>{t('entitlements.careP')}</p>
                                        </div>
                                    </div>
                                    <div className={styles.careItem}>
                                        <span className={styles.careIcon}>⬆️</span>
                                        <div>
                                            <h4>{t('entitlements.upgradeTitle')}</h4>
                                            <p>{t('entitlements.upLi1')}</p>
                                        </div>
                                    </div>
                                    <div className={styles.careItem}>
                                        <span className={styles.careIcon}>ℹ️</span>
                                        <div>
                                            <h4>{t('entitlements.informTitle')}</h4>
                                            <p>{t('entitlements.informP')}</p>
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </section>

                        {/* Compensation Amounts Section */}
                        <section id="amount" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>💰</span>
                                {t('amount.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('amount.p1')}</p>

                            <CompensationCards items={compensationAmounts} title="Compensation by distance" />

                            <InfoCallout variant="info" text={t('amount.note1')} />

                            <div className={styles.tableSection}>
                                <h3>Detailed Compensation Table</h3>
                                <div className={styles.tableWrapper}>
                                    <table className={styles.modernTable}>
                                        <thead>
                                            <tr>
                                                <th>{t('amount.th1')}</th>
                                                <th>{t('amount.th2')}</th>
                                                <th>{t('amount.th3')}</th>
                                                <th>{t('amount.th4')}</th>
                                                <th>{t('amount.th5')}</th>
                                                <th>{t('amount.th6')}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className={styles.amount}>{t('amount.val125')}</td>
                                                <td className={styles.amount}>{t('amount.val250')}</td>
                                                <td className={styles.amount}>{t('amount.val250')}</td>
                                                <td className={styles.amount}>{t('amount.val250')}</td>
                                                <td className={styles.amount}>{t('amount.val250')}</td>
                                                <td>{t('amount.dist1')}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.amount}>{t('amount.val200')}</td>
                                                <td className={styles.amount}>{t('amount.val200')}</td>
                                                <td className={styles.amount}>{t('amount.val400')}</td>
                                                <td className={styles.amount}>{t('amount.val400')}</td>
                                                <td className={styles.amount}>{t('amount.val400')}</td>
                                                <td>{t('amount.dist2')}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.amount}>{t('amount.val200')}</td>
                                                <td className={styles.amount}>{t('amount.val200')}</td>
                                                <td className={styles.amount}>{t('amount.val400')}</td>
                                                <td className={styles.amount}>{t('amount.val400')}</td>
                                                <td className={styles.amount}>{t('amount.val400')}</td>
                                                <td>{t('amount.dist3')}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.amount}>{t('amount.val300')}</td>
                                                <td className={styles.amount}>{t('amount.val300')}</td>
                                                <td className={styles.amount}>{t('amount.val300')}</td>
                                                <td className={styles.amountHighlight}>{t('amount.val600')}</td>
                                                <td className={styles.amountHighlight}>{t('amount.val600')}</td>
                                                <td>{t('amount.dist4')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <InfoCallout variant="warning" text={t('amount.note2')} />
                        </section>

                        {/* Eligibility Section */}
                        <section id="eligibility" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>✅</span>
                                {t('eligibility.title')}
                            </h2>

                            <GlassCard variant="light">
                                <h3 className={styles.cardTitle}>{t('eligibility.subtitleDef')}</h3>
                                <p>{t('eligibility.defP')}</p>
                            </GlassCard>

                            <div className={styles.warningSection}>
                                <h3>{t('eligibility.subtitleExt')}</h3>
                                <p>{t('eligibility.extP')}</p>
                                <InfoCallout variant="warning" text={t('eligibility.extNote')} />
                            </div>

                            <GlassCard variant="gradient">
                                <h3 className={styles.cardTitle}>{t('eligibility.subtitleConn')}</h3>
                                <p>{t('eligibility.connP')}</p>
                            </GlassCard>
                        </section>

                        {/* Where EC261 Applies */}
                        <section id="ec261-where" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>🗺️</span>
                                {t('where.title')}
                            </h2>
                            <p className={styles.sectionIntro}>{t('where.p1')}</p>

                            <ModernTable
                                columns={coverageColumns}
                                rows={coverageRows}
                                variant="glassmorphic"
                            />
                        </section>

                        {/* How to Claim Section */}
                        <section id="how-to-claim" className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                <span className={styles.sectionIcon}>📝</span>
                                {t('howToClaim.title')}
                            </h2>

                            <h3 className={styles.subsectionTitle}>{t('howToClaim.subtitleWhat')}</h3>
                            <IconList items={claimSteps} variant="number" />

                            <div className={styles.flycompenseSection}>
                                <h3>{t('howToClaim.subtitleFlyCompense')}</h3>
                                <div className={styles.flycompenseFeatures}>
                                    <div className={styles.flycompenseFeature}>
                                        <span>⚡</span>
                                        <p>{t('howToClaim.inLi1')}</p>
                                    </div>
                                    <div className={styles.flycompenseFeature}>
                                        <span>🤝</span>
                                        <p>{t('howToClaim.inLi2')}</p>
                                    </div>
                                    <div className={styles.flycompenseFeature}>
                                        <span>💯</span>
                                        <p>{t('howToClaim.inLi3')}</p>
                                    </div>
                                </div>
                            </div>

                            <InfoCallout variant="success" text={t('howToClaim.note')} />
                        </section>

                        {/* CTA Before FAQ */}
                        <CtaBanner
                            title="Ready to claim your compensation?"
                            buttonText={tHeroMain('checkCompensation')}
                            buttonHref="#pastel-hero"
                            chips={[tSticky('noWinNoFee')]}
                            variant="glass"
                        />

                        {/* FAQ Section */}
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
