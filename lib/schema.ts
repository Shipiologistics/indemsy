import { pgTable, serial, text, boolean, timestamp, jsonb, date, varchar, integer, customType } from 'drizzle-orm/pg-core';

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

// Chatbot Tables

export const chatSessions = pgTable('chat_sessions', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    status: varchar('status', { length: 50 }).default('active'),
    checkoutState: jsonb('checkout_state').default({}),
    metadata: jsonb('metadata').default({}),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

export const chatMessages = pgTable('chat_messages', {
    id: serial('id').primaryKey(),
    sessionId: integer('session_id').references(() => chatSessions.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 20 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// Define vector type significantly for PGVector 
const vector = customType<{ data: number[] }>({
    dataType() {
        return 'vector(384)';
    },
});

export const knowledgeBase = pgTable('knowledge_base', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    url: text('url'),
    category: varchar('category', { length: 100 }),
    tags: text('tags').array(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    embedding: vector('embedding'),
});

// Claim Comments - Admin comments on claims visible to users
export const claimComments = pgTable('claim_comments', {
    id: serial('id').primaryKey(),
    claimId: integer('claim_id').references(() => claims.id, { onDelete: 'cascade' }).notNull(),
    adminName: varchar('admin_name', { length: 100 }).default('Admin'),
    content: text('content').notNull(),
    isInternal: boolean('is_internal').default(false), // If true, only visible to admin, not user
    createdAt: timestamp('created_at').defaultNow(),
});

// ============== CMS TABLES ==============

// Page Content - For static pages like About Us, Planting Trees, etc.
export const pageContent = pgTable('page_content', {
    id: serial('id').primaryKey(),
    pageSlug: varchar('page_slug', { length: 100 }).notNull().unique(), // about-us, planting-trees, etc.
    title: text('title').notNull(),
    titleFr: text('title_fr'),
    content: text('content').notNull(), // HTML or Markdown content
    contentFr: text('content_fr'),
    metaDescription: text('meta_description'),
    metaDescriptionFr: text('meta_description_fr'),
    heroImage: text('hero_image'),
    isPublished: boolean('is_published').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Blog Posts
export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 200 }).notNull().unique(),
    title: text('title').notNull(),
    titleFr: text('title_fr'),
    excerpt: text('excerpt'), // Short summary for cards
    excerptFr: text('excerpt_fr'),
    content: text('content').notNull(), // Full blog content
    contentFr: text('content_fr'),
    featuredImage: text('featured_image'),
    category: varchar('category', { length: 100 }),
    tags: text('tags').array(),
    author: varchar('author', { length: 100 }).default('Indemsy Team'),
    authorImage: text('author_image'),
    readTime: integer('read_time'), // minutes to read
    isPublished: boolean('is_published').default(false),
    isFeatured: boolean('is_featured').default(false),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Team Members / Experts
export const teamMembers = pgTable('team_members', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    role: varchar('role', { length: 100 }).notNull(),
    roleFr: varchar('role_fr', { length: 100 }),
    bio: text('bio'),
    bioFr: text('bio_fr'),
    photo: text('photo'),
    email: varchar('email', { length: 255 }),
    linkedin: text('linkedin'),
    twitter: text('twitter'),
    displayOrder: integer('display_order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});

// Press Releases
export const pressReleases = pgTable('press_releases', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    titleFr: text('title_fr'),
    source: varchar('source', { length: 200 }), // e.g., "Forbes", "TechCrunch"
    sourceUrl: text('source_url'),
    excerpt: text('excerpt'),
    excerptFr: text('excerpt_fr'),
    logoUrl: text('logo_url'),
    publishedDate: date('published_date'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});

// Career/Job Postings
export const jobPostings = pgTable('job_postings', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 200 }).notNull(),
    titleFr: varchar('title_fr', { length: 200 }),
    department: varchar('department', { length: 100 }),
    location: varchar('location', { length: 100 }),
    type: varchar('type', { length: 50 }), // full-time, part-time, contract
    description: text('description').notNull(),
    descriptionFr: text('description_fr'),
    requirements: text('requirements'),
    requirementsFr: text('requirements_fr'),
    benefits: text('benefits'),
    benefitsFr: text('benefits_fr'),
    salaryRange: varchar('salary_range', { length: 100 }),
    applicationUrl: text('application_url'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Partners (Legal partners, Affiliates, etc.)
export const partners = pgTable('partners', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 200 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(), // affiliate, legal, airline, employee-benefit
    logo: text('logo'),
    description: text('description'),
    descriptionFr: text('description_fr'),
    websiteUrl: text('website_url'),
    contactEmail: varchar('contact_email', { length: 255 }),
    displayOrder: integer('display_order').default(0),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
});
