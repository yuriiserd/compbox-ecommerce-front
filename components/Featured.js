import Image from "next/image";
import Link from "next/link";
import styled from "styled-components"
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
        <div dangerouslySetInnerHTML={{__html: product.description}}></div>
        <ButtonLink href="/" $white>Read More</ButtonLink>
        <Button $white>Buy Now</Button>
      </div>
      <div>
        <Image src="https://images.macrumors.com/t/MwgTEggiztXrvIN2l8bZny1f93M=/1600x/article-new/2013/09/2023-macbook-pro-transparent.png" width={632} height={486}/>
      </div>
    </StyledDiv>
  )
}