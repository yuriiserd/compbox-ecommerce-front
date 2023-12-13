import axios from "axios";
import { useEffect, useState } from "react";

export default function useCalcRating(productId) {

  const [reviews, setReviews] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/reviews?productId=${productId}`).then(res => {
      setReviews(res.data);
    }).catch(err => {
      console.log(err);
    });
  }, [productId]);

  if (!reviews.length) {
    return false;
  }
  
  const rating = parseFloat(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1);
  
  const strRating = rating + '';
  if (strRating[strRating.length - 1] === '0') {
    return strRating[0]
  } else {
    return strRating
  }
} 