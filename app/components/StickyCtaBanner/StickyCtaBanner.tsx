'use client';

import Link from 'next/link';
import styles from './StickyCtaBanner.module.css';

export default function StickyCtaBanner() {
    return (
        <div className={styles.stickyBanner}>
            <div className={styles.bannerContainer}>
                <div className={styles.bannerContent}>
                    <p className={styles.bannerText}>
                        Claim up to €600 for your delayed or canceled flight.
                    </p>
                    <div className={styles.bannerChips}>
                        <div className={styles.chip}>
                            <svg viewBox="0 0 18 14" width="16" height="12" className={styles.checkIcon}>
                                <path fill="currentColor" d="M15.995.931c-.2598.0073-.5064.1081-.6875.2812l-10.293 9.5592-3.293-3.0582a1.005 1.005 0 00-.3246-.2093 1.0659 1.0659 0 00-.3866-.0762 1.0677 1.0677 0 00-.3882.0689 1.009 1.009 0 00-.3292.203.927.927 0 00-.2187.3058A.8711.8711 0 000 8.3659a.8727.8727 0 00.082.359.931.931 0 00.2254.3015l4 3.7149c.1875.1741.4418.2719.707.2719.2652 0 .5195-.0978.707-.2719l11-10.2158c.1445-.1305.2432-.2984.2832-.4819a.8684.8684 0 00-.0592-.5461c-.0786-.1724-.2114-.3187-.381-.4198a1.058 1.058 0 00-.5695-.1466z" />
                            </svg>
                            <span>All airlines</span>
                        </div>
                        <div className={styles.chip}>
                            <svg viewBox="0 0 18 14" width="16" height="12" className={styles.checkIcon}>
                                <path fill="currentColor" d="M15.995.931c-.2598.0073-.5064.1081-.6875.2812l-10.293 9.5592-3.293-3.0582a1.005 1.005 0 00-.3246-.2093 1.0659 1.0659 0 00-.3866-.0762 1.0677 1.0677 0 00-.3882.0689 1.009 1.009 0 00-.3292.203.927.927 0 00-.2187.3058A.8711.8711 0 000 8.3659a.8727.8727 0 00.082.359.931.931 0 00.2254.3015l4 3.7149c.1875.1741.4418.2719.707.2719.2652 0 .5195-.0978.707-.2719l11-10.2158c.1445-.1305.2432-.2984.2832-.4819a.8684.8684 0 00-.0592-.5461c-.0786-.1724-.2114-.3187-.381-.4198a1.058 1.058 0 00-.5695-.1466z" />
                            </svg>
                            <span>All countries</span>
                        </div>
                        <div className={styles.chip}>
                            <svg viewBox="0 0 18 14" width="16" height="12" className={styles.checkIcon}>
                                <path fill="currentColor" d="M15.995.931c-.2598.0073-.5064.1081-.6875.2812l-10.293 9.5592-3.293-3.0582a1.005 1.005 0 00-.3246-.2093 1.0659 1.0659 0 00-.3866-.0762 1.0677 1.0677 0 00-.3882.0689 1.009 1.009 0 00-.3292.203.927.927 0 00-.2187.3058A.8711.8711 0 000 8.3659a.8727.8727 0 00.082.359.931.931 0 00.2254.3015l4 3.7149c.1875.1741.4418.2719.707.2719.2652 0 .5195-.0978.707-.2719l11-10.2158c.1445-.1305.2432-.2984.2832-.4819a.8684.8684 0 00-.0592-.5461c-.0786-.1724-.2114-.3187-.381-.4198a1.058 1.058 0 00-.5695-.1466z" />
                            </svg>
                            <span>No win, no fee</span>
                        </div>
                    </div>
                </div>
                <Link href="/claim" className={styles.ctaButton}>Check Compensation</Link>
            </div>
        </div>
    );
}
