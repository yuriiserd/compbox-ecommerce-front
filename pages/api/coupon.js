const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { name } = req.query;

  const coupons = await stripe.coupons.list();
  const coupon = coupons.data.find(coupon => coupon.name === name);
  res.status(200).json(coupon);
}