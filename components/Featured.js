import Image from "next/image";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
    line-height: 1.7;
  }
  img {
    max-height: 500px;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

export default function Featured({product}) {

  const {addToCart} = useContext(CartContext);

  return (
    <StyledDiv>
      <motion.div 
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1>{product.properties["Brand"]} {product.title}</h1>
        <p>{product.description}</p>
        <ButtonLink href={`/product/${product._id}`} $transparent>Read More</ButtonLink>
        <Button $white onClick={() => addToCart(product._id)}><CartIcon/>Buy Now</Button>
      </motion.div>
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={product.images[0]} width={632} height={500} alt="macbook"/>
      </motion.div>
    </StyledDiv>
  )
}