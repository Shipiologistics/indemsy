'use server';

import { db } from '@/lib/db';
import { claims } from '@/lib/schema';

export async function submitClaim(formData: any) {
    try {
        // Log what we're receiving for debugging
        console.log('Submitting claim with data:', JSON.stringify(formData, null, 2));

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
            manualDepartureTime: formData.manualDepartureTime || null,

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
            const { sendEmail } = await import('@/lib/mail');
            await sendEmail({
                to: formData.email,
                subject: 'Claim Received - FlyCompense',
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <img src="https://flycompense.com/public/logo.png" alt="FlyCompense" style="height: 40px; margin-bottom: 20px;" />
                        <h1 style="color: #0E1F3B; font-size: 24px;">Claim Received Successfully</h1>
                        <p>Hello ${formData.firstName || 'Traveler'},</p>
                        <p>We have successfully received your compensation claim (Ref: <strong>#${result[0].id}</strong>).</p>
                        <p>Our legal experts will now review your case to determine your eligibility for compensation.</p>
                        
                        <div style="background: #F0F9FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <h3 style="margin-top: 0; color: #0284C7;">Next Steps</h3>
                            <ul style="padding-left: 20px; margin-bottom: 0;">
                                <li>Case analysis (24-48h)</li>
                                <li>Communication with airline</li>
                                <li>Legal processing</li>
                            </ul>
                        </div>

                        <p>We will keep you updated via email on every significant step.</p>
                        
                        <a href="https://flycompense.com/dashboard/claim/${result[0].id}" style="display: inline-block; background: #FF8A00; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Track Claim Status</a>
                        
                        <p style="margin-top: 30px; font-size: 12px; color: #888;">
                            If you have additional documents, you can upload them in your dashboard.
                        </p>
                    </div>
                `,
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
