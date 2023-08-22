import Image from "next/image";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

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
`;

export default function Featured({product}) {
  return (
    <StyledDiv>
      <div>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <ButtonLink href={`/product/${product._id}`} $white>Read More</ButtonLink>
        <Button $white>Buy Now</Button>
      </div>
      <div>
        <Image src={product.images[0]} width={632} height={486} alt="macbook"/>
      </div>
    </StyledDiv>
  )
}