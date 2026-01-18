import { pgTable, serial, text, boolean, timestamp, jsonb, date, varchar, integer } from 'drizzle-orm/pg-core';

export const claims = pgTable('claims', {
    id: serial('id').primaryKey(),

    // Step 1: Flight Type
    isDirect: boolean('is_direct'),
    connectionAirports: jsonb('connection_airports'), // Store as JSON array of airports

    // Step 2: Airports & Date
    departureAirport: jsonb('departure_airport'),
    arrivalAirport: jsonb('arrival_airport'),
    travelDate: date('travel_date'),

    // Step 3: Flight Selection
    selectedFlight: jsonb('selected_flight'),
    manualFlightNumber: varchar('manual_flight_number', { length: 20 }),
    manualAirline: varchar('manual_airline', { length: 100 }),
    manualDepartureTime: varchar('manual_departure_time', { length: 10 }),

    // Step 4: Problem Type
    problemType: varchar('problem_type', { length: 50 }), // delayed, cancelled, refused
    refusedReason: text('refused_reason'),

    // Step 5: Delay
    delayDuration: varchar('delay_duration', { length: 50 }),

    // Step 6: Passenger Info
    firstName: varchar('first_name', { length: 100 }),
    lastName: varchar('last_name', { length: 100 }),
    email: varchar('email', { length: 255 }),
    phone: varchar('phone', { length: 50 }),
    acceptTerms: boolean('accept_terms').default(false),

    // Step 7: Group Travel
    isGroupTravel: boolean('is_group_travel'),
    groupPassengers: jsonb('group_passengers'), // Store detailed list

    // Step 8: Address
    address: text('address'),
    city: varchar('city', { length: 100 }),
    postalCode: varchar('postal_code', { length: 20 }),
    country: varchar('country', { length: 100 }),

    // Step 9: Booking
    bookingNumber: varchar('booking_number', { length: 50 }),

    // Step 10: Signature
    signature: text('signature'), // Base64 or string representation

    // Step 11 & 12: Documents (Storing file paths/references)
    boardingPassUrl: text('boarding_pass_url'),
    idDocumentUrl: text('id_document_url'),

    // Step 13: Airline Contact
    contactedAirline: boolean('contacted_airline'),
    incidentDescription: text('incident_description'),

    // Additional Info
    preferredLanguage: varchar('preferred_language', { length: 10 }),
    ticketPurchaseSource: varchar('ticket_purchase_source', { length: 100 }),
    referralSource: varchar('referral_source', { length: 100 }),
    primeSubscription: varchar('prime_subscription', { length: 20 }),

    // Metadata
    status: varchar('status', { length: 20 }).default('submitted'), // submitted, processing, etc.
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const documents = pgTable('documents', {
    id: serial('id').primaryKey(),
    url: text('url').notNull(),
    fileName: text('file_name'),
    fileType: varchar('file_type', { length: 50 }), // 'boarding_pass', 'id_document', etc.
    claimId: integer('claim_id').references(() => claims.id),
    uploadedAt: timestamp('uploaded_at').defaultNow(),
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name'),
    email: text('email').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});
