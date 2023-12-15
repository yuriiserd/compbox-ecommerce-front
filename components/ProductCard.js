import styled from "styled-components"
import HeartIcon from "./icons/HeartIcon"
import { useContext, useEffect, useState, useMemo } from "react"
import Button from "./Button";
import Image from "next/image";
import Link from "next/link";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import { LikedContext } from "./LikedContext";
import ProductIcon from "./icons/ProductIcon";
import useCalcRating from "@/hooks/useCalcRating";
import StarIcon from "./icons/StarIcon";
import axios from "axios";
import { red, redLight } from "@/lib/colors";

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 40px);
  .sale {
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${red};
    color: #ffffff;
    padding: 0.5rem 1rem;
    border-radius: 0 1rem 0 1rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: bold;
    z-index: 2;
  }
  img {
    display: block;
    margin: 0 auto 1rem;
    object-fit: contain;
    height: 150px;
    transition: all 0.4s;
    scale: 1;
  }
  &:hover {
    box-shadow: 0px 14px 34px rgba(71, 82, 94, 0.21);
    img {
      scale: 1.05;
    }
  }
  h3 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  
  button {
    position: absolute;
    left: 1rem;
    top: 1rem;
    z-index: 2;
    margin-right: 0;
  }
  svg {
    width: 25px;
  }
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    button {
      position: static;
    }
  }
`
const StyledPrice = styled.p`
  font-size: 1.3rem;
  margin-right: 0.5rem;
  ${props => props.sale && `
    color: #797878;
    text-decoration: line-through;
  `}
`
const StyledSalePrice = styled.p`
  font-size: 1.3rem;
  margin-right: auto;
  color: #f84147;
`
const Rating = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  span {
    font-size: 0.9rem;
  }
`

export default function ProductCard({product}) {

  const {cartProducts, addToCart} = useContext(CartContext);
  const {likedProducts, addToLiked} = useContext(LikedContext);
  const [reviewsCount, setReviewsCount] = useState(0);
  
  const liked = likedProducts.find(itemId => itemId === product._id);
  const cart = cartProducts.find(itemId => itemId === product._id); 

  const rating = useCalcRating(product._id)

  useEffect(() => {
    axios.get(`/api/reviews?productId=${product._id}&count=true`).then(res => {
      setReviewsCount(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, [])
  
  
  return (
    <StyledCard href={`/product/${product._id}`}>
      {product.salePrice && (
        <div className="sale">sale</div>
      )}
      <Button $white $icon $size={'sm'} onClick={(event) => {
        event.preventDefault();
        addToLiked(product._id);
      }}>
        <HeartIcon liked={liked} />
      </Button>
      {product.images[0] ? (
        <Image src={product.images[0]} width={300} height={200} alt={product.title}/>
      ) : (
        <ProductIcon width={300} height={160}/>
      )}
      <h3>{product.properties["Brand"]} {product.title}</h3>
      {reviewsCount !== 0 && (
        <Rating>
          <div>
          {rating && (
            <>
              <StarIcon fill="#ffc107"/>
              <span>{rating}/5</span>
            </>
          )}
          </div>
          <span>{reviewsCount === 1 ? reviewsCount + " review" : reviewsCount + " reviews"} </span>
        </Rating>
      )}
      
      <div>
        
        <StyledPrice sale={product.salePrice}>{product.price}$</StyledPrice>
        {product.salePrice && (
          <StyledSalePrice>{product.salePrice}$</StyledSalePrice>
        )}
        <Button $white $icon onClick={(event) => {
          event.preventDefault();
          addToCart(product._id);
        }}>
          <CartIcon inCart={cart}/>
        </Button>
      </div>
      {/* <small>{product._id}</small> */}
    </StyledCard>
  )
}