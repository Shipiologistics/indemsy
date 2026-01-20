import { db } from '@/lib/db';
import { jobPostings } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET single job
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const jobId = parseInt(id);

        if (isNaN(jobId)) {
            return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
        }

        const job = await db.select().from(jobPostings).where(eq(jobPostings.id, jobId));

        if (job.length === 0) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(job[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
    }
}

// PATCH - Update job
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const jobId = parseInt(id);

        if (isNaN(jobId)) {
            return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
        }

        const body = await request.json();
        body.updatedAt = new Date();

        const updatedJob = await db
            .update(jobPostings)
            .set(body)
            .where(eq(jobPostings.id, jobId))
            .returning();

        if (updatedJob.length === 0) {
            return NextResponse.json({ error: 'Job not found' }, { status: 404 });
        }

        return NextResponse.json(updatedJob[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
    }
}

// DELETE job
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const jobId = parseInt(id);

        if (isNaN(jobId)) {
            return NextResponse.json({ error: 'Invalid job ID' }, { status: 400 });
        }

        await db.delete(jobPostings).where(eq(jobPostings.id, jobId));
        return NextResponse.json({ message: 'Job deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
    }
}
