import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq, ne, and, desc } from 'drizzle-orm';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const post = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);

    if (post.length === 0) {
        return { title: 'Blog Post Not Found - FlyCompense' };
    }

    return {
        title: `${post[0].title} - FlyCompense Blog`,
        description: post[0].excerpt || 'Read this article on the FlyCompense blog.',
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const postResult = await db
        .select()
        .from(blogPosts)
        .where(and(eq(blogPosts.slug, slug), eq(blogPosts.isPublished, true)))
        .limit(1);

    if (postResult.length === 0) {
        return (
            <div className={styles.blogPost}>
                <div className={styles.notFound}>
                    <div className={styles.notFoundIcon}>📰</div>
                    <h1 className={styles.notFoundTitle}>Post Not Found</h1>
                    <p className={styles.notFoundText}>
                        The blog post you're looking for doesn't exist or has been removed.
                    </p>
                    <Link href="/blog" className={styles.notFoundBtn}>
                        Browse All Posts
                    </Link>
                </div>
            </div>
        );
    }

    const post = postResult[0];

    // Get related posts
    const relatedPosts = await db
        .select()
        .from(blogPosts)
        .where(and(
            eq(blogPosts.isPublished, true),
            ne(blogPosts.id, post.id)
        ))
        .orderBy(desc(blogPosts.publishedAt))
        .limit(3);

    return (
        <div className={styles.blogPost}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <Link href="/blog" className={styles.backLink}>
                        ← Back to Blog
                    </Link>

                    <div className={styles.postMeta}>
                        {post.category && (
                            <span className={styles.category}>{post.category}</span>
                        )}
                        <span className={styles.date}>
                            {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'Recently Published'
                            }
                        </span>
                        {post.readTime && (
                            <span className={styles.readTime}>📖 {post.readTime} min read</span>
                        )}
                    </div>

                    <h1 className={styles.title}>{post.title}</h1>

                    {post.excerpt && (
                        <p className={styles.excerpt}>{post.excerpt}</p>
                    )}

                    <div className={styles.authorInfo}>
                        <div className={styles.authorAvatar}>
                            {post.authorImage ? (
                                <img src={post.authorImage} alt={post.author || 'Author'} />
                            ) : (
                                (post.author || 'IT')[0]
                            )}
                        </div>
                        <div>
                            <p className={styles.authorName}>{post.author || 'FlyCompense Team'}</p>
                            <p className={styles.authorRole}>Content Writer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {post.featuredImage && (
                <div className={styles.featuredImage}>
                    <img src={post.featuredImage} alt={post.title} />
                </div>
            )}

            {/* Content */}
            <article className={styles.content}>
                <div
                    className={styles.articleContent}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className={styles.tags}>
                        {post.tags.map((tag, idx) => (
                            <span key={idx} className={styles.tag}>#{tag}</span>
                        ))}
                    </div>
                )}

                {/* Share */}
                <div className={styles.share}>
                    <span className={styles.shareLabel}>Share this article:</span>
                    <div className={styles.shareButtons}>
                        <button className={styles.shareBtn} title="Share on Twitter">🐦</button>
                        <button className={styles.shareBtn} title="Share on LinkedIn">💼</button>
                        <button className={styles.shareBtn} title="Share on Facebook">📘</button>
                        <button className={styles.shareBtn} title="Copy link">🔗</button>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section className={styles.relatedSection}>
                    <h2 className={styles.relatedTitle}>Related Articles</h2>
                    <div className={styles.relatedGrid}>
                        {relatedPosts.map((relatedPost) => (
                            <Link
                                href={`/blog/${relatedPost.slug}`}
                                key={relatedPost.id}
                                style={{
                                    background: 'white',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                                    textDecoration: 'none',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                            >
                                <div style={{
                                    height: '180px',
                                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '48px',
                                }}>
                                    {relatedPost.featuredImage ? (
                                        <img
                                            src={relatedPost.featuredImage}
                                            alt={relatedPost.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    ) : '✈️'}
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{
                                        fontSize: '18px',
                                        fontWeight: '600',
                                        color: '#0f172a',
                                        margin: '0 0 8px',
                                        lineHeight: 1.4,
                                    }}>
                                        {relatedPost.title}
                                    </h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#64748b',
                                        margin: 0,
                                        lineHeight: 1.5,
                                    }}>
                                        {relatedPost.excerpt?.substring(0, 100) || 'Read more...'}
                                        {(relatedPost.excerpt?.length || 0) > 100 ? '...' : ''}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
