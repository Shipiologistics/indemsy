import { db } from '@/lib/db';
import { pressReleases } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET single press release
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const releaseId = parseInt(id);

        if (isNaN(releaseId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const release = await db.select().from(pressReleases).where(eq(pressReleases.id, releaseId));

        if (release.length === 0) {
            return NextResponse.json({ error: 'Press release not found' }, { status: 404 });
        }

        return NextResponse.json(release[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch press release' }, { status: 500 });
    }
}

// PATCH - Update press release
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const releaseId = parseInt(id);

        if (isNaN(releaseId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const body = await request.json();

        const updatedRelease = await db
            .update(pressReleases)
            .set(body)
            .where(eq(pressReleases.id, releaseId))
            .returning();

        if (updatedRelease.length === 0) {
            return NextResponse.json({ error: 'Press release not found' }, { status: 404 });
        }

        return NextResponse.json(updatedRelease[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update press release' }, { status: 500 });
    }
}

// DELETE press release
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const releaseId = parseInt(id);

        if (isNaN(releaseId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        await db.delete(pressReleases).where(eq(pressReleases.id, releaseId));
        return NextResponse.json({ message: 'Press release deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete press release' }, { status: 500 });
    }
}
