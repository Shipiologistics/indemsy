import { db } from '@/lib/db';
import { jobPostings } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// GET all job postings
export async function GET() {
    try {
        const jobs = await db
            .select()
            .from(jobPostings)
            .orderBy(desc(jobPostings.createdAt));
        return NextResponse.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return NextResponse.json({ error: 'Failed to fetch job postings' }, { status: 500 });
    }
}

// POST - Create new job posting
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            title, titleFr, department, location, type, description, descriptionFr,
            requirements, requirementsFr, benefits, benefitsFr, salaryRange, applicationUrl, isActive
        } = body;

        if (!title || !description) {
            return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
        }

        const newJob = await db
            .insert(jobPostings)
            .values({
                title, titleFr, department, location, type, description, descriptionFr,
                requirements, requirementsFr, benefits, benefitsFr, salaryRange, applicationUrl,
                isActive: isActive ?? true,
            })
            .returning();

        return NextResponse.json(newJob[0], { status: 201 });
    } catch (error) {
        console.error('Error creating job:', error);
        return NextResponse.json({ error: 'Failed to create job posting' }, { status: 500 });
    }
}
