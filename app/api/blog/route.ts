import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET all blog posts
export async function GET() {
    try {
        const posts = await db
            .select()
            .from(blogPosts)
            .orderBy(desc(blogPosts.createdAt));
        return NextResponse.json(posts);
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

        if (!slug || !title || !content) {
            return NextResponse.json(
                { error: 'Slug, title, and content are required' },
                { status: 400 }
            );
        }

        const newPost = await db
            .insert(blogPosts)
            .values({
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
