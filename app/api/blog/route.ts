import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Cache for 5 minutes - blog posts change infrequently
export const revalidate = 300;

// GET all blog posts
export async function GET() {
    try {
        const posts = await db
            .select()
            .from(blogPosts)
            .orderBy(desc(blogPosts.createdAt));

        // Add cache headers
        return NextResponse.json(
            posts,
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}

// POST - Create new blog post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            slug,
            title,
            titleFr,
            excerpt,
            excerptFr,
            content,
            contentFr,
            featuredImage,
            category,
            tags,
            author,
            authorImage,
            readTime,
            isPublished,
            isFeatured,
        } = body;

        // Auto-translation logic
        const { translateContent } = await import('@/lib/ai');

        let finalTitle = title;
        let finalTitleFr = titleFr;
        let finalContent = content;
        let finalContentFr = contentFr;
        let finalExcerpt = excerpt;
        let finalExcerptFr = excerptFr;

        // English to French
        if (title && !titleFr) {
            finalTitleFr = await translateContent(title, 'fr');
        }
        if (content && !contentFr) {
            finalContentFr = await translateContent(content, 'fr');
        }
        if (excerpt && !excerptFr) {
            finalExcerptFr = await translateContent(excerpt, 'fr');
        }

        // French to English (if user entered only French)
        if (!title && titleFr) {
            finalTitle = await translateContent(titleFr, 'en');
        }
        if (!content && contentFr) {
            finalContent = await translateContent(contentFr, 'en');
        }
        if (!excerpt && excerptFr) {
            finalExcerpt = await translateContent(excerptFr, 'en');
        }

        if ((!finalTitle && !finalTitleFr) || (!finalContent && !finalContentFr)) {
            return NextResponse.json(
                { error: 'Title and content are required in at least one language' },
                { status: 400 }
            );
        }

        const newPost = await db
            .insert(blogPosts)
            .values({
                slug,
                title: finalTitle,
                titleFr: finalTitleFr,
                excerpt: finalExcerpt,
                excerptFr: finalExcerptFr,
                content: finalContent,
                contentFr: finalContentFr,
                featuredImage,
                category,
                tags,
                author,
                authorImage,
                readTime,
                isPublished: isPublished || false,
                isFeatured: isFeatured || false,
                publishedAt: isPublished ? new Date() : null,
            })
            .returning();

        return NextResponse.json(newPost[0], { status: 201 });
    } catch (error: any) {
        console.error('Error creating blog post:', error);
        if (error.code === '23505') {
            return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
    }
}
