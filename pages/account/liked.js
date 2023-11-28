import AccountLayout from "@/components/AccountLayout";
import { LikedContext } from "@/components/LikedContext";
import ProductsGrid from "@/components/ProductsGrid";
import axios from "axios";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";

export default function Liked() {

  const {likedProducts, updateLikedProducts} = useContext(LikedContext);
  const [productIds, setProductIds] = useState([]);
  const [products, setProducts] = useState([]);

  const {data: session} = useSession();
  
  useEffect(() => {
    if (session?.user) {
      axios.get('/api/account?email=' + session?.user?.email).then(response => {
        updateLikedProducts(response?.data?.likedProducts);
      })
    }
  }, [])
  
  useEffect(() => {
    if (session?.user) {
      axios.get('/api/account?email=' + session?.user?.email).then(response => {
        const result = new Set([...response?.data?.likedProducts, ...likedProducts])
        setProductIds([...result]);
      })
    } else {
      setProductIds(likedProducts);
    }
    
  }, [likedProducts])

  useEffect(() => {
    if (productIds.length > 0) {
      axios.get('/api/products?ids=' + productIds.join(',')).then(response => {
        setProducts(response.data);
      })
    }
    
  }, [productIds])

  return (
    <AccountLayout>
      <h2>Liked Products</h2>
      <ProductsGrid products={products}/>
    </AccountLayout>
  )
}