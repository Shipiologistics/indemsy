import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './FeeSection.module.css';

export default function FeeSection() {
    const t = useTranslations('feeSection');

    return (
        <section className={styles.section} data-testid="fee-section">
            <div className={styles.bgContainer}>
                <picture className={styles.picture}>
                    <source
                        media="(min-width: 992px)"
                        srcSet="https://img.airhelp.com/i/revamp/fee-section-bg.png?tr=f-auto"
                    />
                    <img
                        src="https://img.airhelp.com/i/revamp/mobile-fee-section-bg.png?tr=f-auto"
                        alt="Our fee background"
                        className={styles.bgImage}
                        loading="lazy"
                    />
                </picture>
            </div>

            {/* Gradients */}
            <div className={styles.gradientOverlay}></div>

            <div className={styles.contentContainer}>
                <div className={styles.contentWrapper}>
                    <div className={styles.eyebrow}>
                        <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10.5001 18.3334C15.1001 18.3334 18.8334 14.6001 18.8334 10.0001C18.8334 5.40008 15.1001 1.66675 10.5001 1.66675C5.90008 1.66675 2.16675 5.40008 2.16675 10.0001C2.16675 14.6001 5.90008 18.3334 10.5001 18.3334ZM11.3334 3.39175C14.6167 3.80008 17.1667 6.60008 17.1667 10.0001C17.1667 13.4001 14.6251 16.2001 11.3334 16.6084V3.39175Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>{t('eyebrow')}</span>
                    </div>

                    <h2 className={styles.title}>{t('title')}</h2>

                    <p className={styles.description}>
                        {t('description')}
                    </p>

                    <p>
                        <Link href="/our-fees" className={styles.link}>
                            {t('link')} &rarr;
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
