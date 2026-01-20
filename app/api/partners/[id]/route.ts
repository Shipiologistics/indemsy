import { db } from '@/lib/db';
import { partners } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET single partner
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const partnerId = parseInt(id);

        if (isNaN(partnerId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const partner = await db.select().from(partners).where(eq(partners.id, partnerId));

        if (partner.length === 0) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json(partner[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch partner' }, { status: 500 });
    }
}

// PATCH - Update partner
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const partnerId = parseInt(id);

        if (isNaN(partnerId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        const body = await request.json();

        const updatedPartner = await db
            .update(partners)
            .set(body)
            .where(eq(partners.id, partnerId))
            .returning();

        if (updatedPartner.length === 0) {
            return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
        }

        return NextResponse.json(updatedPartner[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
    }
}

// DELETE partner
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const partnerId = parseInt(id);

        if (isNaN(partnerId)) {
            return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
        }

        await db.delete(partners).where(eq(partners.id, partnerId));
        return NextResponse.json({ message: 'Partner deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
    }
}
