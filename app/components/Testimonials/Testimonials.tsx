'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        name: 'Vikash Chand',
        text: 'The whole process was easy and efficient, I wasn\'t expecting much but they exceeded expectation. I have never had such a easy and...',
        rating: 5,
    },
    {
        name: 'Carolina Sosa',
        text: 'The whole process it is very smooth; just a few information to be provided; also, I received the recompensation very fast in my...',
        rating: 5,
    },
    {
        name: 'Mike Buckley',
        text: 'After my missed flight connection due to a late arrival, I tried to find how to claim compensation directly...',
        rating: 5,
    },
];

export default function Testimonials() {
    const t = useTranslations('testimonials');
    const sliderRef = useRef<HTMLDivElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);

    const scrollToSlide = (index: number) => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth;
            sliderRef.current.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            setActiveSlide(index);
        }
    };

    const handleScroll = () => {
        if (sliderRef.current) {
            const slideWidth = sliderRef.current.offsetWidth;
            const scrollPosition = sliderRef.current.scrollLeft;
            const newActiveSlide = Math.round(scrollPosition / slideWidth);
            setActiveSlide(newActiveSlide);
        }
    };

    return (
        <section className={styles.section} id="testimonials">
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <span className={styles.badge}>
                            <span className={styles.badgeIcon}>⭐</span>
                            {t('sectionLabel')}
                        </span>
                        <h2 className={styles.title}>{t('title')}</h2>
                    </div>
                    <a href="#" className={styles.trustpilotLink}>
                        {t('seeAll')}
                        <span className={styles.trustpilotLogo}>★ Trustpilot</span>
                    </a>
                </div>

                {/* Desktop Grid */}
                <div className={styles.desktopGrid}>
                    {/* Stats Card */}
                    <div className={styles.statsCard}>
                        <p className={styles.statsText}>
                            {t('helped')}
                        </p>
                        <div className={styles.ratingWrapper}>
                            <div className={styles.laurelLeft}>🏆</div>
                            <div className={styles.ratingContent}>
                                <span className={styles.ratingNumber}>4.5/5</span>
                                <span className={styles.ratingStars}>★★★★★</span>
                            </div>
                            <div className={styles.laurelRight}>🏆</div>
                        </div>
                        <div className={styles.trustpilotBadge}>
                            <span className={styles.trustpilotIcon}>★</span>
                            Trustpilot 4.5/5 {t('basedOn')}
                        </div>
                    </div>

                    {/* Review Cards */}
                    {testimonials.map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.starsRow}>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <span key={i} className={styles.star}>★</span>
                                    ))}
                                </div>
                            </div>
                            <p className={styles.reviewText}>{review.text}</p>
                            <div className={styles.reviewFooter}>
                                <span className={styles.reviewerName}>{review.name}</span>
                                <span className={styles.reviewDate}>{t('dayAgo')}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile Slider */}
                <div className={styles.mobileSliderWrapper}>
                    {/* Stats Card - Always visible on mobile */}
                    <div className={styles.mobileStatsCard}>
                        <p className={styles.statsText}>
                            {t('helped')}
                        </p>
                        <div className={styles.ratingWrapper}>
                            <div className={styles.laurelLeft}>🏆</div>
                            <div className={styles.ratingContent}>
                                <span className={styles.ratingNumber}>4.5/5</span>
                                <span className={styles.ratingStars}>★★★★★</span>
                            </div>
                            <div className={styles.laurelRight}>🏆</div>
                        </div>
                        <div className={styles.trustpilotBadge}>
                            <span className={styles.trustpilotIcon}>★</span>
                            Trustpilot 4.5/5 {t('basedOn')}
                        </div>
                    </div>

                    {/* Horizontal Slider */}
                    <div
                        className={styles.mobileSlider}
                        ref={sliderRef}
                        onScroll={handleScroll}
                    >
                        {testimonials.map((review, index) => (
                            <div key={index} className={styles.mobileSlide}>
                                <div className={styles.reviewCard}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.starsRow}>
                                            {[...Array(review.rating)].map((_, i) => (
                                                <span key={i} className={styles.star}>★</span>
                                            ))}
                                        </div>
                                    </div>
                                    <p className={styles.reviewText}>{review.text}</p>
                                    <div className={styles.reviewFooter}>
                                        <span className={styles.reviewerName}>{review.name}</span>
                                        <span className={styles.reviewDate}>{t('dayAgo')}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Dots Navigation */}
                    <div className={styles.sliderDots}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${activeSlide === index ? styles.activeDot : ''}`}
                                onClick={() => scrollToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
