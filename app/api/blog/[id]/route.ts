import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET single blog post
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const postId = parseInt(id);

        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const post = await db.select().from(blogPosts).where(eq(blogPosts.id, postId));

        if (post.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post[0]);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json({ error: 'Failed to fetch blog post' }, { status: 500 });
    }
}

// PATCH - Update blog post
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const postId = parseInt(id);

        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

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

        // Get current post to check publish status change
        const currentPost = await db.select().from(blogPosts).where(eq(blogPosts.id, postId));
        const wasPublished = currentPost[0]?.isPublished;

        const updateData: any = {
            updatedAt: new Date(),
        };

        if (slug !== undefined) updateData.slug = slug;
        if (title !== undefined) updateData.title = title;
        if (titleFr !== undefined) updateData.titleFr = titleFr;
        if (excerpt !== undefined) updateData.excerpt = excerpt;
        if (excerptFr !== undefined) updateData.excerptFr = excerptFr;
        if (content !== undefined) updateData.content = content;
        if (contentFr !== undefined) updateData.contentFr = contentFr;
        if (featuredImage !== undefined) updateData.featuredImage = featuredImage;
        if (category !== undefined) updateData.category = category;
        if (tags !== undefined) updateData.tags = tags;
        if (author !== undefined) updateData.author = author;
        if (authorImage !== undefined) updateData.authorImage = authorImage;
        if (readTime !== undefined) updateData.readTime = readTime;
        if (isPublished !== undefined) {
            updateData.isPublished = isPublished;
            // Set publishedAt when first published
            if (isPublished && !wasPublished) {
                updateData.publishedAt = new Date();
            }
        }
        if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

        const updatedPost = await db
            .update(blogPosts)
            .set(updateData)
            .where(eq(blogPosts.id, postId))
            .returning();

        if (updatedPost.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPost[0]);
    } catch (error: any) {
        console.error('Error updating blog post:', error);
        if (error.code === '23505') {
            return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 });
    }
}

// DELETE blog post
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const postId = parseInt(id);

        if (isNaN(postId)) {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const deletedPost = await db
            .delete(blogPosts)
            .where(eq(blogPosts.id, postId))
            .returning();

        if (deletedPost.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 });
    }
}
