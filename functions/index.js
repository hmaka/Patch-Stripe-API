const functions = require("firebase-functions");

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:5500/success",
    cancel_url: "http://localhost:5500/cancel",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: (1)*100,
          product_data: {
            name: "New camera",
          },
        },
      },
    ],
  });

  return {
    id: session.id,
  };
});
