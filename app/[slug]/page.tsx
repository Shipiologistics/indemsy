import { db } from '@/lib/db';
import { pageContent } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const page = await db
        .select()
        .from(pageContent)
        .where(eq(pageContent.pageSlug, slug))
        .limit(1);

    if (page.length === 0) {
        return { title: 'Page Not Found - FlyCompense' };
    }

    return {
        title: `${page[0].title} - FlyCompense`,
        description: page[0].metaDescription || `Learn more about ${page[0].title} at FlyCompense.`,
    };
}

export default async function GenericPage({ params }: PageProps) {
    const { slug } = await params;

    // Fetch page content
    const pageResult = await db
        .select()
        .from(pageContent)
        .where(eq(pageContent.pageSlug, slug))
        .limit(1);

    // If page doesn't exist in DB, show a "Coming Soon" or empty state
    // instead of 404, as per user request to have routes even if no content.
    // However, for SEO, if it's truly not there, 404 is better, but user asked for routes to exist.
    // We will simulate a "Page Under Construction" if not found in DB but is one of expected routes.
    // But since we are using [slug], we don't know if it's expected or random gibberish.
    // So we'll trigger 404 if not in DB.
    // BUT the user said "make all the pages in the footer just routes... even if there is no content yet".
    // This implies I should handle specific known slugs even if not in DB?
    // No, cleaner is to just show an Empty State if not found, OR simpler: return a generic template saying "Content Coming Soon".

    if (pageResult.length === 0) {
        // List of 'valid' footer slugs to allow "Coming Soon" page instead of 404
        const validSlugs = [
            'about-us', 'planting-trees', 'affiliate-program', 'employee-benefit',
            'become-a-partner', 'for-airlines', 'mobile-app', 'book-trip',
            'referral', 'score', 'fees', 'legal-partners', 'careers', 'press', 'our-experts',
            'terms'
        ];

        // If it's a known slug, show "Coming Soon". Else 404.
        // Note: careers, press, our-experts will have their own pages, so they might not hit this if I create specific files.
        // If I create specific files, they take precedence.

        if (validSlugs.includes(slug)) {
            return (
                <div className={styles.page}>
                    <div className={styles.wrapper}>
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>🚧</span>
                            <h1 className={styles.emptyTitle}>Page Under Construction</h1>
                            <p className={styles.emptyText}>
                                We are currently working on this page. Please check back later for updates.
                            </p>
                            <Link href="/" className={styles.homeBtn}>
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }

        return notFound();
    }

    const page = pageResult[0];

    return (
        <div className={styles.mainContainer}>
            {/* Hero */}
            <section className={styles.heroSection} style={
                page.heroImage ? {
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)), url(${page.heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                } : {}
            }>
                <div className={`${styles.blob} ${styles.blob1}`}></div>
                <div className={`${styles.blob} ${styles.blob2}`}></div>

                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{page.title}</h1>
                    {page.metaDescription && (
                        <p className={styles.heroSubtitle}>{page.metaDescription}</p>
                    )}
                </div>
            </section>

            {/* Content */}
            <div className={styles.sectionContainer}>
                <div className={styles.contentCard}>
                    <main
                        className={styles.htmlContent}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </div>
        </div>
    );
}
