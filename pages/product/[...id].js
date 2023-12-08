import Breadcrumbs from "@/components/Breadcrumbs";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Container from "@/components/Container";
import Header from "@/components/Header";
import ImageGallary from "@/components/ImageGallary";
import { LikedContext } from "@/components/LikedContext";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import CartIcon from "@/components/icons/CartIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext, useState } from "react";
import styled from "styled-components";
import Layout from "@/components/Layout";
import ReviewForm from "@/components/ReviewFrom";


const Row = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
  & > div {
    width: 50%;
  } 
  hr {
    margin-bottom: 2rem;
    border: none;
    border-bottom: 1px solid #CCDBE4;
  }
  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`
const ProductInfo = styled.div`
  b {
    font-size: 1.4rem;
    margin-bottom: 1rem;
    display: inline-block;
  }
  button {
    margin-bottom: 2rem;
  }
  h3, p {
    margin-bottom: 1rem;
  }


`
const Description = styled.p`
  position: relative;
  span{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, #ffffff 100%);
    height: 2.5rem;
    width: 100%;
  }
  button {
    border: none;
    position: absolute;
    right: 0;
    bottom: -5px;
    margin-bottom: 0;
    background: #ffffff;
    cursor: pointer;
    padding: 5px 10px;
    z-index: 3;
  }
`
const Sale = styled.b`
  color: #f84147;
  span {
    position: relative;
    opacity: 0.5;
    font-size: 1.2rem;
    margin-right: 1rem;
    color: #000000;
    &::before {
      background-color: black;
      content: "";
      position: absolute;
      right: 0;
      left: 0;
      top: 50%;
      height: 0.1rem;
      transform: translateY(-50%) rotate(-15deg);
      transform-origin: center;
    }
  }
`
const Properties = styled.ul`
  margin-bottom: 1.5rem;
  li {
    width: 100%;
    display: flex;
    gap: 15px;
    margin-bottom: 1rem;
    div {
      width: 50%;
      span {
        background: #ffffff;
        display: inline-block;
        position: relative;
        z-index: 3;
        padding-right: 15px;
      }
      &:first-child {
        position: relative;
        display: inline-block;
        z-index: 2;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 4px;
          width: 100%;
          border-bottom: 1px dotted #d2d2d2;
        }
      }
    }
  }
`
const Reviews = styled.div`
  margin-bottom: 2rem;
`

export default function ProductPage({product}) {


 
  
  const {cartProducts, addToCart} = useContext(CartContext);
  const {likedProducts, addToLiked} = useContext(LikedContext);
  const [contentHidden, setContentHidden] = useState(true);

  const liked = likedProducts.find(itemId => itemId === product._id);
  const cart = cartProducts.find(itemId => itemId === product._id);
  
  return (
    <Layout>
      <Breadcrumbs product={product}/>
      <Row>
        <div>
          <ImageGallary images={product.images}/>
          <hr/>
          <Title>Reviews</Title>
          <Reviews>
            <ReviewForm productId={product._id}/>
            <p>There are no reviews yet.</p>
          </Reviews>
        </div>
        <ProductInfo>
          <Title>{product.properties["Brand"]} {product.title}</Title>

          {product.salePrice && (
            <Sale><span>${product.price}</span>${product.salePrice}</Sale>
          )}
          {!product.salePrice && (
            <b>${product.price}</b>
          )}
          
          <div>
            <Button $size={'md'} onClick={(event) => {
              event.preventDefault();
              addToCart(product._id);
            }}>
              <CartIcon inCart={cart} color={"#ffffff"}/> Add to Cart
            </Button>
            <Button $white $icon $size={'md'} onClick={() => {
              addToLiked(product._id);
            }}>
              <HeartIcon liked={liked}/>
            </Button>
          </div>
          <hr/>
          <Properties>
            {/* {product.properties.map(property => )} */}
            {Object.keys(product.properties).map(property => (
              <li key={property}>
                <div><span>{property}</span></div>
                <div>{product.properties[property]}</div>
              </li>
            ))}
          </Properties>
          {!!Object.keys(product.properties).length && (
            <hr/>
          )}
          <Description>
            {product.description}
            {contentHidden && (
              <>
                <span></span>
                <button onClick={() => setContentHidden(false)}>read more</button>
              </>
            )}

          </Description>
          {!contentHidden && (
            <div dangerouslySetInnerHTML={{ __html: product.content }} />
          )}
        </ProductInfo>
      </Row>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const id = context.query.id;
  const product = await Product.findOne({_id: id})
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}