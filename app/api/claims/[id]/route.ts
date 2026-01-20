import { db } from '@/lib/db';
import { claims } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET single claim
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

        const claim = await db.select().from(claims).where(eq(claims.id, claimId));

        if (claim.length === 0) {
            return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
        }

        return NextResponse.json(claim[0]);
    } catch (error) {
        console.error('Error fetching claim:', error);
        return NextResponse.json({ error: 'Failed to fetch claim' }, { status: 500 });
    }
}

// UPDATE claim (status, etc.)
export async function PATCH(
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
        const { status } = body;

        if (!status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 });
        }

        // Validate status
        const validStatuses = ['submitted', 'processing', 'approved', 'rejected', 'pending_documents', 'closed'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
        }

        const updatedClaim = await db
            .update(claims)
            .set({
                status,
                updatedAt: new Date()
            })
            .where(eq(claims.id, claimId))
            .returning();

        if (updatedClaim.length === 0) {
            return NextResponse.json({ error: 'Claim not found' }, { status: 404 });
        }

        return NextResponse.json(updatedClaim[0]);
    } catch (error) {
        console.error('Error updating claim:', error);
        return NextResponse.json({ error: 'Failed to update claim' }, { status: 500 });
    }
}
