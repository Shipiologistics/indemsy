import { db } from '@/lib/db';
import { pressReleases } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET all press releases
export async function GET() {
    try {
        const releases = await db
            .select()
            .from(pressReleases)
            .orderBy(desc(pressReleases.publishedDate));
        return NextResponse.json(releases);
    } catch (error) {
        console.error('Error fetching press releases:', error);
        return NextResponse.json({ error: 'Failed to fetch press releases' }, { status: 500 });
    }
}

// POST - Create new press release
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, titleFr, source, sourceUrl, excerpt, excerptFr, logoUrl, publishedDate, isActive } = body;

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const newRelease = await db
            .insert(pressReleases)
            .values({
                title, titleFr, source, sourceUrl, excerpt, excerptFr, logoUrl,
                publishedDate: publishedDate || null,
                isActive: isActive ?? true,
            })
            .returning();

        return NextResponse.json(newRelease[0], { status: 201 });
    } catch (error) {
        console.error('Error creating press release:', error);
        return NextResponse.json({ error: 'Failed to create press release' }, { status: 500 });
    }
}
