import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'Blog - Indemsy | Flight Compensation Insights & Travel Tips',
    description: 'Stay informed with the latest news on flight compensation, passenger rights, travel tips, and industry insights from the experts at Indemsy.',
};

export default async function BlogPage() {
    // Fetch published blog posts
    const posts = await db
        .select()
        .from(blogPosts)
        .where(eq(blogPosts.isPublished, true))
        .orderBy(desc(blogPosts.publishedAt));

    const featuredPost = posts.find(post => post.isFeatured) || posts[0];
    const regularPosts = posts.filter(post => post.id !== featuredPost?.id);

    const categories = ['All', 'Passenger Rights', 'Travel Tips', 'News', 'Guides', 'Compensation'];

    return (
        <div className={styles.blogPage}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <span className={styles.heroLabel}>✨ Indemsy Blog</span>
                    <h1 className={styles.heroTitle}>Insights & Travel Tips</h1>
                    <p className={styles.heroSubtitle}>
                        Stay informed about your passenger rights, compensation claims, and expert travel advice from our team.
                    </p>

                    <div className={styles.categories}>
                        {categories.map((category, idx) => (
                            <button
                                key={category}
                                className={`${styles.categoryBtn} ${idx === 0 ? styles.active : ''}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className={styles.blogGrid}>
                <div className={styles.gridContainer}>
                    {posts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>📝</div>
                            <h3 className={styles.emptyTitle}>No blog posts yet</h3>
                            <p className={styles.emptyText}>
                                Check back soon for articles about flight compensation, passenger rights, and travel tips.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Featured Post */}
                            {featuredPost && (
                                <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredPost}>
                                    <div className={styles.featuredImage}>
                                        {featuredPost.featuredImage ? (
                                            <img src={featuredPost.featuredImage} alt={featuredPost.title} />
                                        ) : (
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '64px'
                                            }}>
                                                ✈️
                                            </div>
                                        )}
                                        <span className={styles.featuredBadge}>Featured</span>
                                    </div>
                                    <div className={styles.featuredContent}>
                                        <div className={styles.postMeta}>
                                            {featuredPost.category && (
                                                <span className={styles.postCategory}>{featuredPost.category}</span>
                                            )}
                                            <span className={styles.postDate}>
                                                {featuredPost.publishedAt
                                                    ? new Date(featuredPost.publishedAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })
                                                    : 'Recently Published'
                                                }
                                            </span>
                                            {featuredPost.readTime && (
                                                <span className={styles.postReadTime}>
                                                    📖 {featuredPost.readTime} min read
                                                </span>
                                            )}
                                        </div>
                                        <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                                        <p className={styles.featuredExcerpt}>
                                            {featuredPost.excerpt || 'Discover insights about flight compensation and your passenger rights...'}
                                        </p>
                                        <div className={styles.authorInfo}>
                                            <div className={styles.authorAvatar}>
                                                {featuredPost.authorImage ? (
                                                    <img src={featuredPost.authorImage} alt={featuredPost.author || 'Author'} />
                                                ) : (
                                                    (featuredPost.author || 'IT')[0]
                                                )}
                                            </div>
                                            <div>
                                                <p className={styles.authorName}>{featuredPost.author || 'Indemsy Team'}</p>
                                                <p className={styles.authorRole}>Content Writer</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Regular Posts */}
                            {regularPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className={styles.blogCard}>
                                    <div className={styles.cardImage}>
                                        {post.featuredImage ? (
                                            <img src={post.featuredImage} alt={post.title} />
                                        ) : (
                                            <div style={{
                                                width: '100%',
                                                height: '100%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontSize: '48px',
                                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)'
                                            }}>
                                                ✈️
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardMeta}>
                                            {post.category && (
                                                <span className={styles.postCategory}>{post.category}</span>
                                            )}
                                            {post.readTime && (
                                                <span className={styles.postReadTime}>
                                                    📖 {post.readTime} min
                                                </span>
                                            )}
                                        </div>
                                        <h3 className={styles.cardTitle}>{post.title}</h3>
                                        <p className={styles.cardExcerpt}>
                                            {post.excerpt || 'Learn more about flight compensation and passenger rights...'}
                                        </p>
                                        <div className={styles.cardFooter}>
                                            <span className={styles.postDate}>
                                                {post.publishedAt
                                                    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })
                                                    : 'New'
                                                }
                                            </span>
                                            <span className={styles.readMore}>
                                                Read more →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </>
                    )}
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className={styles.newsletter}>
                <div className={styles.newsletterCard}>
                    <div className={styles.newsletterContent}>
                        <h2 className={styles.newsletterTitle}>Stay Updated</h2>
                        <p className={styles.newsletterText}>
                            Get the latest travel tips and passenger rights news delivered to your inbox.
                        </p>
                    </div>
                    <form className={styles.newsletterForm}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className={styles.newsletterInput}
                        />
                        <button type="submit" className={styles.newsletterBtn}>
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
