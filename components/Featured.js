import Image from "next/image";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
    line-height: 1.7;
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
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <ButtonLink href={`/product/${product._id}`} $transparent>Read More</ButtonLink>
        <Button $white onClick={() => addToCart(product._id)}><CartIcon/>Buy Now</Button>
      </div>
      <div>
        <Image src={product.images[0]} width={632} height={486} alt="macbook"/>
      </div>
    </StyledDiv>
  )
}