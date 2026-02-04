import { db } from '@/lib/db';
import { jobPostings } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Cache for 5 minutes - job postings change infrequently
export const revalidate = 300;

// GET all job postings
export async function GET() {
    try {
        const jobs = await db
            .select()
            .from(jobPostings)
            .orderBy(desc(jobPostings.createdAt));

        // Add cache headers
        return NextResponse.json(
            jobs,
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
                },
            }
        );
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
