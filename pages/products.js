import ProductsGrid from "@/components/ProductsGrid";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import Title from "@/components/Title";
import { useRouter } from "next/router";
import LoadMoreBtn from "@/components/LoadMoreBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import LayoutNoPreloader from "@/components/LayoutNoPreloader";
import usePreloader from "@/hooks/usePreloader";

export default function ProductsPage({products}) {

  const [productsToShow, setProductsToShow] = useState(products);
  const [productsCount, setProductsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(router.query.page || 1);

  useEffect(() => {
    axios.get('/api/products?count='+'true').then(res => {
      setProductsCount(res.data)
    })
  },[])

  useEffect(() => {
    if (pageNumber !== 1) {
      router.push({
        ...router,
        pathname: '/products/', 
        query: {
          page: pageNumber
        }
      },
      undefined,
      { shallow: true },
      )
      
    }
    
  },[pageNumber])

  async function LoadProducts() {
    setLoading(true);
    setPageNumber(prev => parseInt(prev) + 1);
    axios.get("/api/products?page=" + pageNumber).then(res => {
      setProductsToShow(prev => {
        return [
          ...prev,
          ...res.data
        ]
      })
      setLoading(false);
    })
  }
  
  return (
    <LayoutNoPreloader>
      <Title>New Products</Title>
      <ProductsGrid products={productsToShow}/>
      {productsCount > productsToShow.length && (
        <>
          {loading ? <Spinner/> : <LoadMoreBtn onClick={LoadProducts}>Load More</LoadMoreBtn>}
        </>
      )}
    </LayoutNoPreloader>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const limit = process.env.PRODUCTS_PER_PAGE * parseInt(context.query.page || 1);
  const categories = await Category.find();
  const products = await Product.find().sort({'_id': -1}).limit(limit);

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}