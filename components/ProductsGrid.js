import styled from "styled-components"
import ProductCard from "./ProductCard"
import { use, useEffect, useState } from "react";
import Spinner from "./Spinner";

const StyledGrid = styled.div`
    display: grid;
    width: 100%;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-bottom: 50px;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
      max-width: 700px;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      max-width: 400px;
    }
  `
  export const NotFound = styled.p`
    font-size: 1.5rem;
    opacity: 0.5;
  `

export default function ProductsGrid({products}) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setLoading(false);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 2000)
    }
  }, [products])

  return (
    <>
      {products.length === 0 && !loading && (
        <NotFound>No products found &#9785;</NotFound>
      )}
      <StyledGrid>
        {products.map(product => <ProductCard key={product._id} product={product}/>)}
      </StyledGrid>
      {loading && (
        <Spinner/>
      )}
    </>
  )
}