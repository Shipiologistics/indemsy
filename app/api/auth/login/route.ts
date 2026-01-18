import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        // Verify hardcoded credentials
        // Note: In a real app, this should be in an env var or DB, but user asked for these checks specifically
        if (email === 'admin@indemsy.lu' && password === 'joel@123') {
            const cookieStore = await cookies();

            // Set simple auth cookie
            cookieStore.set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24, // 1 day
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { error: 'Invalid email or password' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
