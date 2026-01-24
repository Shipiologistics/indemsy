'use client';

import { useEffect, useState } from 'react';
import styles from '../air-passenger-rights/page.module.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PastelHero from '../components/PastelHero/PastelHero';
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

// CTA Banner component
function CTABanner({ title, buttonText }: { title: string; buttonText: string }) {
    const t = useTranslations('stickyCta');
    return (
        <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerContent}>
                <h3 className={styles.ctaBannerTitle}>{title}</h3>
                <Link href="/claim"><button className={styles.ctaButton}>{buttonText}</button></Link>
            </div>
            <div className={styles.ctaBannerChips}>
                <div className={styles.ctaChip}>✨ <span>{t('allAirlines')}</span></div>
                <div className={styles.ctaChip}>🌍 <span>{t('allCountries')}</span></div>
                <div className={styles.ctaChip}>⚖️ <span>{t('noWinNoFee')}</span></div>
            </div>
        </div>
    );
}

export default function EU261Page() {
    const t = useTranslations('ec261');
    const [activeSection, setActiveSection] = useState('essentiel');

    // Define nav items using translations
    const navItems = [
        { id: 'essentiel', label: t('nav.essentiel') },
        { id: 'qu-est-ce-que', label: t('nav.whatIs') },
        { id: 'etapes', label: t('nav.steps') },
        { id: 'quand-droit', label: t('nav.when') },
        { id: 'quel-montant', label: t('nav.amount') },
        { id: 'quels-pays', label: t('nav.countries') },
        { id: 'autres-droits', label: t('nav.otherRights') },
        { id: 'comment-reclamer', label: t('nav.howTo') },
    ];

    useEffect(() => {
        const sections = navItems.map((item) => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length > 0) setActiveSection(visible[0].target.id);
            },
            { rootMargin: '-35% 0px -50% 0px', threshold: [0, 1] }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [navItems]);

    return (
        <div className={styles.main}>
            <PastelHero
                title={t('heroTitle')}
                checkmarks={[
                    { icon: 'money', text: t('heroCheckmarks.amount') },
                    { icon: 'shield', text: t('heroCheckmarks.care') },
                    { icon: 'legal', text: t('heroCheckmarks.eu') }
                ]}
            />

            <div className={styles.container}>
                <div className={styles.pageGrid}>
                    <aside className={styles.sidebar}>
                        <div className={styles.sidebarInner}>
                            <h5 className={styles.sidebarTitle}>{t('sidebarTitle')}</h5>
                            <nav className={styles.sideNav}>
                                <ul>
                                    {navItems.map((item) => (
                                        <li key={item.id}>
                                            <a href={`#${item.id}`} className={`${styles.navLink} ${activeSection === item.id ? styles.navLinkActive : ''}`}>
                                                {item.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    <div className={styles.content}>
                        <section id="essentiel" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.essentiel.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.essentiel.p1')}</p>
                                <p><strong>{t('sections.essentiel.p2')}</strong></p>
                                <p>{t('sections.essentiel.p3')}</p>
                                <p>{t('sections.essentiel.p4')}</p>
                            </div>
                        </section>

                        <div className={styles.keyTakeawaysBox}>
                            <div className={styles.keyTakeawaysHeader}>
                                <span className={styles.keyTakeawaysLabel}>{t('sections.takeaways.label')}</span>
                                <h4 className={styles.keyTakeawaysTitle}>{t('sections.takeaways.title')}</h4>
                            </div>
                            <div className={styles.keyTakeawaysList}>
                                <div className={styles.keyTakeawayItem}>
                                    <div className={styles.keyTakeawayIcon}>💰</div>
                                    <p>{t('sections.takeaways.li1')}</p>
                                </div>
                                <div className={styles.keyTakeawayItem}>
                                    <div className={styles.keyTakeawayIcon}>✈️</div>
                                    <p>{t('sections.takeaways.li2')}</p>
                                </div>
                                <div className={styles.keyTakeawayItem}>
                                    <div className={styles.keyTakeawayIcon}>🛌</div>
                                    <p>{t('sections.takeaways.li3')}</p>
                                </div>
                                <div className={styles.keyTakeawayItem}>
                                    <div className={styles.keyTakeawayIcon}>ℹ️</div>
                                    <p>{t('sections.takeaways.li4')}</p>
                                </div>
                            </div>
                        </div>

                        <section id="qu-est-ce-que" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.whatIs.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.whatIs.p1')}</p>
                                <p>{t('sections.whatIs.p2')}</p>
                            </div>
                        </section>

                        <section id="etapes" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.steps.title')}</h2>
                            <div className={styles.compensationGrid}>
                                <div className={styles.compensationItem}>
                                    <div className={styles.compensationIcon}>1</div>
                                    <div className={styles.compensationText}><strong>{t('sections.steps.step1')}</strong> {t('sections.steps.step1_desc')}</div>
                                </div>
                                <div className={styles.compensationItem}>
                                    <div className={styles.compensationIcon}>2</div>
                                    <div className={styles.compensationText}><strong>{t('sections.steps.step2')}</strong> {t('sections.steps.step2_desc')}</div>
                                </div>
                                <div className={styles.compensationItem}>
                                    <div className={styles.compensationIcon}>3</div>
                                    <div className={styles.compensationText}><strong>{t('sections.steps.step3')}</strong> {t('sections.steps.step3_desc')}</div>
                                </div>
                            </div>
                        </section>

                        <CTABanner title={t('sections.amenities_banner_title', { default: "Check your compensation now" })} buttonText={t('sections.amenities_banner_btn', { default: "Check for free" })} />

                        <section id="quand-droit" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.when.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.when.intro')}</p>
                                <ul>
                                    <li><strong>{t('sections.when.li1_title')}</strong> {t('sections.when.li1_desc')}</li>
                                    <li><strong>{t('sections.when.li2_title')}</strong> {t('sections.when.li2_desc')}</li>
                                    <li><strong>{t('sections.when.li3_title')}</strong> {t('sections.when.li3_desc')}</li>
                                </ul>
                            </div>
                        </section>

                        <section id="quel-montant" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.amount.title')}</h2>
                            <div className={styles.compensationGrid}>
                                <div className={styles.compensationItem}>
                                    <div className={styles.compensationIcon}>💶</div>
                                    <div className={styles.compensationText}><strong>{t('sections.amount.val1')}</strong> - {t('sections.amount.l1')}</div>
                                </div>
                                <div className={styles.compensationItem}>
                                    <div className={styles.compensationIcon}>💶</div>
                                    <div className={styles.compensationText}><strong>{t('sections.amount.val2')}</strong> - {t('sections.amount.l2')}</div>
                                </div>
                                <div className={styles.compensationItem}>
                                    <div className={styles.compensationIcon}>💶</div>
                                    <div className={styles.compensationText}><strong>{t('sections.amount.val3')}</strong> - {t('sections.amount.l3')}</div>
                                </div>
                            </div>
                            <p><em>{t('sections.amount.note')}</em></p>
                        </section>

                        <section id="quels-pays" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.countries.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.countries.p1')}</p>
                                <p>{t('sections.countries.p2')}</p>
                                <div className={styles.compensationGrid}>
                                    <div className={styles.compensationItem}>
                                        <div className={styles.compensationIcon}>🇪🇺</div>
                                        <div className={styles.compensationText}><strong>{t('sections.countries.tableHead1')}</strong>: {t('sections.countries.covered')}</div>
                                    </div>
                                    <div className={styles.compensationItem}>
                                        <div className={styles.compensationIcon}>🌍</div>
                                        <div className={styles.compensationText}><strong>{t('sections.countries.tableHead2')}</strong>: {t('sections.countries.notCovered')}</div>
                                    </div>
                                </div>
                                <p>{t('sections.countries.p3')}</p>
                                <p>{t('sections.countries.p4')}</p>
                                <DotLottieReact src="https://lottie.host/2ca4aab1-94f0-4112-af0e-879fece3e1ff/ayVfprWKUW.lottie" loop autoplay style={{ height: 200 }} />
                            </div>
                        </section>

                        <section id="autres-droits" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.otherRights.title')}</h2>
                            <p>{t('sections.otherRights.intro')}</p>
                            <Accordion items={[
                                { title: t('sections.otherRights.care_title'), content: `${t('sections.otherRights.care_li1')}, ${t('sections.otherRights.care_li2')}, ${t('sections.otherRights.care_li3')}` },
                                { title: t('sections.otherRights.reamb_title'), content: t('sections.otherRights.reamb_p') },
                                { title: t('sections.otherRights.hotel_title'), content: t('sections.otherRights.hotel_p') }
                            ]} />
                        </section>

                        <CTABanner title={t('sections.howTo.checklist_title')} buttonText={t('sections.howTo.flycompense_title')} />

                        <section id="comment-reclamer" className={styles.section}>
                            <h2 className={styles.sectionTitle}>{t('sections.howTo.title')}</h2>
                            <div className={styles.sectionContent}>
                                <p>{t('sections.howTo.intro')}</p>
                                <div className={styles.pageGrid}>
                                    <div className={styles.keyTakeawaysBox}>
                                        <h4>{t('sections.howTo.direct_title')}</h4>
                                        <p>{t('sections.howTo.direct_p')}</p>
                                        <p>{t('sections.howTo.comp_effort_manual')}</p>
                                    </div>
                                    <div className={`${styles.keyTakeawaysBox} ${styles.recommendedBox}`}>
                                        <h4>{t('sections.howTo.flycompense_title')}</h4>
                                        <p>{t('sections.howTo.flycompense_p')}</p>
                                        <p>{t('sections.howTo.comp_effort_fly')}</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
