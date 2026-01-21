import Link from 'next/link';
import styles from './page.module.css';

export default function PlusPage() {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    {/* Left Text Column */}
                    <div className={styles.heroText}>
                        <div className={styles.badge}>
                            🛡️ PROTECTION
                        </div>
                        <h1 className={styles.title}>
                            Domestic and international protection for future flights.
                        </h1>
                        <div className={styles.featuresList}>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                All airlines
                            </div>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                Fast insurance payout for disruptions worldwide
                            </div>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                Airline compensation for eligible international disruptions
                            </div>
                            <div className={styles.checkItem}>
                                <div className={styles.checkIconWrapper}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                Free worldwide lounge pass
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
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748B', marginBottom: '0.25rem' }}>Your Trip</div>
                                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A' }}>Trip to Italy</div>
                                    <div style={{ fontSize: '0.875rem', color: '#64748B' }}>20 Jun - 24 Jun</div>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#DCFCE7', color: '#166534', padding: '4px 8px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 'bold', marginTop: '0.5rem' }}>
                                        🛡️ Protected by Indemsy+
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
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Depart</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>09:45</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>CDG</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Arrive</div>
                                            <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>11:50</div>
                                            <div style={{ fontSize: '0.75rem', color: '#64748B' }}>FCO</div>
                                        </div>
                                    </div>
                                    <div className={styles.flightStatus}>
                                        ⚠️ Flight Delayed (&gt;3h)
                                    </div>
                                </div>

                                {/* Floating Notification */}
                                <div className={styles.notificationPopup}>
                                    <div className={styles.notifIcon}>💰</div>
                                    <div className={styles.notifContent}>
                                        <h4>Here's your $200 payout</h4>
                                        <p>Your flight EA886 was delayed</p>
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
                        <div className={styles.featureLabel}>CASH</div>
                        <h3 className={styles.featureTitle}>Fast insurance payouts</h3>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>⚖️</div>
                        <div className={styles.featureLabel}>COMPENSATION</div>
                        <h3 className={styles.featureTitle}>International airline compensation</h3>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🛡️</div>
                        <div className={styles.featureLabel}>CARE</div>
                        <h3 className={styles.featureTitle}>Real-time updates & support</h3>
                    </div>
                    <div className={styles.featureCard}>
                        <div className={styles.featureIcon}>🎁</div>
                        <div className={styles.featureLabel}>PLUS</div>
                        <h3 className={styles.featureTitle}>Travel discounts & more</h3>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className={styles.pricingSection}>
                <h2 className={styles.title} style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Choose your plan</h2>
                <p style={{ color: 'var(--slogan-gray)', maxWidth: '600px', margin: '0 auto' }}>
                    Enjoy year-round perks and flexible protection for your trips.
                </p>

                <div className={styles.toggleContainer}>
                    <button className={`${styles.toggleBtn} ${styles.inactive}`}>Monthly</button>
                    <button className={`${styles.toggleBtn} ${styles.active}`}>Yearly (Best Value)</button>
                </div>

                <div className={styles.pricingGrid}>
                    {/* Plan 1 */}
                    <div className={styles.pricingCard}>
                        <div className={styles.planName}>PROTECT</div>
                        <div className={styles.planLimit}>6 trips</div>
                        <div className={styles.tripSubtext}>per year</div>

                        <div className={styles.planFeatures}>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}><strong>Fast $200</strong> when your flight's disrupted</span>
                            </div>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}><strong>Fast $200</strong> when you miss a connecting flight</span>
                            </div>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}><strong>Fast $200</strong> when your luggage is lost or delayed</span>
                            </div>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}>Lounge access during a disruption</span>
                            </div>
                        </div>

                        <div className={styles.priceBox}>
                            <div className={styles.price}>$14.99/mo</div>
                            <div className={styles.billed}>Billed at $179.99/year</div>
                        </div>
                    </div>

                    {/* Plan 2 */}
                    <div className={`${styles.pricingCard} ${styles.popular}`}>
                        <div className={styles.popularTag}>MOST POPULAR</div>
                        <div className={styles.planName}>PROTECT</div>
                        <div className={styles.planLimit}>9 trips</div>
                        <div className={styles.tripSubtext}>per year</div>

                        <div className={styles.planFeatures}>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}><strong>Fast $200</strong> when your flight's disrupted</span>
                            </div>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}><strong>Fast $200</strong> when you miss a connecting flight</span>
                            </div>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}><strong>Fast $200</strong> when your luggage is lost or delayed</span>
                            </div>
                            <div className={styles.planFeature}>
                                <div className={styles.checkPricing}>✓</div>
                                <span className={styles.featureText}>Lounge access during a disruption</span>
                            </div>
                        </div>

                        <div className={styles.priceBox}>
                            <div className={styles.price}>$20.75/mo</div>
                            <div className={styles.billed}>Billed at $249.99/year</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sticky Banner */}
            <div className={styles.stickyBanner}>
                <div className={styles.bannerContent}>
                    <h3>Get the ultimate flight protection. Become an Indemsy+ member.</h3>
                    <div className={styles.bannerFeatures}>
                        <div className={styles.bannerFeature}>✓ Fast $200 payouts</div>
                        <div className={styles.bannerFeature}>✓ No compensation fees</div>
                        <div className={styles.bannerFeature}>✓ Lounge comfort</div>
                    </div>
                </div>
                <Link href="#" className={styles.bannerBtn}>
                    From $179.99/year
                </Link>
            </div>
        </div>
    );
}
