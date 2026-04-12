import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-02-24-preview', // Latest stable version
  typescript: true,
});

export const createStripeCheckoutSession = async (items: any[], orderId: string) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/siparis-takip?success=true&orderId=${orderId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/odeme?canceled=true`,
    metadata: { orderId },
  });
};
