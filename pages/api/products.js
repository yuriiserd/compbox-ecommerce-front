import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export default async function handler(req,res) {
  await mongooseConnect();
  const query = req.body.query;
  const category = req.body.category;
  const min = query["Range"]?.split('-')[0]
  const max = query["Range"]?.split('-')[1]
  
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
      salePrice: {$gt: min - 1} 
    }, { 
      salePrice: {$lt: max + 1} 
    }, { 
      price: {$gt: min - 1} 
    }, { 
      price: {$lt: max + 1} 
    }]
  }));
}