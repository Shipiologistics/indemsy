'use client';

import { useState } from 'react';
import styles from './PreFooter.module.css';

export default function PreFooter() {
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && agreed) {
            // Handle newsletter signup
            console.log('Newsletter signup:', email);
            setEmail('');
            setAgreed(false);
            alert('Thank you for subscribing!');
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Main Grid */}
                <div className={styles.grid}>
                    {/* Newsletter Card */}
                    <div className={styles.newsletterCard}>
                        <video
                            src="https://img.airhelp.com/i/revamp/subscribe-video-plane.mp4"
                            loop
                            muted
                            playsInline
                            autoPlay
                            className={styles.videoBackground}
                            poster="https://img.airhelp.com/i/revamp/newsletter-plane-bg.webp"
                        />
                        <div className={styles.newsletterOverlay}></div>
                        <div className={styles.newsletterContent}>
                            <p className={styles.newsletterBadge}>Sign up for our newsletter</p>
                            <h3 className={styles.newsletterTitle}>
                                Get tips and advice straight to your inbox
                            </h3>
                            <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="email"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.emailInput}
                                        required
                                    />
                                    <button type="submit" className={styles.signUpBtn}>
                                        Sign Up
                                    </button>
                                </div>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <span className={styles.checkboxCustom}></span>
                                    <span className={styles.checkboxLabel}>
                                        I would like to receive emails from FlyCompensate, and I agree to the{' '}
                                        <a href="/privacy">Privacy Statement</a>.
                                    </span>
                                </label>
                            </form>
                        </div>
                    </div>

                    {/* Rights Guide Card */}
                    <div className={styles.rightsCard}>
                        <div className={styles.rightsContent}>
                            <p className={styles.rightsBadge}>Know your rights</p>
                            <h3 className={styles.rightsTitle}>Check out our easy guide</h3>
                            <a href="#" className={styles.rightsLink}>
                                Read more
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M13.132 11.632 9.31 7.81a1.061 1.061 0 0 1 1.5-1.5l4.615 4.614a1 1 0 0 1 0 1.413l-4.615 4.615a1.061 1.061 0 0 1-1.5-1.5z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <div className={styles.guideBook}>
                            <div className={styles.guideBookInner}>
                                <p className={styles.guideBookTitle}>
                                    Your guide to air passenger rights
                                    <span>2025 EDITION</span>
                                </p>
                                <img
                                    src="https://img.airhelp.com/i/revamp/aprg-window.png?tr=f-auto"
                                    alt="Passenger Rights Guide"
                                    className={styles.guideBookImage}
                                />
                            </div>
                        </div>
                    </div>

                    {/* APRA Card */}
                    <div className={styles.apraCard}>
                        <img
                            src="https://img.airhelp.com/i/revamp/logo-apra-blue.svg"
                            alt="APRA Logo"
                            className={styles.apraLogo}
                        />
                        <p className={styles.apraText}>
                            FlyCompensate is a part of the Association of Passenger Rights Advocates (APRA)
                            whose mission is to promote and protect passengers' rights.
                        </p>
                    </div>
                </div>

                {/* Press Logos */}
                <div className={styles.pressSection}>
                    <p className={styles.pressTitle}>
                        FLYCOMPENSATE HAS BEEN <span>FEATURED IN:</span>
                    </p>
                    <div className={styles.pressLogos}>
                        <img
                            src="https://img.airhelp.com/i/brand-logos/usa_today.svg"
                            alt="USA Today"
                        />
                        <img
                            src="https://img.airhelp.com/i/brand-logos/wsj.svg?tr=w-60,h-32,cm-extract"
                            alt="WSJ"
                        />
                        <img
                            src="https://img.airhelp.com/i/brand-logos/the-washington-post.svg"
                            alt="Washington Post"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
