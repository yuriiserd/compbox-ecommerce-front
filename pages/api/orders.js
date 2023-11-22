import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import { Order } from "@/models/Order";

export default async function handler(req,res) {
  await mongooseConnect();
  const method = req.method;
  
  if (method === 'GET') {
    const customer = await Customer.findOne({email: req.query.email})
    const orders = await Order.find({_id: {$in: customer.orders}})
    res.json(orders);
  }
  if (method === 'DELETE') {
    if (req.query.id) {
      const customer = await Customer.deleteOne({_id: req.query.id})
      res.json(customer);
    }
  }
}