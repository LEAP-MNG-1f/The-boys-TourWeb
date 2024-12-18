"use client";

import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./components/CheckoutForm";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// import React, { useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";

// // Replace with your Stripe publishable key
// const stripePromise = loadStripe(
//   "pk_test_51QWJPGJAk8CP2BDJRWOKg5SHs3yPYNjPKf21kDi6XfzAHlIrR0IgtlQd9aQRVDepp686Pp3Zaneyke95QvfCI6TP00PL01rn5t"
// );

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [message, setMessage] = useState("");
//   const [cardError, setCardError] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setMessage("Processing payment...");

//     const cardNumber = elements.getElement(CardNumberElement);

//     if (!cardNumber) {
//       setMessage("Card details are incomplete.");
//       return;
//     }

//     // Fetch the client secret from the server
//     const response = await fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ amount: 100, currency: "usd" }),
//     });

//     const { clientSecret } = await response.json();

//     if (!clientSecret) {
//       setMessage("Failed to get client secret.");
//       return;
//     }

//     // Confirm the payment
//     const { error, paymentIntent } = await stripe.confirmCardPayment(
//       clientSecret,
//       {
//         payment_method: {
//           card: cardNumber,
//         },
//       }
//     );

//     if (error) {
//       setMessage(`Payment failed: ${error.message}`);
//     } else if (paymentIntent.status === "succeeded") {
//       setMessage("Payment succeeded!");
//     }
//   };

//   const handleCardChange = (event) => {
//     if (event.error) {
//       setCardError(event.error.message);
//     } else {
//       setCardError("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Card Number</label>
//       <CardNumberElement onChange={handleCardChange} />
//       <label>Expiration Date</label>
//       <CardExpiryElement onChange={handleCardChange} />
//       <label>CVC</label>
//       <CardCvcElement onChange={handleCardChange} />
//       {cardError && <p style={{ color: "red" }}>{cardError}</p>}
//       <button type="submit" disabled={!stripe || !elements}>
//         Pay $1.00
//       </button>
//       <p>{message}</p>
//     </form>
//   );
// };

// const Payment = () => (
//   <Elements stripe={stripePromise}>
//     <h1>Stripe Payment with Next.js (App Router)</h1>
//     <CheckoutForm />
//   </Elements>
// );

// export default Payment;

const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  //   const fetchConfig = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/config");

  //       const publishableKey = await response.json();
  //       console.log(publishableKey);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchConfig();
  //   });

  useEffect(() => {
    fetch("/config").then(async (res) => {
      const { publishableKey } = await res.json();

      console.log(publishableKey);

      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  //   useEffect(() => {
  //     fetch("/create-payment-intend", {
  //       method: "POST",
  //       body: JSON.stringify({}),
  //     }).then(async (r) => {
  //       const { clientSecret } = await r.json();

  //       console.log(clientSecret);

  //       setStripePromise(loadStripe(clientSecret));
  //     });
  //   }, []);

  return (
    <>
      <h1>React stripe and the payment</h1>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Payment;
