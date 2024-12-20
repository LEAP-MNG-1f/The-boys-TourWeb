import Stripe from "stripe";

// Initialize Stripe with your secret key
const stripe = new Stripe(
  "sk_test_51QWJPGJAk8CP2BDJ5M9MRSWlbebnYsQpvBX6Rni3dFnOB7juTUAS108CRE6PEFCdGoz2jRC1PTAel0xg0YiyEErR00TcFhVAcm"
);
const host = "https://front-end-two-psi.vercel.app/";

export async function POST(request) {
  const body = await request.json();
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: body?.title,
              images: body?.images,
            },
            unit_amount: body?.amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      cancel_url: `${host}`,
      success_url: `${host}/success`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
