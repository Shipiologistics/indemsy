import { db } from '@/lib/db';
import { jobPostings } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Careers - Join the FlyCompense Team',
    description: 'Explore career opportunities at FlyCompense and help passengers get the compensation they deserve.',
};

export default async function CareersPage() {
    const jobs = await db
        .select()
        .from(jobPostings)
        .where(eq(jobPostings.isActive, true))
        .orderBy(desc(jobPostings.createdAt));

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Join Our Team</h1>
                <p className={styles.heroSubtitle}>
                    Help us transform the air passenger rights industry. We are always looking for talented individuals.
                </p>
            </section>

            <div className={styles.container}>
                {jobs.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h3>No open positions at the moment</h3>
                        <p>Please check back later or send us a spontaneous application.</p>
                    </div>
                ) : (
                    <div className={styles.jobList}>
                        {jobs.map((job) => (
                            <div key={job.id} className={styles.jobCard}>
                                <div className={styles.jobInfo}>
                                    <h3 className={styles.jobTitle}>{job.title}</h3>
                                    <div className={styles.jobMeta}>
                                        {job.department && (
                                            <span className={styles.metaItem}>🏢 {job.department}</span>
                                        )}
                                        {job.location && (
                                            <span className={styles.metaItem}>📍 {job.location}</span>
                                        )}
                                        {job.type && (
                                            <span className={styles.metaItem}>⏱️ {job.type}</span>
                                        )}
                                    </div>
                                    <p className={styles.jobDescription}>{job.description}</p>
                                </div>
                                <Link
                                    href={job.applicationUrl || `mailto:careers@flycompense.com?subject=Application for ${job.title}`}
                                    className={styles.applyBtn}
                                >
                                    Apply Now
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
