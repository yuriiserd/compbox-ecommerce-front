import styled from "styled-components"
import HeartIcon from "./icons/HeartIcon"
import { useState } from "react"
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./icons/CartIcon";

export default function ProductCard({product}) {

  const [liked, setLiked] = useState(false);

  const StyledCard = styled(Link)`
    background-color: #ffffff;
    padding: 20px;
    position: relative;
    border: 1px solid #e9e9e9;
    border-radius: 1rem;
    transition: box-shadow 0.3s;
    box-shadow: 0px 14px 0px rgba(71, 82, 94, 0);
    color: #000;
    text-decoration: none;
    &:hover {
      box-shadow: 0px 14px 34px rgba(71, 82, 94, 0.21);
    }
    h3 {
      text-align: center;
    }
    img {
      display: block;
      margin: 0 auto 1rem;
      object-fit: contain;
      max-height: 150px;
    }
    button {
      position: absolute;
      left: 1rem;
      top: 1rem;
      z-index: 2;
    }
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        position: static;
      }
    }
  `
  const StyledPrice = styled.p`

  `
  const StyledSalePrice = styled.p`

  `

  return (
    <StyledCard href={`/product/${product._id}`}>
      <Button $white $icon onClick={(event) => {
        event.preventDefault();
        setLiked(!liked);
      }}>
        <HeartIcon liked={liked} />
      </Button>
      <Image src={product.images[0]} width={300} height={200}/>
      <h3>{product.title}</h3>
      <div>
        
        <StyledPrice>{product.price}</StyledPrice>
        <StyledSalePrice>{product.salePrice}</StyledSalePrice>
        <Button $white $icon onClick={(event) => {
          event.preventDefault();
          // setLiked(!liked);
        }}>
          <CartIcon liked={liked} />
        </Button>
      </div>
    </StyledCard>
  )
}