import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../../services/stripe';
import { saveSubscription } from '../_lib/manageSubscrition';

async function readBuffer(readable: Readable) {
    const chunks = [];

    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    }

    return Buffer.concat(chunks);
}

export const config = {
    api: {
        bodyParser: false,
    }
};

const releventEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
]);

export default async (request: NextApiRequest, response: NextApiResponse) => {
    if (request.method !== 'POST') {
        return response
            .setHeader('Allow', 'POST')
            .status(405)
            .end('Method not allowed');
    }

    const secret = request.headers['stripe-signature'];

    let event: Stripe.Event;

    try {
        const buffer = await readBuffer(request);

        event = stripe.webhooks.constructEvent(buffer, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (error) {
        return response.status(400).send(`Webhook error: ${error.message}`);
    }

    const { type } = event;

    if (releventEvents.has(type)) {
        try {
            switch (type) {
                case 'checkout.session.completed':
                    const checkoutSession = event.data.object as Stripe.Checkout.Session;

                    await saveSubscription(
                        checkoutSession.subscription.toString(),
                        checkoutSession.customer.toString(),
                        true
                    );

                    break;
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const subscription = event.data.object as Stripe.Subscription;

                    await saveSubscription(
                        subscription.id.toString(),
                        subscription.customer.toString(),
                        false
                    );

                    break;
                default:
                    throw new Error('Unhandled event');
            }
        } catch (error) {
            return response.json({ error: `Webhook handler failed: ${error.message}` })
        }


    }

    response.json({ received: true });
}