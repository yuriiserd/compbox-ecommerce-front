import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { buffer } from "micro";


export default async function handler(req, res) {
  await mongooseConnect();

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const sig = req.headers['stripe-signature'];

  let event;
  
  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    console.log(err.message)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentComplited = event.data.object;
      const orderId = paymentComplited.metadata.orderId;
      const paid = paymentComplited.payment_status === 'paid';
      if (orderId && paid) {
        console.log("order update start")
        await Order.updateOne({_id: orderId}, {paid: true})
          .then(() => console.log("order update success"))
          .catch(err => console.log(err))
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send('ok');
}

//account id => acct_1NvlidE4pCafpGtV

export const config = {
  api: {bodyParser: false}
}