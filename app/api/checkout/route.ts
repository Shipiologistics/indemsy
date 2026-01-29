import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { plan } = body;

        // You can define prices here or fetch from database
        const PRICE_ID = plan === 'premium' ? 'price_YOUR_PRICE_ID' : 'price_YOUR_BASIC_ID';
        // In production, you'd likely use a price ID from your Stripe dashboard

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: 'FlyCompense Premium Subscription',
                            description: 'Unlimited claims, priority support, and insurance.',
                        },
                        unit_amount: 5999, // Amount in cents (e.g., 59.99 EUR)
                        recurring: {
                            interval: 'year' // or 'month'
                        }
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription', // or 'payment' for one-time
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/plus`,
            metadata: {
                plan,
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
