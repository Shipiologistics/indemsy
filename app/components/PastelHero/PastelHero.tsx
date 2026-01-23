import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AirportSearch from '../AirportSearch/AirportSearch';
import styles from './PastelHero.module.css';

interface Airport {
    iata: string;
    icao: string;
    name: string;
    municipalityName: string;
    countryCode: string;
    label: string;
}

interface PastelHeroProps {
    title: string;
    showTrustpilot?: boolean;
    checkmarks?: {
        icon: 'calendar' | 'globe' | 'legal' | 'clock' | 'shield' | 'money';
        text: string;
    }[];
}

const iconMap = {
    calendar: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" className={styles.checkmarkIcon}>
            <path fillRule="evenodd" clipRule="evenodd" d="M4.66667 1.33334C4.29867 1.33334 4 1.632 4 2V2.66667H3.33333C2.6 2.66667 2 3.26667 2 4V13.3333C2 14.0667 2.6 14.6667 3.33333 14.6667H12.6667C13.4 14.6667 14 14.0667 14 13.3333V4C14 3.26667 13.4 2.66667 12.6667 2.66667H12V2C12 1.632 11.7013 1.33334 11.3333 1.33334C10.9653 1.33334 10.6667 1.632 10.6667 2V2.66667H5.33333V2C5.33333 1.632 5.03467 1.33334 4.66667 1.33334ZM3.33333 6H12.6667V12.6667C12.6667 13.0347 12.368 13.3333 12 13.3333H4C3.632 13.3333 3.33333 13.0347 3.33333 12.6667V6Z" fill="currentColor" />
        </svg>
    ),
    globe: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.checkmarkIcon}>
            <path fill="currentColor" fillRule="evenodd" d="M9.975 2c-.263 0-.525.1-.725.3L7.8 3.75 3.726 2.574 3 3.301l2.625 2.625-.937.937-1.952-.65L2 6.949 6.047 11l.738-.738-.648-1.95.937-.937 2.623 2.623.727-.725L9.25 5.2 10.7 3.75A1.025 1.025 0 0 0 9.974 2m3.949.23a1 1 0 0 0-.147 1.979c.793.18 1.539.484 2.223.879V9c0 .55.45 1 1 1a1 1 0 0 1 0 2h-3c-.55 0-1 .45-1 1v2c0 1.1.9 2 2 2a1 1 0 0 1 1 1v.928A8 8 0 0 1 12 20c-.693 0-1.36-.098-2-.262V19c0-1.1-.9-2-2-2a1 1 0 0 1-1-1v-1c0-.55-.45-1-1-1H4.262A8 8 0 0 1 4 12a1 1 0 1 0-2 0c0 5.511 4.489 10 10 10s10-4.489 10-10c0-4.748-3.325-8.73-7.777-9.742a1 1 0 0 0-.3-.028" clipRule="evenodd" />
        </svg>
    ),
    legal: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.checkmarkIcon}>
            <path fill="currentColor" fillRule="evenodd" d="M13.143 3a1 1 0 0 0-.688.303l-5.152 5.15-.004.006-.996.996a1 1 0 1 0 1.414 1.414l.295-.295 1.914 1.914-7.633 7.633a1 1 0 1 0 1.414 1.414l7.633-7.633 2.086 2.086-.293.293a1 1 0 1 0 1.414 1.414l.998-1 5.49-5.488a1 1 0 1 0-1.414-1.414l-.63.63-5.415-5.413.293-.293A1 1 0 0 0 13.143 3m.873 17a1 1 0 1 0 0 2h6.988a1 1 0 1 0 0-2z" clipRule="evenodd" />
        </svg>
    ),
    clock: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.checkmarkIcon}>
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
        </svg>
    ),
    shield: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.checkmarkIcon}>
            <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
    ),
    money: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.checkmarkIcon}>
            <path fill="currentColor" d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>
    ),
};

export default function PastelHero({ title, showTrustpilot = false, checkmarks }: PastelHeroProps) {
    const t = useTranslations('hero');
    const [departureAirport, setDepartureAirport] = useState<Airport | null>(null);
    const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);
    const router = useRouter();

    const defaultCheckmarks = [
        { icon: 'calendar' as const, text: t('checkmark1') },
        { icon: 'globe' as const, text: t('checkmark2') },
        { icon: 'legal' as const, text: t('checkmark3') },
    ];

    const displayCheckmarks = checkmarks || defaultCheckmarks;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!departureAirport) return;

        const params = new URLSearchParams({
            from: departureAirport.iata || departureAirport.icao,
        });

        if (arrivalAirport) {
            params.append('to', arrivalAirport.iata || arrivalAirport.icao);
        }

        router.push(`/claim?${params.toString()}`);
    };

    return (
        <section className={styles.hero} id="check">
            {/* Pastel gradient background */}
            <div className={styles.gradientBackground} />
            <div className={styles.gradientOverlay} />

            <div className={styles.heroContent}>
                {/* Trustpilot Badge */}
                {showTrustpilot && (
                    <div className={styles.trustpilot}>
                        <a
                            href="https://www.trustpilot.com/review/www.flycompense.com"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            className={styles.trustpilotLink}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={styles.trustpilotStar}>
                                <path fill="#00B67A" d="M22 9.643h-7.637L12.003 2 9.638 9.643 2 9.636l6.185 4.728L5.819 22l6.185-4.72L18.18 22l-2.359-7.636z" />
                                <path fill="#005128" d="m16.353 16.093-.53-1.729-3.82 2.915z" />
                            </svg>
                            <span className={styles.trustpilotText}>Trustpilot</span>
                            <span className={styles.trustpilotExcellent}>Excellent</span>
                            <div className={styles.trustpilotStars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <div key={star} className={`${styles.star} ${star === 5 ? styles.starHalf : ''}`} />
                                ))}
                            </div>
                            <span className={styles.trustpilotReviews}>230,128 reviews</span>
                        </a>
                    </div>
                )}

                {/* Title */}
                <h1 className={styles.title}>{title}</h1>

                {/* Form Card */}
                <div className={styles.formCard}>
                    <div className={styles.formCardGlass} />
                    <div className={styles.formCardContent}>
                        <p className={styles.formSubtitle}>
                            {t('formSubtitle')}
                        </p>

                        <form className={styles.formWrapper} onSubmit={handleSubmit}>
                            <div className={styles.formInner}>
                                <div className={styles.inputGroup}>
                                    <div className={styles.inputWrapper}>
                                        <AirportSearch
                                            id="departure-airport-pastel"
                                            placeholder={t('departureAirport')}
                                            icon={
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(-45deg)', color: '#9CA3AF' }}>
                                                    <path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-2.13.59 4.54 4.75-4.76 1.08-2.59-2.24-1.58.36 2.52 3.81c.23.36.62.59 1.05.62l13.68 1.43c.8.08 1.54-.49 1.76-1.28z" />
                                                </svg>
                                            }
                                            value={departureAirport}
                                            onChange={setDepartureAirport}
                                        />
                                    </div>
                                    <div className={styles.inputWrapper}>
                                        <AirportSearch
                                            id="arrival-airport-pastel"
                                            placeholder={t('arrivalAirport')}
                                            icon={
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ transform: 'rotate(45deg)', color: '#9CA3AF' }}>
                                                    <path d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10l-6.9-6.43-2.13.59 4.54 4.75-4.76 1.08-2.59-2.24-1.58.36 2.52 3.81c.23.36.62.59 1.05.62l13.68 1.43c.8.08 1.54-.49 1.76-1.28z" />
                                                </svg>
                                            }
                                            value={arrivalAirport}
                                            onChange={setArrivalAirport}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className={styles.ctaButton}
                                    disabled={!departureAirport}
                                >
                                    {t('cta')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Checkmarks */}
                <div className={styles.checkmarksSection}>
                    <p className={styles.checkmarksLabel}>{t('checkmarksLabel')}</p>
                    <div className={styles.checkmarks}>
                        {displayCheckmarks.map((item, index) => (
                            <div key={index} className={styles.checkmarkItem}>
                                {iconMap[item.icon]}
                                <span className={styles.checkmarkText}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
