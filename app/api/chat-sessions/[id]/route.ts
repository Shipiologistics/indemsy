import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

// GET - Fetch messages for a specific session
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const sessionId = parseInt(id, 10);

        if (isNaN(sessionId)) {
            return new Response(JSON.stringify({ error: 'Invalid session ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Get session info
        const [session] = await db
            .select()
            .from(schema.chatSessions)
            .where(eq(schema.chatSessions.id, sessionId));

        if (!session) {
            return new Response(JSON.stringify({ error: 'Session not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Get messages
        const messages = await db
            .select()
            .from(schema.chatMessages)
            .where(eq(schema.chatMessages.sessionId, sessionId))
            .orderBy(schema.chatMessages.createdAt);

        return new Response(JSON.stringify({ session, messages }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error fetching session:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

// PUT - Add message to existing session
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const sessionId = parseInt(id, 10);
        const { messages } = await req.json();

        if (isNaN(sessionId)) {
            return new Response(JSON.stringify({ error: 'Invalid session ID' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Add messages
        if (messages && messages.length > 0) {
            await db.insert(schema.chatMessages).values(
                messages.map((m: any) => ({
                    sessionId: sessionId,
                    role: m.role,
                    content: m.content,
                }))
            );
        }

        // Update session timestamp and metadata
        await db
            .update(schema.chatSessions)
            .set({
                updatedAt: new Date(),
                metadata: { lastActivity: new Date().toISOString() }
            })
            .where(eq(schema.chatSessions.id, sessionId));

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Error updating session:', error);
        return new Response(JSON.stringify({ error: 'Failed to update session' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
