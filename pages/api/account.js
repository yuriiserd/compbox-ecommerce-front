import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";

export default async function handler(req,res) {
  await mongooseConnect();
  const method = req.method;
  if (method === 'POST') {
    if (req.body?._id) {
      const customer = await Customer.updateOne({_id: req.body._id}, {...req.body});
      res.json(customer);
    } else {
      const customer = await Customer.create({...req.body, orders: []});
      res.json(customer);
    }
  }
  if (method === 'GET') {
    const customer = await Customer.findOne({email: req.query.email})
    res.json(customer);
  }
  if (method === 'DELETE') {
    if (req.query.id) {
      const customer = await Customer.deleteOne({_id: req.query.id})
      res.json(customer);
    }
  }
}