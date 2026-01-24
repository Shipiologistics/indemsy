'use server';

import { db } from '@/lib/db';
import { socialLinks } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getSocialLinks() {
    try {
        const links = await db.select().from(socialLinks).orderBy(desc(socialLinks.displayOrder));
        return { success: true, links };
    } catch (error) {
        console.error('Failed to fetch social links:', error);
        return { success: false, error: 'Failed to fetch social links' };
    }
}

export async function addSocialLink(data: { platform: string; url: string; icon?: string; displayOrder?: number }) {
    try {
        await db.insert(socialLinks).values({
            platform: data.platform,
            url: data.url,
            icon: data.icon,
            displayOrder: data.displayOrder || 0,
            isActive: true,
        });
        revalidatePath('/admin/cms/socials');
        revalidatePath('/'); // Revalidate home/footer
        return { success: true };
    } catch (error) {
        console.error('Failed to add social link:', error);
        return { success: false, error: 'Failed to add social link' };
    }
}

export async function updateSocialLink(id: number, data: { platform?: string; url?: string; icon?: string; displayOrder?: number; isActive?: boolean }) {
    try {
        await db.update(socialLinks).set({
            ...data,
            updatedAt: new Date(),
        }).where(eq(socialLinks.id, id));
        revalidatePath('/admin/cms/socials');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to update social link:', error);
        return { success: false, error: 'Failed to update social link' };
    }
}

export async function deleteSocialLink(id: number) {
    try {
        await db.delete(socialLinks).where(eq(socialLinks.id, id));
        revalidatePath('/admin/cms/socials');
        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to delete social link:', error);
        return { success: false, error: 'Failed to delete social link' };
    }
}
