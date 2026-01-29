'use server';

import { sendEmail } from '@/lib/mail';

export async function submitContactForm(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    if (!email || !message) {
        return { success: false, error: 'Email and message are required' };
    }

    // 1. Send notification to Admin (optional but good practice)
    // await sendEmail({ ... }); 

    // 2. Send confirmation to User
    await sendEmail({
        to: email,
        subject: `We received your message: ${subject}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0E1F3B;">Thank you for contacting FlyCompense</h2>
                <p>Hi ${name || 'there'},</p>
                <p>We verify that we have received your message regarding "<strong>${subject}</strong>".</p>
                <p>Our team typically responds within 24 hours.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="color: #666; font-size: 14px;">Your message:</p>
                <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #2563EB; font-style: italic;">
                    ${message.replace(/\n/g, '<br/>')}
                </blockquote>
                <p style="margin-top: 30px; font-size: 12px; color: #888;">
                    &copy; ${new Date().getFullYear()} FlyCompense. All rights reserved.
                </p>
            </div>
        `
    });

    return { success: true };
}
