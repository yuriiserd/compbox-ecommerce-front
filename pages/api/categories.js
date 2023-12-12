import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export default async function handler(req,res) {
  await mongooseConnect();
  const id = req.body.id;
  const parent = req.query.parent;
  if (id) {
    res.json(await Category.findOne({_id: id}));
  } else if (parent) {
    res.json(await Category.find({parent: {_id: parent}}));
  } 
  
}