import { db } from '@/lib/db';
import { pageContent } from '@/lib/schema';
import { eq, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET single page by ID or slug
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Check if id is a number or slug
        const pageId = parseInt(id);
        let page;

        if (isNaN(pageId)) {
            // It's a slug
            page = await db.select().from(pageContent).where(eq(pageContent.pageSlug, id));
        } else {
            // It's an ID
            page = await db.select().from(pageContent).where(eq(pageContent.id, pageId));
        }

        if (page.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page[0]);
    } catch (error) {
        console.error('Error fetching page:', error);
        return NextResponse.json({ error: 'Failed to fetch page' }, { status: 500 });
    }
}

// PATCH - Update page content
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pageId = parseInt(id);

        if (isNaN(pageId)) {
            return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
        }

        const body = await request.json();
        const {
            pageSlug,
            title,
            titleFr,
            content,
            contentFr,
            metaDescription,
            metaDescriptionFr,
            heroImage,
            isPublished,
        } = body;

        const updateData: any = {
            updatedAt: new Date(),
        };

        if (pageSlug !== undefined) updateData.pageSlug = pageSlug;
        if (title !== undefined) updateData.title = title;
        if (titleFr !== undefined) updateData.titleFr = titleFr;
        if (content !== undefined) updateData.content = content;
        if (contentFr !== undefined) updateData.contentFr = contentFr;
        if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
        if (metaDescriptionFr !== undefined) updateData.metaDescriptionFr = metaDescriptionFr;
        if (heroImage !== undefined) updateData.heroImage = heroImage;
        if (isPublished !== undefined) updateData.isPublished = isPublished;

        const updatedPage = await db
            .update(pageContent)
            .set(updateData)
            .where(eq(pageContent.id, pageId))
            .returning();

        if (updatedPage.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPage[0]);
    } catch (error: any) {
        console.error('Error updating page:', error);
        if (error.code === '23505') {
            return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to update page' }, { status: 500 });
    }
}

// DELETE page
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const pageId = parseInt(id);

        if (isNaN(pageId)) {
            return NextResponse.json({ error: 'Invalid page ID' }, { status: 400 });
        }

        const deletedPage = await db
            .delete(pageContent)
            .where(eq(pageContent.id, pageId))
            .returning();

        if (deletedPage.length === 0) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Page deleted successfully' });
    } catch (error) {
        console.error('Error deleting page:', error);
        return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
    }
}
