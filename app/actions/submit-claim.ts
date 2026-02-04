'use server';

import { db } from '@/lib/db';
import { claims } from '@/lib/schema';

export async function submitClaim(formData: any) {
    try {
        const normalizeTime = (value: any): string | null => {
            if (!value || typeof value !== 'string') return null;
            const match = value.match(/(\d{1,2}):(\d{2})/);
            if (match) {
                const hh = match[1].padStart(2, '0');
                const mm = match[2];
                return `${hh}:${mm}`;
            }
            const d = new Date(value);
            if (!Number.isNaN(d.getTime())) {
                return d.toISOString().slice(11, 16);
            }
            return value.length <= 10 ? value : value.slice(0, 10);
        };

        // Log what we're receiving for debugging
        console.log('Submitting claim with data:', JSON.stringify(formData, null, 2));

        const normalizedManualDepartureTime = normalizeTime(formData.manualDepartureTime);

        const result = await db.insert(claims).values({
            // Flight info - may be null in fast-track mode
            isDirect: formData.isDirect ?? null,
            connectionAirports: formData.connectionAirports || null,
            departureAirport: formData.departureAirport || null,
            arrivalAirport: formData.arrivalAirport || null,
            travelDate: formData.travelDate || null,
            selectedFlight: formData.selectedFlight || null,
            manualFlightNumber: formData.manualFlightNumber || null,
            manualAirline: formData.manualAirline || null,
            manualDepartureTime: normalizedManualDepartureTime,

            // Problem info
            problemType: formData.problemType || null,
            refusedReason: formData.refusedReason || null,
            delayDuration: formData.delayDuration || null,

            // Personal info
            firstName: formData.firstName || null,
            lastName: formData.lastName || null,
            email: formData.email || null,
            phone: formData.phone || null,
            acceptTerms: formData.acceptTerms ?? false,
            acceptAgreementPower: formData.acceptAgreementPower ?? false,
            acceptAgreementService: formData.acceptAgreementService ?? false,

            // Group travel
            isGroupTravel: formData.isGroupTravel ?? null,
            groupPassengers: formData.groupPassengers || null,

            // Address
            address: formData.address || null,
            city: formData.city || null,
            postalCode: formData.postalCode || null,
            country: formData.country || null,

            // Booking & Signature
            bookingNumber: formData.bookingNumber || null,
            signature: formData.signature || null,

            // Documents
            boardingPassUrl: formData.boardingPassUrl || null,
            idDocumentUrl: formData.idDocumentUrl || null,

            // Airline contact
            contactedAirline: formData.contactedAirline ?? null,
            incidentDescription: formData.incidentDescription || null,

            // Additional
            preferredLanguage: formData.preferredLanguage || null,
            ticketPurchaseSource: formData.ticketPurchaseSource || null,
            referralSource: formData.referralSource || null,
        }).returning({ id: claims.id });

        console.log('Claim submitted successfully, ID:', result[0].id);

        // Send confirmation email
        if (formData.email) {
            const preferredLanguage = (formData.preferredLanguage || '').toLowerCase();
            const isFrench = preferredLanguage.startsWith('fr');
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.flycompense.com';
            const dashboardUrl = `${siteUrl}/dashboard`;
            const logoUrl = `${siteUrl}/favicon-logo.png`;
            const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim();
            const fallbackName = isFrench ? 'Cher client' : 'Dear customer';
            const greetingName = fullName || fallbackName;

            const subject = isFrench
                ? 'Confirmation de réception de votre dossier'
                : 'Confirmation of your claim submission';

            const html = isFrench
                ? `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; color: #0E1F3B; background: #F9FBFF; border-radius: 12px;">
                        <h1 style="font-size: 22px; margin-bottom: 16px;">Bonjour ${greetingName},</h1>
                        <p style="margin: 0 0 16px;">Merci d’avoir soumis votre dossier de réclamation via FlyCompense.</p>
                        <p style="margin: 0 0 16px;">Nous vous confirmons que votre dossier a bien été déposé (réf. <strong>#${result[0].id}</strong>) et enregistré dans notre système.</p>
                        <h2 style="font-size: 18px; margin: 24px 0 8px;">🔍 Prochaine étape</h2>
                        <p style="margin: 0 0 16px;">Notre équipe va analyser votre dossier afin de vérifier son éligibilité conformément à la réglementation européenne en vigueur. Vous serez informé·e par email de l’évolution de votre demande.</p>
                        <p style="margin: 0 0 16px;">👉 Vous pouvez consulter ou compléter votre dossier à tout moment depuis votre espace personnel :</p>
                        <p style="margin: 0 0 24px;">
                            <a href="${dashboardUrl}" style="display: inline-block; background: #FF8A00; color: #FFF; padding: 12px 24px; border-radius: 6px; font-weight: 600; text-decoration: none;">Accéder à mon espace</a>
                        </p>
                        <p style="margin: 0 0 16px;">📌 Important : merci de vérifier que toutes les informations et documents transmis sont exacts et complets afin d’éviter tout retard de traitement.</p>
                        <p style="margin: 0 0 16px;">Si vous avez des questions, notre équipe reste à votre disposition : <a href="mailto:support@flycompense.com" style="color: #0284C7;">support@flycompense.com</a></p>
                        <p style="margin: 0 0 4px;">Merci de votre confiance,</p>
                        <p style="margin: 0 0 24px;">L’équipe FlyCompense ✈️</p>
                        <img src="${logoUrl}" alt="FlyCompense" style="height: 48px; display: block; margin-top: 24px;" />
                    </div>
                `
                : `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 32px; color: #0E1F3B; background: #F9FBFF; border-radius: 12px;">
                        <h1 style="font-size: 22px; margin-bottom: 16px;">Hello ${greetingName},</h1>
                        <p style="margin: 0 0 16px;">Thank you for submitting your flight compensation claim through FlyCompense.</p>
                        <p style="margin: 0 0 16px;">We confirm that your claim has been successfully submitted (Ref. <strong>#${result[0].id}</strong>) and securely registered in our system.</p>
                        <h2 style="font-size: 18px; margin: 24px 0 8px;">🔍 Next steps</h2>
                        <p style="margin: 0 0 16px;">Our team will review your claim to determine its eligibility under applicable European regulations. You will be notified by email as your case progresses.</p>
                        <p style="margin: 0 0 16px;">👉 You can view or update your claim at any time via your personal dashboard:</p>
                        <p style="margin: 0 0 24px;">
                            <a href="${dashboardUrl}" style="display: inline-block; background: #FF8A00; color: #FFF; padding: 12px 24px; border-radius: 6px; font-weight: 600; text-decoration: none;">Go to my dashboard</a>
                        </p>
                        <p style="margin: 0 0 16px;">📌 Important: please make sure that all information and documents provided are accurate and complete to ensure smooth processing.</p>
                        <p style="margin: 0 0 16px;">If you have any questions, our team is here to help: <a href="mailto:support@flycompense.com" style="color: #0284C7;">support@flycompense.com</a></p>
                        <p style="margin: 0 0 4px;">Thank you for trusting us,</p>
                        <p style="margin: 0 0 24px;">The FlyCompense Team ✈️</p>
                        <img src="${logoUrl}" alt="FlyCompense" style="height: 48px; display: block; margin-top: 24px;" />
                    </div>
                `;

            const { sendEmail } = await import('@/lib/mail');
            await sendEmail({
                to: formData.email,
                subject,
                html,
            });
        }

        return { success: true, claimId: result[0].id };
    } catch (error: any) {
        console.error('Error submitting claim:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        return { success: false, error: error.message || 'Failed to submit claim' };
    }
}
