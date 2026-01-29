import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { db } from '@/lib/db';
// Need to import your user/subscription schema to update DB status
// import { users } from '@/lib/schema'; 
// import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const subscriptionId = session.subscription;
        // Retrieve the subscription details from Stripe.
        // const subscription = await stripe.subscriptions.retrieve(subscriptionId as string);

        // Update the user's status in your database
        // await db.update(users).set({ 
        //     isPro: true, 
        //     stripeSubscriptionId: subscriptionId 
        // }).where(eq(users.email, session.customer_details?.email));

        console.log(`Payment successful for session ID: ${session.id}`);
    }

    if (event.type === 'invoice.payment_succeeded') {
        // Handle recurring payment success
        /* 
        const subscription = await stripe.subscriptions.retrieve(
            session.subscription as string
        );
        */
    }

    return new NextResponse(null, { status: 200 });
}
