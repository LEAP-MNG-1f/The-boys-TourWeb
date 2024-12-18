import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51QWJPGJAk8CP2BDJ5M9MRSWlbebnYsQpvBX6Rni3dFnOB7juTUAS108CRE6PEFCdGoz2jRC1PTAel0xg0YiyEErR00TcFhVAcm"
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, currency } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    return new Response(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
