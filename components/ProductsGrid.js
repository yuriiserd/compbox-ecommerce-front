import styled from "styled-components"
import ProductCard from "./ProductCard"

export default function ProductsGrid({products}) {

  const StyledGrid = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-top: 100px;
    padding-bottom: 100px;
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
  
  return (
    <StyledGrid>
      {products.map(product => <ProductCard key={product._id} product={product}/>)}
    </StyledGrid>
  )
}