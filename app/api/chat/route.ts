import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql } from 'drizzle-orm';
import { HfInference } from '@huggingface/inference';

// Setup HuggingFace for Embeddings
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export const maxDuration = 30;

async function getContext(query: string): Promise<string> {
    try {
        const embeddingResponse = await hf.featureExtraction({
            model: 'sentence-transformers/all-MiniLM-L6-v2',
            inputs: query.replace(/\n/g, ' '),
        });

        let embedding: number[];
        if (Array.isArray(embeddingResponse) && Array.isArray(embeddingResponse[0])) {
            embedding = embeddingResponse[0] as number[];
        } else {
            embedding = embeddingResponse as number[];
        }

        const embeddingString = `[${embedding.join(',')}]`;

        const similarChunks = await db.execute(sql`
            SELECT content 
            FROM knowledge_base 
            ORDER BY embedding <-> ${embeddingString}::vector 
            LIMIT 5
        `);

        return similarChunks.rows.map((row: any) => row.content).join('\n\n');
    } catch (error) {
        console.error('Error getting context:', error);
        return '';
    }
}

// Helper to extract plain text from message content
function extractContent(content: any): string {
    if (typeof content === 'string') {
        return content;
    }
    if (Array.isArray(content)) {
        return content.map((part: any) => {
            if (typeof part === 'string') return part;
            if (part.text) return part.text;
            if (part.content) return part.content;
            return '';
        }).join('');
    }
    if (content && typeof content === 'object') {
        if (content.text) return content.text;
        if (content.content) return content.content;
    }
    return String(content || '');
}

export async function POST(req: Request) {
    try {
        const { messages, language, checkoutState } = await req.json();

        // Get the last user message for context retrieval
        const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop();
        const lastUserContent = lastUserMessage ? extractContent(lastUserMessage.content) : '';
        const context = lastUserContent ? await getContext(lastUserContent) : '';

        const systemPrompt = `You are FlyCompense AI Assistant, a helpful assistant for the FlyCompense website that helps users with flight compensation claims.
User Language: ${language === 'fr' ? 'French' : 'English'}

Context from website:
${context}

User Claims State:
${JSON.stringify(checkoutState || {})}

Instructions:
- Answer based on the Context provided.
- If user asks for a quiz, provide a multiple-choice question about air passenger rights.
- Be concise and professional.
- Respond ONLY in ${language === 'fr' ? 'French' : 'English'}.`;

        // Format messages for Groq - simple format only
        const formattedMessages = [
            { role: 'system', content: systemPrompt },
            ...messages
                .filter((m: any) => m.role === 'user' || m.role === 'assistant')
                .map((m: any) => ({
                    role: m.role,
                    content: extractContent(m.content),
                }))
        ];

        console.log('Sending to Groq:', {
            messageCount: formattedMessages.length,
        });

        // Call Groq API directly
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: formattedMessages,
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!groqResponse.ok) {
            const errorData = await groqResponse.json();
            console.error('Groq API Error:', errorData);
            throw new Error(errorData.error?.message || 'Groq API failed');
        }

        const data = await groqResponse.json();
        const assistantContent = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

        console.log('Groq response received:', assistantContent.substring(0, 100));

        return new Response(JSON.stringify({
            role: 'assistant',
            content: assistantContent
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error: any) {
        console.error('Chat API Error:', error?.message || error);

        return new Response(JSON.stringify({
            error: 'Chat service temporarily unavailable',
            details: error?.message || 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
