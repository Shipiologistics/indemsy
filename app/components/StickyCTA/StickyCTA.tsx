'use client';

import { useState, useEffect } from 'react';
import styles from './StickyCTA.module.css';

export default function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling past 80% of viewport height
            const scrollThreshold = window.innerHeight * 0.8;
            setIsVisible(window.scrollY > scrollThreshold);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`${styles.stickyWrapper} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.stickyCTA}>
                {/* Background Image */}
                <div className={styles.backgroundWrapper}>
                    <img
                        src="https://img.airhelp.com/i/revamp/sticky-banner-revampv2-bg.png"
                        alt=""
                        className={styles.backgroundImage}
                        loading="lazy"
                    />
                </div>

                <div className={styles.container}>
                    <div className={styles.content}>
                        <h4 className={styles.title}>
                            Claim up to $650 for your delayed or canceled flight.
                        </h4>
                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" fillRule="evenodd" d="M19.583 7.374a1.41 1.41 0 0 0-1.97.03l-6.805 6.868-3.39-3.515a1.4 1.4 0 1 0-2 1.961l4.333 4.348a1.5 1.5 0 0 0 2.12.006l7.734-7.678a1.41 1.41 0 0 0-.022-2.02" clipRule="evenodd" />
                                </svg>
                                <span>All airlines</span>
                            </div>
                            <div className={styles.feature}>
                                <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" fillRule="evenodd" d="M19.583 7.374a1.41 1.41 0 0 0-1.97.03l-6.805 6.868-3.39-3.515a1.4 1.4 0 1 0-2 1.961l4.333 4.348a1.5 1.5 0 0 0 2.12.006l7.734-7.678a1.41 1.41 0 0 0-.022-2.02" clipRule="evenodd" />
                                </svg>
                                <span>All countries</span>
                            </div>
                            <div className={styles.feature}>
                                <svg className={styles.checkIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                                    <path fill="currentColor" fillRule="evenodd" d="M19.583 7.374a1.41 1.41 0 0 0-1.97.03l-6.805 6.868-3.39-3.515a1.4 1.4 0 1 0-2 1.961l4.333 4.348a1.5 1.5 0 0 0 2.12.006l7.734-7.678a1.41 1.41 0 0 0-.022-2.02" clipRule="evenodd" />
                                </svg>
                                <span>No Win, No Fee</span>
                            </div>
                        </div>
                    </div>
                    <a href="#check" className={styles.ctaButton}>
                        Check Compensation
                    </a>
                </div>
            </div>
        </div>
    );
}
