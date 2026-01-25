'use client';

import { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useTranslations } from 'next-intl';
import styles from './PreFooter.module.css';

export default function PreFooter() {
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const tNewsletter = useTranslations('newsletter');
    const tRights = useTranslations('rights');
    const tFeatured = useTranslations('featured');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && agreed) {
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
                        <DotLottieReact
                            src="https://lottie.host/2ca4aab1-94f0-4112-af0e-879fece3e1ff/ayVfprWKUW.lottie"
                            loop
                            autoplay
                            className={styles.videoBackground}
                        />
                        <div className={styles.newsletterOverlay}></div>
                        <div className={styles.newsletterContent}>
                            <p className={styles.newsletterBadge}>{tNewsletter('title')}</p>
                            <h3 className={styles.newsletterTitle}>
                                {tNewsletter('subtitle')}
                            </h3>
                            <form className={styles.newsletterForm} onSubmit={handleSubmit}>
                                <div className={styles.inputGroup}>
                                    <input
                                        type="email"
                                        placeholder={tNewsletter('placeholder')}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.emailInput}
                                        required
                                    />
                                    <button type="submit" className={styles.signUpBtn}>
                                        {tNewsletter('button')}
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
                                        {tNewsletter('consent')}
                                    </span>
                                </label>
                            </form>
                        </div>
                    </div>

                    {/* Rights Guide Card */}
                    <div className={styles.rightsCard}>
                        <div className={styles.rightsContent}>
                            <p className={styles.rightsBadge}>{tRights('title')}</p>
                            <h3 className={styles.rightsTitle}>{tRights('subtitle')}</h3>
                            <a href="/air-passenger-rights" className={styles.rightsLink}>
                                {tRights('readMore')}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M13.132 11.632 9.31 7.81a1.061 1.061 0 0 1 1.5-1.5l4.615 4.614a1 1 0 0 1 0 1.413l-4.615 4.615a1.061 1.061 0 0 1-1.5-1.5z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                        <div className={styles.guideBook}>
                            <div className={styles.guideBookInner}>
                                <p className={styles.guideBookTitle}>
                                    {tRights('guideTitle')}
                                    <span>{tRights('edition')}</span>
                                </p>
                                <img
                                    src="https://img.airhelp.com/i/revamp/aprg-window.png?tr=f-auto"
                                    alt={tRights('guideLabel')}
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
                            {tRights('apraText')}
                        </p>
                    </div>
                </div>

                {/* Press Logos */}
                <div className={styles.pressSection}>
                    <p className={styles.pressTitle}>
                        {tFeatured('title')}
                    </p>
                    <div className={styles.pressLogos}>
                        <img src="/media/lessentiel.svg" alt="L'essentiel" />
                        <img src="/media/virgule.svg" alt="Virgule" />
                        <img src="/media/lequotidien.svg" alt="Le Quotidien" />
                        <img src="/media/paperjam.svg" alt="Paperjam" />
                        <img src="/media/rtl.svg" alt="RTL" />
                    </div>
                </div>
            </div>
        </section>
    );
}
