'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import styles from './CompensationSlider.module.css';

export default function CompensationSlider() {
    const [sliderValue, setSliderValue] = useState(3); // 0-3 for 4 positions
    const t = useTranslations('compensation');

    // Get position percentage based on step (non-linear mapping)
    const getPositionFromValue = (val: number) => {
        if (val === 0) return 0;
        if (val === 1) return 25;
        if (val === 2) return 70;
        return 100;
    };

    const position = getPositionFromValue(sliderValue);

    const currentData = useMemo(() => {
        if (sliderValue === 0) return { amount: 250, label: t('distance250'), currency: '€' };
        if (sliderValue === 1) return { amount: 400, label: t('distance400'), currency: '€' };
        return { amount: 600, label: t('distance600'), currency: '€' };
    }, [sliderValue, t]);

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(Number(e.target.value));
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Side - Text Content */}
                <div className={styles.textContent}>
                    <p className={styles.badge}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path fillRule="evenodd" d="M19.625 3.01a1 1 0 0 0-.396.022L3.99 7.001h7.938l5.957-1.55c.253.371.658.61 1.107.65l.236.9h2.067l-.848-3.252a1 1 0 0 0-.822-.738M3 9a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1zm1.912 2h14.176a1.5 1.5 0 0 0 .912.913v6.176a1.5 1.5 0 0 0-.912.912H4.912A1.5 1.5 0 0 0 4 18.089v-6.176a1.5 1.5 0 0 0 .912-.912M12 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6m-5 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" clipRule="evenodd" />
                        </svg>
                        {t('title')}
                    </p>
                    <h2 className={styles.title}>{t('subtitle')}</h2>
                    <p className={styles.description}>
                        {t('description')}
                    </p>
                </div>

                {/* Right Side - Slider Card */}
                <div className={styles.sliderCard}>
                    <span className={styles.amount}>€{currentData.amount}</span>
                    <span className={styles.distanceLabel}>{currentData.label}</span>

                    <div className={styles.sliderWrapper}>
                        {/* Blur Gradient Effect (Behind everything) */}
                        <div className={styles.blurGradientWrapper}>
                            <div
                                className={styles.blurGradientMask}
                                style={{ left: `${position}%` }}
                            ></div>
                            <div className={styles.blurGradient}></div>
                        </div>

                        {/* Track Area */}
                        <div className={styles.trackArea}>
                            {/* Airplane */}
                            <img
                                src="https://img.airhelp.com/i/revamp/airplane.png"
                                alt="airplane"
                                className={styles.airplane}
                                style={{ left: `calc(${position}% - 48px)` }}
                                draggable="false"
                            />

                            {/* Track Background (Gray) */}
                            <div className={styles.trackBackground}></div>

                            {/* Track Fill (Gradient) */}
                            <div
                                className={styles.trackFill}
                                style={{ width: `${position}%` }}
                            ></div>

                            {/* Vertical Line */}
                            <div
                                className={styles.verticalLine}
                                style={{ left: `${position}%` }}
                            ></div>

                            {/* Visual Thumb (non-interactive, just visual) */}
                            <div
                                className={styles.thumbVisual}
                                style={{ left: `${position}%` }}
                            ></div>

                            {/* Interactive Range Input (Full width, invisible but captures all interactions) */}
                            <input
                                type="range"
                                min="0"
                                max="3"
                                step="1"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                className={styles.rangeInput}
                                aria-label="Flight distance"
                            />
                        </div>

                        {/* Tick Marks */}
                        <div className={styles.tickMarks}>
                            {Array.from({ length: 38 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`${styles.tick} ${(i === 9 || i === 26 || i === 37) ? styles.tallTick : ''}`}
                                ></div>
                            ))}
                        </div>

                        {/* Labels */}
                        <div className={styles.labels}>
                            <span className={styles.label} style={{ left: '25%', transform: 'translateX(-50%)' }}>{t('range1500')}</span>
                            <span className={styles.label} style={{ left: '70%', transform: 'translateX(-50%)' }}>{t('range3500')}</span>
                            <span className={styles.label} style={{ right: '0' }}>{t('rangeMore')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
