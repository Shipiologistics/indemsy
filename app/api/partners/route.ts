import { db } from '@/lib/db';
import { partners } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Cache for 5 minutes - partner data changes infrequently
export const revalidate = 300;

// GET all partners
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        let query = db.select().from(partners).orderBy(asc(partners.displayOrder));

        // Filter by type if specified
        const allPartners = await query;
        const filteredPartners = type
            ? allPartners.filter(p => p.type === type)
            : allPartners;

        // Add cache headers
        return NextResponse.json(
            filteredPartners,
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching partners:', error);
        return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
    }
}

// POST - Create new partner
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, type, logo, description, descriptionFr, websiteUrl, contactEmail, displayOrder, isActive } = body;

        if (!name || !type) {
            return NextResponse.json({ error: 'Name and type are required' }, { status: 400 });
        }

        const newPartner = await db
            .insert(partners)
            .values({
                name, type, logo, description, descriptionFr, websiteUrl, contactEmail,
                displayOrder: displayOrder || 0,
                isActive: isActive ?? true,
            })
            .returning();

        return NextResponse.json(newPartner[0], { status: 201 });
    } catch (error) {
        console.error('Error creating partner:', error);
        return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
    }
}
