import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export default async function handler(req,res) {
  await mongooseConnect();
  const {method} = req;
  if (method === "GET") {
    const limit = process.env.PRODUCTS_PER_PAGE;
    const skip = parseInt(req.query.page) * limit;
    const products = await Product.find().sort({'_id': -1}).limit(limit).skip(skip);
    res.json(products);
  }
  if (method === "POST") {
    const query = req.body.query;
    const category = req.body.category;
    const min = query["Range"]?.split('-')[0] || 0;
    const max = query["Range"]?.split('-')[1] || 99999999999999999999;

    
    Object.keys(query).forEach(key => {
      if (key !== "Range") {
        query['properties.'+key] = query[key].split(',');
      }
      delete query[key];
    })

    const categoryChildrens = await Category.find({_id: category.childrens});

    const categories = [category._id, ...category.childrens];

    if (categoryChildrens) {
      categoryChildrens.forEach(cat => {
        if (cat.childrens) {
          cat.childrens.forEach(id => {
            categories.push(id.toString())
          })
        }
      })
    }
    res.json(await Product.find({ 
      category: { $in: categories}, 
      ...query, 
      $and: [{ 
        $or: [{salePrice: {$gte: min}}, {price: {$gte: min}},] 
      },{ 
        $or: [{salePrice: {$lte: max}}, {price: {$lte: max}},] 
      }]
    }));
  }
}