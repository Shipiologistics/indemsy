import { db } from '@/lib/db';
import { teamMembers } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Our Experts - FlyCompense Team',
    description: 'Meet the legal experts and travel professionals fighting for your passenger rights.',
};

export default async function ExpertsPage() {
    const experts = await db
        .select()
        .from(teamMembers)
        .where(eq(teamMembers.isActive, true))
        .orderBy(teamMembers.displayOrder);

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Meet Our Experts</h1>
                <p className={styles.heroSubtitle}>
                    A dedicated team of legal professionals and travel enthusiasts fighting for your rights.
                </p>
            </section>

            <div className={styles.container}>
                {experts.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>Our team is growing! Check back soon.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {experts.map((expert) => (
                            <div key={expert.id} className={styles.expertCard}>
                                <div className={styles.imageWrapper}>
                                    {expert.photo ? (
                                        <img src={expert.photo} alt={expert.name} className={styles.expertImage} />
                                    ) : (
                                        <div className={styles.placeholderImage}>👤</div>
                                    )}
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.name}>{expert.name}</h3>
                                    <p className={styles.role}>{expert.role}</p>
                                    <p className={styles.bio}>{expert.bio}</p>

                                    <div className={styles.social}>
                                        {expert.linkedin && (
                                            <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                                LinkedIn
                                            </a>
                                        )}
                                        {expert.twitter && (
                                            <a href={expert.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                                Twitter
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
