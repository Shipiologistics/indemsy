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
        return { success: true, claimId: result[0].id };
    } catch (error: any) {
        console.error('Error submitting claim:', error);
        console.error('Error details:', error.message);
        console.error('Error stack:', error.stack);
        return { success: false, error: error.message || 'Failed to submit claim' };
    }
}
