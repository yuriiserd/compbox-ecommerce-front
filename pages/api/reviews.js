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
}