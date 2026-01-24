import { db } from '@/lib/db';
import { pressReleases } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Press & Media - FlyCompense',
    description: 'Latest news, press releases, and media coverage about FlyCompense.',
};

export default async function PressPage() {
    const releases = await db
        .select()
        .from(pressReleases)
        .where(eq(pressReleases.isActive, true))
        .orderBy(desc(pressReleases.publishedDate));

    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <h1 className={styles.heroTitle}>Press & Media</h1>
                <p className={styles.heroSubtitle}>
                    Latest updates, announcements, and media coverage about our mission.
                </p>
            </section>

            <div className={styles.container}>
                {releases.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h3>No press releases yet</h3>
                        <p>Check back later for updates.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {releases.map((release) => (
                            <div key={release.id} className={styles.pressCard}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.source}>{release.source || 'Press Release'}</span>
                                    <span className={styles.date}>
                                        {release.publishedDate
                                            ? new Date(release.publishedDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })
                                            : ''}
                                    </span>
                                </div>
                                <h3 className={styles.title}>{release.title}</h3>
                                <p className={styles.excerpt}>{release.excerpt}</p>
                                {release.sourceUrl && (
                                    <a href={release.sourceUrl} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
                                        Read full article →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
