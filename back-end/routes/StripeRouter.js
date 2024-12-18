import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET);
// const items = new Map([
//   [1, { price: 1000, name: "Apple" }],
//   [2, { price: 2000, name: "Banana" }],
// ]);

paymentRouter.post("/create-payment-intend", async (request, response) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: 1000,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    response.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return response.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
  //   response.json({ result: "hi" });
  //   //   const { tour } = request.body;
  //   const lineItems = tour.map((item) => ({
  //     price_data: {
  //       currency: "usd",
  //       product_data: {
  //         name: item.title,
  //         images: [item.images],
  //       },
  //       unit_amount: Math.round(item.price * 100),
  //     },
  //     quantity: item.quantity,
  //   }));
  //   try {
  //     const session = await stripe.checkout.sessions.create({
  //       payment_method_types: ["card"],
  //       line_items: lineItems,
  //       mode: "payment",
  //       success_url: "http://localhost:3000/success",
  //       cancel_url: "http://localhost:3000/cancel",
  //     });
  //     response.json({
  //       id: session.id,
  //     });
  //   } catch (error) {
  //     response.status(500).json({ error: error.message });
  //   }
});

export default paymentRouter;
