import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseServer } from '@/lib/supabaseServer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function POST(req: NextRequest) {
  try {
    const { courseId, courseTitle, price, userEmail } = await req.json();

    if (!courseId || !courseTitle || !price || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: courseTitle,
              description: `Enroll in ${courseTitle}`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${courseId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/course/${courseId}`,
      customer_email: userEmail,
      metadata: {
        courseId: courseId.toString(),
        courseTitle,
        userEmail,
      },
    });

    // Store initial payment record in Supabase
    const { error: dbError } = await supabaseServer.from('payments').insert({
      user_email: userEmail,
      course_id: courseId,
      course_title: courseTitle,
      amount: price,
      currency: 'usd',
      stripe_session_id: session.id,
      payment_status: 'pending',
    });

    if (dbError) {
      console.error('Error storing payment:', dbError);
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
