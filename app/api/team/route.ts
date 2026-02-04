import { db } from '@/lib/db';
import { teamMembers } from '@/lib/schema';
import { eq, asc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Cache for 10 minutes - team members change infrequently
export const revalidate = 600;

// GET all team members
export async function GET() {
    try {
        const members = await db
            .select()
            .from(teamMembers)
            .orderBy(asc(teamMembers.displayOrder));

        // Add cache headers
        return NextResponse.json(
            members,
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching team members:', error);
        return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
    }
}

// POST - Create new team member
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, role, roleFr, bio, bioFr, photo, email, linkedin, twitter, displayOrder, isActive } = body;

        if (!name || !role) {
            return NextResponse.json({ error: 'Name and role are required' }, { status: 400 });
        }

        const newMember = await db
            .insert(teamMembers)
            .values({
                name,
                role,
                roleFr,
                bio,
                bioFr,
                photo,
                email,
                linkedin,
                twitter,
                displayOrder: displayOrder || 0,
                isActive: isActive ?? true,
            })
            .returning();

        return NextResponse.json(newMember[0], { status: 201 });
    } catch (error) {
        console.error('Error creating team member:', error);
        return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
}
