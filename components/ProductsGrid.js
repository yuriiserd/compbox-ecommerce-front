import styled from "styled-components"
import ProductCard from "./ProductCard"
import { motion } from "framer-motion"

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

  return (
    <>
      {products.length === 0 && (
        <NotFound>No products found &#9785;</NotFound>
      )}
      <StyledGrid>
        {products.map((product, i) => (
          <motion.div
            key={product._id}
            initial={{ y: 200, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            viewport={{ once: true }}
          >
            <ProductCard product={product}/>
          </motion.div>
        ))}
      </StyledGrid>
    </>
  )
}