'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import AirportSearch from '../AirportSearch/AirportSearch';
import BoardingPassModal from '../BoardingPassModal/BoardingPassModal';
import styles from './Hero.module.css';

interface Airport {
    iata: string;
    icao: string;
    name: string;
    municipalityName: string;
    countryCode: string;
    label: string;
}

export default function Hero() {
    const [departureAirport, setDepartureAirport] = useState<Airport | null>(null);
    const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);
    const [showBoardingPassModal, setShowBoardingPassModal] = useState(false);
    const router = useRouter();
    const t = useTranslations('hero');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!departureAirport) {
            alert('Please select a departure airport');
            return;
        }

        const params = new URLSearchParams({
            from: departureAirport.iata || departureAirport.icao,
        });

        if (arrivalAirport) {
            params.append('to', arrivalAirport.iata || arrivalAirport.icao);
        }

        router.push(`/claim?${params.toString()}`);
    };

    const swapAirports = () => {
        const temp = departureAirport;
        setDepartureAirport(arrivalAirport);
        setArrivalAirport(temp);
    };

    return (
        <section className={styles.hero} id="check">
            {/* Background Image */}
            <div className={styles.backgroundWrapper}>
                <picture className={styles.backgroundPicture}>
                    <source
                        media="(min-width: 768px)"
                        srcSet="https://img.airhelp.com/i/revamp/hero-section-bg-desktop.png?tr=f-auto"
                    />
                    <source
                        media="(max-width: 767px)"
                        srcSet="https://img.airhelp.com/i/revamp/hero-section-bg-v2-variant-2.png?tr=f-auto"
                    />
                    <img
                        src="https://img.airhelp.com/i/revamp/hero-section-bg-v2-variant-2.png?tr=f-auto"
                        alt="hero background"
                        loading="eager"
                        className={styles.backgroundImage}
                    />
                </picture>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Trustpilot Badge Removed */}

                    {/* Title */}
                    <h1 className={styles.title}>
                        {t('title')}
                        <span className={styles.highlight}>{t('highlight')}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={styles.subtitle}>
                        {t('subtitle')}
                    </p>

                    {/* Form */}
                    <div className={styles.glassContainer}>
                        <form className={styles.form} onSubmit={handleSubmit} style={{ marginBottom: 0 }}>
                            <div className={styles.formCard}>
                                <div className={styles.inputGroup}>
                                    <div className={styles.searchContainer}>
                                        <AirportSearch
                                            id="departure-airport"
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

                                    <div className={styles.separator}></div>

                                    <div className={styles.searchContainer}>
                                        <AirportSearch
                                            id="arrival-airport"
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

                                    <button
                                        type="submit"
                                        className={styles.submitBtn}
                                        disabled={!departureAirport}
                                    >
                                        {t('checkCompensation')}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Fast Check Option */}
                        <div className={styles.fastCheck}>
                            <span className={styles.fastCheckLabel}>{t('orFastCheck')}</span>
                            <button
                                type="button"
                                className={styles.boardingPassBtn}
                                onClick={() => setShowBoardingPassModal(true)}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M12.014 2a1 1 0 0 0-.707.295l-5.133 4.84-.011.01-.002.001A.5.5 0 0 0 6.514 8h3.5v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8h3.5a.5.5 0 0 0 .354-.854l-.031-.029-5.106-4.814-.033-.032A1 1 0 0 0 12.014 2m-9 18a1 1 0 1 0 0 2h18a1 1 0 1 0 0-2z" clipRule="evenodd" />
                                </svg>
                                {t('boardingPass')}
                            </button>
                        </div>
                    </div>

                    {/* Features */}
                    <div className={styles.features}>
                        <div className={styles.feature}>
                            <span className={styles.featureIcon}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </span>
                            <span>{t('freeCheck')}</span>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <span>{t('fastRiskFree')}</span>
                        </div>
                        <div className={styles.feature}>
                            <div className={styles.featureIcon}>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <span>{t('highestSuccess')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Boarding Pass Upload Modal */}
            <BoardingPassModal
                isOpen={showBoardingPassModal}
                onClose={() => setShowBoardingPassModal(false)}
            />
        </section>
    );
}
