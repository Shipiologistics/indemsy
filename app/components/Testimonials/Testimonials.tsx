'use client';

import styles from './Testimonials.module.css';

const testimonials = [
    {
        name: 'Vikash Chand',
        date: 'A day ago',
        text: 'The whole process was easy and efficient, I wasn\'t expecting much but they exceeded expectation. I have never had such a easy and...',
        rating: 5,
    },
    {
        name: 'Carolina Sosa',
        date: 'A day ago',
        text: 'The whole process it is very smooth; just a few information to be provided; also, I received the recompensation very fast in my...',
        rating: 5,
    },
    {
        name: 'Mike Buckley',
        date: 'A day ago',
        text: 'After my missed flight connection due to a late arrival, I tried to find how to claim compensation directly...',
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className={styles.section} id="testimonials">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>
                        <span className={styles.badgeIcon}>⭐</span>
                        TESTIMONIALS
                    </span>
                    <h2 className={styles.title}>Our customers love us</h2>
                    <a href="#" className={styles.trustpilotLink}>
                        See all customer reviews on
                        <span className={styles.trustpilotLogo}>★ Trustpilot</span>
                    </a>
                </div>

                <div className={styles.grid}>
                    {/* Stats Card */}
                    <div className={styles.statsCard}>
                        <p className={styles.statsText}>
                            We've helped <span className={styles.statsHighlight}>3 million</span> passengers get paid compensation
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
                            Trustpilot 4.5/5 based on 229,858 reviews
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
                                <span className={styles.reviewDate}>{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
