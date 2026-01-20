import { db } from '@/lib/db';
import { claimComments } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET comments for a claim
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const claimId = parseInt(id);

        if (isNaN(claimId)) {
            return NextResponse.json({ error: 'Invalid claim ID' }, { status: 400 });
        }

        // Check if request is from admin (for internal comments)
        const isAdmin = request.headers.get('x-admin-request') === 'true';

        let comments;
        if (isAdmin) {
            // Admin can see all comments
            comments = await db
                .select()
                .from(claimComments)
                .where(eq(claimComments.claimId, claimId))
                .orderBy(desc(claimComments.createdAt));
        } else {
            // Users can only see non-internal comments
            comments = await db
                .select()
                .from(claimComments)
                .where(eq(claimComments.claimId, claimId))
                .orderBy(desc(claimComments.createdAt));

            // Filter out internal comments for non-admin users
            comments = comments.filter(c => !c.isInternal);
        }

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
    }
}

// POST - Add a new comment (admin only)
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const claimId = parseInt(id);

        if (isNaN(claimId)) {
            return NextResponse.json({ error: 'Invalid claim ID' }, { status: 400 });
        }

        const body = await request.json();
        const { content, adminName = 'Admin', isInternal = false } = body;

        if (!content || content.trim() === '') {
            return NextResponse.json({ error: 'Comment content is required' }, { status: 400 });
        }

        const newComment = await db
            .insert(claimComments)
            .values({
                claimId,
                adminName,
                content: content.trim(),
                isInternal,
            })
            .returning();

        return NextResponse.json(newComment[0], { status: 201 });
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
    }
}
