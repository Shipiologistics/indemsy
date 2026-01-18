'use client';

import { useTranslations } from 'next-intl';
import styles from './TrustBadges.module.css';

export default function TrustBadges() {
    const t = useTranslations('featured');

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <p className={styles.title}>
                    {t('title')}
                </p>
                <div className={styles.badges}>
                    <div className={styles.badge}>
                        <span className={styles.usaToday}>🔴 USA TODAY</span>
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.wsj}>WSJ</span>
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.washingtonPost}>The Washington Post</span>
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.forbes}>Forbes</span>
                    </div>
                    <div className={styles.badge}>
                        <span className={styles.bloomberg}>Bloomberg</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
