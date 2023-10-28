import styled from "styled-components"
import ProductCard from "./ProductCard"

export default function ProductsGrid({products}) {

  const StyledGrid = styled.div`
    display: grid;
    width: 100%;
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
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
  const NotFound = styled.p`
    font-size: 1.5rem;
  `
  
  return (
    <StyledGrid>
      {!products.length && (
        <NotFound>No products found :(</NotFound>
      )}
      {products.map(product => <ProductCard key={product._id} product={product}/>)}
    </StyledGrid>
  )
}