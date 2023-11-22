import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return
  }

  const {
    name, phone, email, city,
    zip, address, country,
    products
  } = req.body;

  await mongooseConnect();

  const uniqueIds = [...new Set(products)];
  const productsInfo = await Product.find({_id: uniqueIds});

  let product_items = [];
  for (const productId of uniqueIds) {
    const info = productsInfo.find(product => product._id.toString() === productId);
    const quantity = products.filter(id => id === productId)?.length || 0;
    if (quantity > 0 && info) {
      product_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {
            name: info.title,
            images: info.images,
            id: info._id
          },
          unit_amount: info.salePrice ? info.salePrice * 100 : info.price * 100
        }
      })
    }
  }
  
  const orderDoc = await Order.create({
    product_items, 
    name, 
    phone,
    email, 
    city, 
    zip, 
    address, 
    country, 
    paid: false,
  })

  //add oreder to customer
  await Customer.updateOne({email}, {$push: {orders: orderDoc._id}})

  const session = await stripe.checkout.sessions.create({
    line_items: product_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?cancel=1',
    metadata: {orderId: orderDoc._id.toString()},
  })
  
  res.json({
    url: session.url,
  });

}