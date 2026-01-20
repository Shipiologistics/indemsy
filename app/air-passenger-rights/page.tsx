'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PastelHero from '../components/PastelHero/PastelHero';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Image from 'next/image';
import Link from 'next/link';

import { useTranslations } from 'next-intl';

// Accordion component
function Accordion({ items }: { items: { title: string; content: string }[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className={styles.accordionList}>
            {items.map((item, index) => (
                <div key={index} className={styles.accordionItem}>
                    <button
                        className={`${styles.accordionTrigger} ${openIndex === index ? styles.accordionOpen : ''}`}
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        aria-expanded={openIndex === index}
                    >
                        <span>{item.title}</span>
                        <svg
                            className={`${styles.accordionChevron} ${openIndex === index ? styles.accordionChevronOpen : ''}`}
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                        >
                            <path fill="currentColor" fillRule="evenodd" d="M11.632 13.132 7.81 9.31a1.061 1.061 0 0 0-1.5 1.5l4.614 4.615a1 1 0 0 0 1.413 0l4.615-4.615a1.061 1.061 0 0 0-1.5-1.5z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className={`${styles.accordionPanel} ${openIndex === index ? styles.accordionPanelOpen : ''}`}>
                        <div className={styles.accordionContent}>
                            <p>{item.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// FAQ Accordion with different styling
function FAQSection({ data }: { data: { question: string; answer: string }[] }) {
    return (
        <div className={styles.faqList}>
            {data.map((item, index) => (
                <div key={index} className={styles.faqItem}>
                    <h3 className={styles.faqQuestionTitle}>{item.question}</h3>
                    <p className={styles.faqAnswerText}>{item.answer}</p>
                </div>
            ))}
        </div>
    );
}

// CTA Banner component
function CTABanner({ title, buttonText }: { title: string; buttonText: string }) {
    const t = useTranslations('stickyCta');
    return (
        <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerContent}>
                <h3 className={styles.ctaBannerTitle}>{title}</h3>
                <button className={styles.ctaButton}>{buttonText}</button>
            </div>
            <div className={styles.ctaBannerChips}>
                <div className={styles.ctaChip}>
                    <svg viewBox="0 0 18 14" width="18" height="14" className={styles.checkIcon}>
                        <path fill="currentColor" d="M15.995.931c-.2598.0073-.5064.1081-.6875.2812l-10.293 9.5592-3.293-3.0582a1.005 1.005 0 00-.3246-.2093 1.0659 1.0659 0 00-.3866-.0762 1.0677 1.0677 0 00-.3882.0689 1.009 1.009 0 00-.3292.203.927.927 0 00-.2187.3058A.8711.8711 0 000 8.3659a.8727.8727 0 00.082.359.931.931 0 00.2254.3015l4 3.7149c.1875.1741.4418.2719.707.2719.2652 0 .5195-.0978.707-.2719l11-10.2158c.1445-.1305.2432-.2984.2832-.4819a.8684.8684 0 00-.0592-.5461c-.0786-.1724-.2114-.3187-.381-.4198a1.058 1.058 0 00-.5695-.1466z" />
                    </svg>
                    <span>{t('allAirlines')}</span>
                </div>
                <div className={styles.ctaChip}>
                    <svg viewBox="0 0 18 14" width="18" height="14" className={styles.checkIcon}>
                        <path fill="currentColor" d="M15.995.931c-.2598.0073-.5064.1081-.6875.2812l-10.293 9.5592-3.293-3.0582a1.005 1.005 0 00-.3246-.2093 1.0659 1.0659 0 00-.3866-.0762 1.0677 1.0677 0 00-.3882.0689 1.009 1.009 0 00-.3292.203.927.927 0 00-.2187.3058A.8711.8711 0 000 8.3659a.8727.8727 0 00.082.359.931.931 0 00.2254.3015l4 3.7149c.1875.1741.4418.2719.707.2719.2652 0 .5195-.0978.707-.2719l11-10.2158c.1445-.1305.2432-.2984.2832-.4819a.8684.8684 0 00-.0592-.5461c-.0786-.1724-.2114-.3187-.381-.4198a1.058 1.058 0 00-.5695-.1466z" />
                    </svg>
                    <span>{t('allCountries')}</span>
                </div>
                <div className={styles.ctaChip}>
                    <svg viewBox="0 0 18 14" width="18" height="14" className={styles.checkIcon}>
                        <path fill="currentColor" d="M15.995.931c-.2598.0073-.5064.1081-.6875.2812l-10.293 9.5592-3.293-3.0582a1.005 1.005 0 00-.3246-.2093 1.0659 1.0659 0 00-.3866-.0762 1.0677 1.0677 0 00-.3882.0689 1.009 1.009 0 00-.3292.203.927.927 0 00-.2187.3058A.8711.8711 0 000 8.3659a.8727.8727 0 00.082.359.931.931 0 00.2254.3015l4 3.7149c.1875.1741.4418.2719.707.2719.2652 0 .5195-.0978.707-.2719l11-10.2158c.1445-.1305.2432-.2984.2832-.4819a.8684.8684 0 00-.0592-.5461c-.0786-.1724-.2114-.3187-.381-.4198a1.058 1.058 0 00-.5695-.1466z" />
                    </svg>
                    <span>{t('noWinNoFee')}</span>
                </div>
            </div>
        </div>
    );
}

export default function Page() {
    const t = useTranslations('airPassengerRights');
    const [activeSection, setActiveSection] = useState('what-are-air-passenger-rights');

    // Navigation items for sidebar
    const navItems = [
        { id: 'what-are-air-passenger-rights', label: t('nav.whatAre') },
        { id: 'air-passenger-regulations-about-compensation', label: t('nav.compensation') },
        { id: 'other-passenger-rights', label: t('nav.other') },
        { id: 'which-countries-have-passenger-rights', label: t('nav.countries') },
        { id: 'indemsy-role', label: t('nav.role') },
        { id: 'common-questions', label: t('nav.faq') },
    ];

    // Country/Region cards data
    const countryCards = [
        { flag: 'https://flagcdn.com/w40/eu.png', label: t('countryCards.eu'), href: '/ec-regulation-261-2004' },
        { flag: 'https://flagcdn.com/w40/gb.png', label: t('countryCards.uk'), href: '/uk-261' },
        { flag: 'https://flagcdn.com/w40/us.png', label: t('countryCards.us'), href: '/flight-rights-usa' },
        { flag: 'https://flagcdn.com/w40/tr.png', label: t('countryCards.tr'), href: '/air-passenger-rights-turkey' },
        { flag: 'https://flagcdn.com/w40/br.png', label: t('countryCards.br'), href: '/flight-compensation-in-brazil' },
        { flag: 'https://flagcdn.com/w40/sa.png', label: t('countryCards.sa'), href: '/flight-compensation-in-saudi-arabia' },
        { flag: 'https://img.airhelp.com/landing-pages/air-passenger-rights-world-globe.png', label: t('countryCards.montreal'), href: '/montreal-convention' },
    ];

    // Key takeaways data
    const keyTakeaways = [
        { icon: '💰', text: t('takeaways.item1') },
        { icon: '✈️', text: t('takeaways.item2') },
        { icon: '🍽️', text: t('takeaways.item3') },
        { icon: '🏨', text: t('takeaways.item4') },
        { icon: '🧳', text: t('takeaways.item5') },
    ];

    // Compensation amounts data
    const compensationAmounts = [
        { icon: '💶', amount: 'Up to €600', regulation: t('sectionCompensation.item1') },
        { icon: '💵', amount: 'Up to €1,550', regulation: t('sectionCompensation.item2') },
        { icon: '💴', amount: 'Up to €600 in Lira', regulation: t('sectionCompensation.item3') },
        { icon: '💰', amount: '200% of ticket price', regulation: t('sectionCompensation.item4') },
    ];

    // Accordion data for compensation section
    const compensationAccordions = [
        {
            title: t('accordions.noCompTitle'),
            content: t('accordions.noCompContent')
        },
        {
            title: t('accordions.diffTitle'),
            content: t('accordions.diffContent')
        },
    ];

    // Other rights accordions
    const otherRightsAccordions = [
        {
            title: t('accordions.accommodationTitle'),
            content: t('accordions.accommodationContent')
        },
        {
            title: t('accordions.foodTitle'),
            content: t('accordions.foodContent')
        },
        {
            title: t('accordions.infoTitle'),
            content: t('accordions.infoContent')
        },
        {
            title: t('accordions.rebookingTitle'),
            content: t('accordions.rebookingContent')
        },
        {
            title: t('accordions.baggageTitle'),
            content: t('accordions.baggageContent')
        },
        {
            title: t('accordions.accessibilityTitle'),
            content: t('accordions.accessibilityContent')
        },
        {
            title: t('accordions.tarmacTitle'),
            content: t('accordions.tarmacContent')
        },
        {
            title: t('accordions.feesTitle'),
            content: t('accordions.feesContent')
        },
    ];

    // Legal achievements accordions
    const legalAccordions = [
        {
            title: t('legalAccordions.strikeTitle'),
            content: t('legalAccordions.strikeContent')
        },
        {
            title: t('legalAccordions.earlierTitle'),
            content: t('legalAccordions.earlierContent')
        },
        {
            title: t('legalAccordions.multiLegTitle'),
            content: t('legalAccordions.multiLegContent')
        },
        {
            title: t('legalAccordions.missedTitle'),
            content: t('legalAccordions.missedContent')
        },
        {
            title: t('legalAccordions.refuseTitle'),
            content: t('legalAccordions.refuseContent')
        },
        {
            title: t('legalAccordions.infantTitle'),
            content: t('legalAccordions.infantContent')
        },
    ];

    // FAQ data - comprehensive list
    const faqData = [
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
                    const newActive = visible[0].target.id;
                    setActiveSection(newActive);
                }
            },
            {
                root: null,
                rootMargin: '-35% 0px -50% 0px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            }
        );

        sections.forEach((section) => observer.observe(section));

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero Section */}
                <PastelHero
                    title={t('heroTitle')}
                    checkmarks={[
                        { icon: 'money', text: t('heroCheckmarks.amount') },
                        { icon: 'shield', text: t('heroCheckmarks.care') },
                        { icon: 'legal', text: t('heroCheckmarks.options') }
                    ]}
                />


                <div className={styles.container}>
                    <div className={styles.pageGrid}>
                        {/* Sticky Sidebar Navigation */}
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarInner}>
                                <h5 className={styles.sidebarTitle}>{t('sidebarTitle')}</h5>
                                <nav className={styles.sideNav}>
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

                        {/* Main Content */}
                        <div className={styles.content}>
                            {/* Intro text */}
                            <p className={styles.introText}>
                                {t('introText')}
                            </p>

                            {/* Info Banner */}
                            <div className={styles.infoBanner}>
                                <div className={styles.infoBannerIcon}>
                                    <svg viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12 17C11.448 17 11 16.552 11 16V12C11 11.448 11.448 11 12 11C12.552 11 13 11.448 13 12V16C13 16.552 12.552 17 12 17ZM12.5 9H11.5C11.224 9 11 8.776 11 8.5V7.5C11 7.224 11.224 7 11.5 7H12.5C12.776 7 13 7.224 13 7.5V8.5C13 8.776 12.776 9 12.5 9Z" />
                                    </svg>
                                </div>
                                <p>{t('infoBannerText')}</p>
                                <button className={styles.infoBannerBtn}>{t('infoBannerCTA')}</button>
                            </div>

                            {/* Country/Region Cards */}
                            <div className={styles.countryCards}>
                                {countryCards.map((card, index) => (
                                    <Link href={card.href} key={index} className={styles.countryCard}>
                                        <div className={styles.countryCardContent}>
                                            <img
                                                src={card.flag}
                                                alt=""
                                                width={32}
                                                height={32}
                                                className={styles.countryFlag}
                                                loading="lazy"
                                            />
                                            <span className={styles.countryLabel}>{card.label}</span>
                                        </div>
                                        <svg viewBox="0 0 24 24" width="20" height="20" className={styles.countryCardArrow}>
                                            <path fill="currentColor" d="M13.1315 11.6315L9.3105 7.8105C8.8965 7.3965 8.8965 6.7245 9.3105 6.3105C9.7245 5.8965 10.3965 5.8965 10.8105 6.3105L15.4245 10.9245C15.8155 11.3155 15.8155 11.9485 15.4245 12.3385L10.8105 16.9525C10.3965 17.3665 9.7245 17.3665 9.3105 16.9525C8.8965 16.5385 8.8965 15.8665 9.3105 15.4525L13.1315 11.6315Z" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>

                            {/* Section: What are air passenger rights? */}
                            <div className={styles.divider} />
                            <section id="what-are-air-passenger-rights" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('sectionWhatAre.title')}</h2>
                                <div className={styles.sectionContent}>
                                    <p>{t('sectionWhatAre.p1')}</p>
                                    <p>{t('sectionWhatAre.p2')}</p>
                                    <p><strong>{t('sectionWhatAre.p3')}</strong></p>
                                </div>
                            </section>

                            {/* CTA Banner */}
                            <CTABanner title={t('ctaBanners.banner1')} buttonText={t('heroCTA')} />

                            {/* 79% stat */}
                            <div className={styles.sectionContent}>
                                <p>{t('stat79')}</p>
                            </div>

                            {/* Key Takeaways Box */}
                            <div className={styles.keyTakeawaysBox}>
                                <div className={styles.keyTakeawaysHeader}>
                                    <span className={styles.keyTakeawaysLabel}>{t('takeaways.label')}</span>
                                    <h4 className={styles.keyTakeawaysTitle}>{t('takeaways.title')}</h4>
                                </div>
                                <div className={styles.keyTakeawaysList}>
                                    {keyTakeaways.map((item, index) => (
                                        <div key={index} className={styles.keyTakeawayItem}>
                                            <div className={styles.keyTakeawayIcon}>{item.icon}</div>
                                            <p>{item.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Download Guide Promo */}
                            <div className={styles.guidePromo}>
                                <div className={styles.guidePromoContent}>
                                    <h3>{t('guidePromo.title')}</h3>
                                    <button className={styles.guidePromoBtn}>{t('guidePromo.btn')}</button>
                                </div>
                                <div className={styles.guidePromoVisual}>
                                    <div className={styles.guidePromoShape}></div>
                                </div>
                            </div>

                            {/* Section: Compensation */}
                            <div className={styles.divider} />
                            <section id="air-passenger-regulations-about-compensation" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('sectionCompensation.title')}</h2>
                                <div className={styles.sectionContent}>
                                    <p>{t('sectionCompensation.p1')}</p>
                                </div>

                                {/* Compensation Amounts */}
                                <h4 className={styles.subsectionTitle} id="compensation-amounts">{t('sectionCompensation.subtitle')}</h4>
                                <div className={styles.compensationGrid}>
                                    {compensationAmounts.map((item, index) => (
                                        <div key={index} className={styles.compensationItem}>
                                            <div className={styles.compensationIcon}>{item.icon}</div>
                                            <div className={styles.compensationText}>
                                                <strong>{item.amount}</strong> {item.regulation}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={styles.sectionContent}>
                                    <p>{t('sectionCompensation.p2')}</p>
                                    <p>{t('sectionCompensation.p3')}</p>
                                    <p>{t('sectionCompensation.p4')}</p>
                                </div>

                                <Accordion items={compensationAccordions} />
                            </section>

                            <CTABanner title={t('ctaBanners.banner2')} buttonText={t('heroCTA')} />

                            {/* Section: Other passenger rights */}
                            <div className={styles.divider} />
                            <section id="other-passenger-rights" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('nav.other')}</h2>
                                <div className={styles.sectionContent}>
                                    <p>{t('accordions.foodContent')}</p>
                                </div>
                                <Accordion items={otherRightsAccordions} />
                            </section>

                            {/* Section: Which countries */}
                            <div className={styles.divider} />
                            <section id="which-countries-have-passenger-rights" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('sectionCountries.title')}</h2>
                                <div className={styles.sectionContent}>
                                    <p>{t('sectionCountries.p1')}</p>
                                </div>

                                {/* World Map Lottie Animation */}
                                <DotLottieReact
                                    src="https://lottie.host/2ca4aab1-94f0-4112-af0e-879fece3e1ff/ayVfprWKUW.lottie"
                                    loop
                                    autoplay
                                    className={styles.worldMapLottie}
                                />

                                <div className={styles.sectionContent}>
                                    <h3>{t('sectionCountries.h3')}</h3>
                                    <p>{t('sectionCountries.p2')}</p>
                                    <p>{t('sectionCountries.p3')}</p>
                                </div>
                            </section>

                            {/* Section: Indemsy's Role */}
                            <div className={styles.divider} />
                            <section id="indemsy-role" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('sectionRole.title')}</h2>
                                <div className={styles.sectionContent}>
                                    <p><strong>{t('sectionRole.p1')}</strong></p>
                                    <p>{t('sectionRole.p2')}</p>
                                    <p>{t('sectionRole.p3')}</p>
                                </div>

                                <div className={styles.sectionContent}>
                                    <h3>{t('sectionRole.h3Easier')}</h3>
                                    <p>{t('sectionRole.p4')}</p>
                                    <p>{t('sectionRole.p5')}</p>
                                </div>

                                <div className={styles.sectionContent}>
                                    <h3>{t('sectionRole.h3Legal')}</h3>
                                    <p>{t('sectionRole.p6')}</p>
                                    <p>{t('sectionRole.p7')}</p>
                                </div>

                                <Accordion items={legalAccordions} />
                            </section>

                            {/* Section: FAQ */}
                            <div className={styles.divider} />
                            <section id="common-questions" className={styles.section}>
                                <h2 className={styles.sectionTitle}>{t('faq.title')}</h2>
                                <FAQSection data={faqData} />
                            </section>

                            <CTABanner title={t('ctaBanners.banner3')} buttonText={t('heroCTA')} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
