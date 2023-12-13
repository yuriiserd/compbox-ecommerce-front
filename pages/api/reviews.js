import { mongooseConnect } from "@/lib/mongoose";
import { Review } from "@/models/Review";

export default async function handler(req, res) {
  await mongooseConnect();
  const { method } = req;
  if (method === "POST") {
    const { userName, rating, comment, productId } = req.body;
    const review = new Review({
      userName,
      rating,
      comment,
      status: "pending",
      productId,
    });
    await review.save();
    res.status(201).json(review);
  }
  if (method === "GET") {
    if (req.query.count) {
      const { productId } = req.query;
      const count = await Review.countDocuments({
        productId,
        status: "approved",
      });
      res.status(200).json(count);
      return;
    }
    const { productId } = req.query;
    const reviews = await Review.find({
      productId,
      status: "approved",
    }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  }
}