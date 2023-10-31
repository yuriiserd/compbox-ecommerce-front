import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export default async function handler(req,res) {
  await mongooseConnect();
  const id = req.body.id;
  
  res.json(await Category.findOne({_id: id}));
}