import { db } from '@/lib/db';
import { teamMembers } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET single team member
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const memberId = parseInt(id);

        if (isNaN(memberId)) {
            return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 });
        }

        const member = await db.select().from(teamMembers).where(eq(teamMembers.id, memberId));

        if (member.length === 0) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json(member[0]);
    } catch (error) {
        console.error('Error fetching team member:', error);
        return NextResponse.json({ error: 'Failed to fetch team member' }, { status: 500 });
    }
}

// PATCH - Update team member
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const memberId = parseInt(id);

        if (isNaN(memberId)) {
            return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 });
        }

        const body = await request.json();
        const updateData: any = {};

        if (body.name !== undefined) updateData.name = body.name;
        if (body.role !== undefined) updateData.role = body.role;
        if (body.roleFr !== undefined) updateData.roleFr = body.roleFr;
        if (body.bio !== undefined) updateData.bio = body.bio;
        if (body.bioFr !== undefined) updateData.bioFr = body.bioFr;
        if (body.photo !== undefined) updateData.photo = body.photo;
        if (body.email !== undefined) updateData.email = body.email;
        if (body.linkedin !== undefined) updateData.linkedin = body.linkedin;
        if (body.twitter !== undefined) updateData.twitter = body.twitter;
        if (body.displayOrder !== undefined) updateData.displayOrder = body.displayOrder;
        if (body.isActive !== undefined) updateData.isActive = body.isActive;

        const updatedMember = await db
            .update(teamMembers)
            .set(updateData)
            .where(eq(teamMembers.id, memberId))
            .returning();

        if (updatedMember.length === 0) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json(updatedMember[0]);
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
    }
}

// DELETE team member
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const memberId = parseInt(id);

        if (isNaN(memberId)) {
            return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 });
        }

        const deletedMember = await db
            .delete(teamMembers)
            .where(eq(teamMembers.id, memberId))
            .returning();

        if (deletedMember.length === 0) {
            return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Team member deleted successfully' });
    } catch (error) {
        console.error('Error deleting team member:', error);
        return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
    }
}
