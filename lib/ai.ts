import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function translateContent(text: string, targetLang: 'fr' | 'en'): Promise<string> {
    if (!text) return '';

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a professional translator for a flight compensation company. Translate the user input to ${targetLang === 'fr' ? 'French' : 'English'}. Preserve all HTML tags, Markdown formatting, and links exactly as they are. Do not add any conversational text.`
                },
                {
                    role: "user",
                    content: text
                }
            ],
            temperature: 0.3,
        });

        return response.choices[0].message.content || '';
    } catch (error) {
        console.error("Translation error:", error);
        return ''; // Return empty to allow fallback or manual entry later
    }
}
