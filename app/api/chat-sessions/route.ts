import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { desc } from 'drizzle-orm';

// GET - Fetch all chat sessions (admin only - cached briefly)
export const revalidate = 60;

export async function GET() {
    try {
        const sessions = await db
            .select()
            .from(schema.chatSessions)
            .orderBy(desc(schema.chatSessions.createdAt));

        return new Response(JSON.stringify(sessions), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'private, s-maxage=60, stale-while-revalidate=300',
            },
        });
    } catch (error: any) {
        console.error('Error fetching chat sessions:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch sessions' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// POST - Create a new chat session
export async function POST(req: Request) {
    try {
        const { userId, language, messages } = await req.json();

        // Create the session
        const [session] = await db
            .insert(schema.chatSessions)
            .values({
                userId: userId || null,
                status: 'active',
                metadata: { language, messageCount: messages?.length || 0 },
            })
            .returning();

        // Save messages if provided
        if (messages && messages.length > 0) {
            await db.insert(schema.chatMessages).values(
                messages.map((m: any) => ({
                    sessionId: session.id,
                    role: m.role,
                    content: m.content,
                }))
            );
        }

        return new Response(JSON.stringify(session), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error creating chat session:', error);
        return new Response(JSON.stringify({ error: 'Failed to create session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
