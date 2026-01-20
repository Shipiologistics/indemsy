'use client';

import { useState, useEffect, useRef } from 'react';
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
    const [isWidgetVisible, setIsWidgetVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const lastScrollY = useRef(0);
    const router = useRouter();
    const t = useTranslations('hero');

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            if (document.body.classList.contains('chatbot-open')) {
                setIsWidgetVisible(false); // Force hide to provide space
                return;
            }

            const currentScrollY = window.scrollY;
            const heroElement = document.getElementById('check');
            const heroBottom = heroElement ? heroElement.offsetTop + heroElement.offsetHeight : 0;

            if (currentScrollY < lastScrollY.current) {
                // Scrolling up - show widget
                setIsWidgetVisible(true);
            } else if (currentScrollY > 50) {
                // Scrolling down past threshold - hide widget
                setIsWidgetVisible(false);
            }

            lastScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile]);

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
                        media="(max-width: 768px)"
                        srcSet="/best-airlines-us.jpg"
                    />
                    <img
                        src="/Gemini_Generated_Image_e5ttsbe5ttsbe5tt.png"
                        alt="Flight compensation hero background"
                        className={styles.backgroundImage}
                    />
                </picture>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Mobile Widget - Slides from header */}
                    <div id="compensation-widget" className={`${styles.mobileWidget} ${isWidgetVisible ? styles.widgetVisible : styles.widgetHidden}`}>
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
                        </div>
                    </div>

                    {/* Trust Badges - Always at bottom */}
                    <div className={styles.featuresBottom}>
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
            </div>

            {/* Boarding Pass Upload Modal */}
            <BoardingPassModal
                isOpen={showBoardingPassModal}
                onClose={() => setShowBoardingPassModal(false)}
            />
        </section>
    );
}

