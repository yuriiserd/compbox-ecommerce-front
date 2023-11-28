import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import ProductPage from "../product/[...id]";

export default async function handler(req,res) {
  await mongooseConnect();
  const {method} = req;
  if (method === "GET") { // for new products page
    if (req.query?.count) {
      const productsCount = await Product.count();
      res.json(productsCount)
    }
    if (req.query?.search) {
      const search = req.query.search;
      const regex = new RegExp(search,'i'); // make case-insensitive query

      res.json(await Product.find({searchQuery: {$regex: regex}}, null, {sort: {'createdAt': -1}}).populate('category'));
    }
    if (req.query?.page) {
      const limit = process.env.PRODUCTS_PER_PAGE;
      const skip = parseInt(req.query.page) * limit;
      
      const products = await Product.find().sort({'_id': -1}).limit(limit).skip(skip);

      res.json(products);
    }
    if (req.query?.ids) {
      const ids = req.query.ids.split(',');
      const products = await Product.find({_id: {$in: ids}});
      res.json(products);
    }
    
  }
  if (method === "POST") { // for filters on single category page
    const query = req.body.query;
    const category = req.body.category;
    const min = query["Range"]?.split('-')[0] || 0;
    const max = query["Range"]?.split('-')[1] || 99999999999999999999;
    const limit = process.env.PRODUCTS_PER_PAGE;
    const skip = parseInt(req.body.page) * limit;

    
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
    //send all queried products count to show count and hide load more
    if (req.body.all) {
      res.json(await Product.find({ 
        category: { $in: categories}, 
        ...query, 
        $and: [{ 
          $or: [{salePrice: {$gte: min}}, {price: {$gte: min}},] 
        },{ 
          $or: [{salePrice: {$lte: max}}, {price: {$lte: max}},] 
        }]
      }, 
      null, 
      {sort: {'_id': -1}}
      ).count());
    }
    //send queried products
    res.json(await Product.find({ 
      category: { $in: categories}, 
      ...query, 
      $and: [{ 
        $or: [{salePrice: {$gte: min}}, {price: {$gte: min}},] 
      },{ 
        $or: [{salePrice: {$lte: max}}, {price: {$lte: max}},] 
      }]
    }, 
    null, 
    {sort: {'_id': -1}}
    ).limit(limit).skip(skip));
  }
}