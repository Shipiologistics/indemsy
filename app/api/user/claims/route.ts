import { db } from '@/lib/db';
import { claims } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// Cache for 30 seconds - user claims can change when they submit new ones
export const revalidate = 30;

// GET claims for a user by email
export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const userClaims = await db
            .select()
            .from(claims)
            .where(eq(claims.email, email))
            .orderBy(desc(claims.createdAt));

        // Add cache headers for CDN caching
        return NextResponse.json(
            userClaims,
            {
                headers: {
                    'Cache-Control': 'private, s-maxage=30, stale-while-revalidate=60',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching user claims:', error);
        return NextResponse.json({ error: 'Failed to fetch claims' }, { status: 500 });
    }
}
