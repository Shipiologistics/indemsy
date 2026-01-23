import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './page.module.css';

export default function PlusPage() {
    const t = useTranslations('plusPage');

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    {/* Left Text Column */}
                    <div className={styles.heroText}>
                        <div className={styles.badge}>
                            🛡️ {t('hero.badge')}
                        </div>
                        <h1 className={styles.title}>
                            {t('hero.title')}
                        </h1>
                        <div className={styles.featuresList}>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                {t('hero.features.allAirlines')}
                            </div>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                {t('hero.features.insurance')}
                            </div>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                {t('hero.features.compensation')}
                            </div>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                {t('hero.features.lounge')}
                            </div>
                        </div>
                    </div>

                    {/* Right Image/Mockup Column */}
                    <div className={styles.heroImage}>
                        {/* CSS-Only Phone Mockup */}
                        <div className={styles.phoneFrame}>
                            <div className={styles.phoneScreen}>
                                <div className={styles.mapBackground}></div>
                                <div className={styles.phoneNotch}></div>

                                {/* App UI Simulation */}
                                <div className={styles.appHeader}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.25rem' }}>{t('hero.tripCard.label')}</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A' }}>{t('hero.tripCard.trip')}</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748B' }}>{t('hero.tripCard.date')}</div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#DCFCE7', color: '#166534', padding: '4px 8px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                                        🛡️ {t('hero.tripCard.protected')}
                                    </div>
                                </div>

                                <div className={styles.flightCard}>
                                    <div className={styles.flightRoute}>
                                        <span>PARIS</span>
                                        <span className={styles.flightPlane}>✈</span>
                                        <span>ROME</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{t('hero.flightCard.depart')}</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>09:45</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>CDG</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{t('hero.flightCard.arrive')}</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>11:50</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>FCO</div>
                                        </div>
                                    </div>
                                    <div className={styles.flightStatus}>
                                        ⚠️ {t('hero.flightCard.delayed')}
                                    </div>
                                </div>

                                {/* Floating Notification */}
                                <div className={styles.notificationPopup}>
                                    <div className={styles.notifIcon}>💰</div>
                                    <div className={styles.notifContent}>
                                        <h4>{t('hero.notification.payout')}</h4>
                                        <p>{t('hero.notification.message')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className={styles.featuresSection}>
                <div className={styles.featuresGrid}>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>💰</div>
                        <div className={styles.featureLabel}>{t('features.cash.label')}</div>
                        <h3 className={styles.featureTitle}>{t('features.cash.title')}</h3>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>⚖️</div>
                        <div className={styles.featureLabel}>{t('features.compensation.label')}</div>
                        <h3 className={styles.featureTitle}>{t('features.compensation.title')}</h3>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🛡️</div>
                        <div className={styles.featureLabel}>{t('features.care.label')}</div>
                        <h3 className={styles.featureTitle}>{t('features.care.title')}</h3>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🎁</div>
                        <div className={styles.featureLabel}>{t('features.plus.label')}</div>
                        <h3 className={styles.featureTitle}>{t('features.plus.title')}</h3>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className={styles.pricingSection}>
                <h2 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{t('pricing.title')}</h2>
                <p style={{ color: 'var(--slogan-gray)', fontSize: '1.25rem', marginBottom: '3rem', fontWeight: '500' }}>
                    {t('pricing.subtitle')}
                </p>

                {/* Why Choose Box */}
                <div style={{
                    background: '#EFF6FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '16px',
                    padding: '2rem',
                    maxWidth: '800px',
                    margin: '0 auto 4rem',
                    textAlign: 'center'
                }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1E40AF', marginBottom: '1rem' }}>
                        🎯 {t('pricing.whyChoose.title')}
                    </h3>
                    <p style={{ fontSize: '1.125rem', color: '#1E3A8A', lineHeight: '1.6' }}>
                        {t('pricing.whyChoose.description')}
                    </p>
                </div>

                {/* Includes Section */}
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'left' }}>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0F172A', marginBottom: '2rem', textAlign: 'center' }}>
                        ✅ {t('pricing.includes.title')}
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        {/* Unlimited */}
                        <div className={styles.featureCard} style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>✈️</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                {t('pricing.includes.unlimited.title')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2', 'item3'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#334155' }}>
                                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                                        <span>{t(`pricing.includes.unlimited.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Priority */}
                        <div className={styles.featureCard} style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                {t('pricing.includes.priority.title')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2', 'item3'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#334155' }}>
                                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                                        <span>{t(`pricing.includes.priority.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div className={styles.featureCard} style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤝</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                {t('pricing.includes.support.title')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2', 'item3', 'item4'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#334155' }}>
                                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                                        <span>{t(`pricing.includes.support.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Dashboard */}
                        <div className={styles.featureCard} style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📂</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                {t('pricing.includes.dashboard.title')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2', 'item3', 'item4'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#334155' }}>
                                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                                        <span>{t(`pricing.includes.dashboard.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div className={styles.featureCard} style={{ padding: '2rem' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                {t('pricing.includes.customerService.title')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#334155' }}>
                                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                                        <span>{t(`pricing.includes.customerService.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Transparency */}
                        <div className={styles.featureCard} style={{ padding: '2rem', border: '2px solid #10B981', background: '#F0FDF4' }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💶</div>
                            <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                {t('pricing.includes.transparency.title')}
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2', 'item3', 'item4'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#334155' }}>
                                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                                        <span>{t(`pricing.includes.transparency.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Not Included & Compliance Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                        {/* Not Included */}
                        <div style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                📜 {t('pricing.notIncluded.title')}
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2', 'item3'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#64748B', fontSize: '0.9375rem' }}>
                                        <span style={{ color: '#94A3B8', marginTop: '4px' }}>•</span>
                                        <span>{t(`pricing.notIncluded.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Compliance */}
                        <div style={{ padding: '2rem', background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0F172A', marginBottom: '1rem' }}>
                                🔐 {t('pricing.compliance.title')}
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {['item1', 'item2', 'item3'].map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: '#64748B', fontSize: '0.9375rem' }}>
                                        <span style={{ color: '#10B981', fontWeight: 'bold' }}>✓</span>
                                        <span>{t(`pricing.compliance.items.${item}`)}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Main CTA */}
                    <div style={{ textAlign: 'center' }}>
                        <Link href="/checkout?plan=premium" className={styles.bannerBtn} style={{
                            display: 'inline-block',
                            fontSize: '1.25rem',
                            padding: '1.5rem 3rem',
                            margin: 0,
                            background: '#0045C8',
                            color: 'white',
                            height: 'auto'
                        }}>
                            👉 {t('pricing.cta')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sticky Banner */}
            <div className={styles.stickyBanner}>
                <div className={styles.bannerContent}>
                    <h3>{t('banner.text')}</h3>
                    <div className={styles.bannerFeatures}>
                        <div className={styles.bannerFeature}>✓ {t('banner.fastPayouts')}</div>
                        <div className={styles.bannerFeature}>✓ {t('banner.noFees')}</div>
                        <div className={styles.bannerFeature}>✓ {t('banner.lounge')}</div>
                    </div>
                </div>
                <Link href="/checkout?plan=premium" className={styles.bannerBtn}>
                    {t('banner.button')}
                </Link>
            </div>
        </div>
    );
}
