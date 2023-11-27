import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import { Order } from "@/models/Order";

export default async function handler(req,res) {
  await mongooseConnect();
  const method = req.method;
  
  if (method === 'GET') {
    const customer = await Customer.findOne({email: req.query.email})
    let orders = [];
    if (customer) {
      orders = await Order.find({_id: {$in: customer.orders}}).sort({createdAt: -1});
    }
    res.json(orders);
  }
  if (method === 'DELETE') {
    if (req.query.id) {
      const customer = await Customer.deleteOne({_id: req.query.id})
      res.json(customer);
    }
  }
}