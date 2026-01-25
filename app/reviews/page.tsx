'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import PastelHero from '../components/PastelHero/PastelHero';
import TrustBadges from '../components/TrustBadges/TrustBadges';
import styles from './page.module.css';

// Mock data for reviews
const allReviews = [
    {
        name: 'Vikash Chand',
        text: "The whole process was easy and efficient, I wasn't expecting much but they exceeded expectation. I have never had such a easy and smooth experience with a claim company.",
        rating: 5,
        date: '2 days ago'
    },
    {
        name: 'Carolina Sosa',
        text: "The whole process it is very smooth; just a few information to be provided; also, I received the recompensation very fast in my bank account.",
        rating: 5,
        date: '3 days ago'
    },
    {
        name: 'Mike Buckley',
        text: "After my missed flight connection due to a late arrival, I tried to find how to claim compensation directly. It was a nightmare. FlyCompense handled everything perfectly.",
        rating: 5,
        date: '1 week ago'
    },
    {
        name: 'Sarah Jenkins',
        text: "I didn't believe I would get any money back for a flight delayed 3 years ago. They proved me wrong! Got €600 minus their fee. Totally worth it.",
        rating: 5,
        date: '2 weeks ago'
    },
    {
        name: 'David Miller',
        text: "Communication was excellent throughout. They kept me updated at every stage of the claim against British Airways.",
        rating: 4,
        date: '3 weeks ago'
    },
    {
        name: 'Emma Wilson',
        text: "Simple, fast, and effective. The dashboard is really easy to use to track your claim status.",
        rating: 5,
        date: '1 month ago'
    },
    {
        name: 'Jean-Pierre Dubois',
        text: "Service exceptionnel. J'ai reçu mon indemnisation en moins de 3 mois alors que la compagnie aérienne m'avait ignoré.",
        rating: 5,
        date: '1 month ago'
    },
    {
        name: 'Lars Jensen',
        text: "Very professional service. It took a bit longer than expected but that was due to the airline's stubbornness. FlyCompense persisted and won.",
        rating: 4,
        date: '2 months ago'
    },
    {
        name: 'Maria Garcia',
        text: "Gracias a FlyCompense recuperé 400 euros por un retraso de 5 horas. ¡Recomendado!",
        rating: 5,
        date: '2 months ago'
    }
];

export default function ReviewsPage() {
    const t = useTranslations('testimonials'); // reusing testimonials translations where possible

    // We can fetch more translations if we add a 'reviews' namespace, 
    // but for now let's mix hardcoded with re-used ones or just use hardcoded for the unique parts.

    return (
        <div className={styles.main}>
            {/* Hero Section */}
            <PastelHero
                title="Customer Reviews"
                checkmarks={[
                    { icon: 'shield', text: 'Rated 4.6/5 on Trustpilot' },
                    { icon: 'globe', text: 'Over 3 million passengers helped' },
                    { icon: 'money', text: 'Transparent and honest reviews' }
                ]}
            />

            <div className={styles.container}>
                {/* Header Text */}
                <div className={styles.header}>
                    <h2 className={styles.title}>What our customers say</h2>
                    <p className={styles.subtitle}>
                        We fight for air passenger rights every day. Here is what passengers have to say about our service.
                        We are proud to have helped thousands of travelers get the compensation they deserve.
                    </p>
                </div>

                {/* Stats Section */}
                <div className={styles.statsSection}>
                    <p className={styles.statsText}>
                        We've helped <strong>3 million passengers</strong> enforce their rights and get up to <strong>€600</strong> in compensation.
                    </p>
                    <div className={styles.ratingWrapper}>
                        <div className={styles.laurel}>🏆</div>
                        <div>
                            <div className={styles.ratingNumber}>4.6/5</div>
                            <div className={styles.ratingStars}>★★★★★</div>
                        </div>
                        <div className={styles.laurel}>🏆</div>
                    </div>
                    <div style={{ marginTop: '1rem', opacity: 0.8 }}>
                        Based on 229,858 reviews
                    </div>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <TrustBadges />
                </div>

                {/* Reviews Grid */}
                <div className={styles.reviewsGrid}>
                    {allReviews.map((review, index) => (
                        <div key={index} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <div className={styles.stars}>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <span key={i} className={styles.star}>★</span>
                                    ))}
                                    {[...Array(5 - review.rating)].map((_, i) => (
                                        <span key={i + review.rating} className={`${styles.star}`} style={{ background: '#e5e7eb' }}>★</span>
                                    ))}
                                </div>
                                <span className={styles.date}>{review.date}</span>
                            </div>
                            <p className={styles.reviewContent}>"{review.text}"</p>
                            <div className={styles.reviewFooter}>
                                <span className={styles.author}>{review.name}</span>
                                <span style={{ fontSize: '12px', color: '#00b67a' }}>Verified Claim</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className={styles.ctaSection}>
                    <h2 className={styles.ctaTitle}>Start your claim today</h2>
                    <p className={styles.ctaText}>Check if you are eligible for compensation in less than 3 minutes.</p>
                    <Link href="/claim">
                        <button className={styles.ctaButton}>Check Compensation</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
