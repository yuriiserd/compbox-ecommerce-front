import Header from "@/components/Header";
import Layout from "@/components/Layout";
import { LikedContext } from "@/components/LikedContext";
import ProductCard from "@/components/ProductCard";
import ProductsGrid, { NotFound } from "@/components/ProductsGrid";
import Title from "@/components/Title";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function Liked() {

  const {likedProducts, addToLiked} = useContext(LikedContext);
  const [products, setProducts] = useState([]);
  
  
  useEffect(() => {
    axios.get('/api/products?ids='+likedProducts.join(',')).then(res => {
      setProducts(res.data);
    })
  })


  return (
    <Layout>
      <Title>Liked Products</Title>
      {products.length > 0 && (
        <ProductsGrid products={products}/>
      )}
    </Layout>
  )
}