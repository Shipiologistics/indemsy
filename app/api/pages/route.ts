import { db } from '@/lib/db';
import { pageContent } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET all page content
export async function GET() {
    try {
        const pages = await db
            .select()
            .from(pageContent)
            .orderBy(desc(pageContent.createdAt));
        return NextResponse.json(pages);
    } catch (error) {
        console.error('Error fetching pages:', error);
        return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
    }
}

// POST - Create new page content
export async function POST(request: NextRequest) {
    try {
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

        // Auto-translation logic
        const { translateContent } = await import('@/lib/ai');

        let finalTitle = title;
        let finalTitleFr = titleFr;
        let finalContent = content;
        let finalContentFr = contentFr;
        let finalMeta = metaDescription;
        let finalMetaFr = metaDescriptionFr;

        // English to French
        if (title && !titleFr) finalTitleFr = await translateContent(title, 'fr');
        if (content && !contentFr) finalContentFr = await translateContent(content, 'fr');
        if (metaDescription && !metaDescriptionFr) finalMetaFr = await translateContent(metaDescription, 'fr');

        // French to English
        if (!title && titleFr) finalTitle = await translateContent(titleFr, 'en');
        if (!content && contentFr) finalContent = await translateContent(contentFr, 'en');
        if (!metaDescription && metaDescriptionFr) finalMeta = await translateContent(metaDescriptionFr, 'en');

        if (!pageSlug || (!finalTitle && !finalTitleFr) || (!finalContent && !finalContentFr)) {
            return NextResponse.json(
                { error: 'Page slug, title, and content are required in at least one language' },
                { status: 400 }
            );
        }

        const newPage = await db
            .insert(pageContent)
            .values({
                pageSlug,
                title: finalTitle,
                titleFr: finalTitleFr,
                content: finalContent,
                contentFr: finalContentFr,
                metaDescription: finalMeta,
                metaDescriptionFr: finalMetaFr,
                heroImage,
                isPublished: isPublished ?? true,
            })
            .returning();

        return NextResponse.json(newPage[0], { status: 201 });
    } catch (error: any) {
        console.error('Error creating page:', error);
        if (error.code === '23505') {
            return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
    }
}
