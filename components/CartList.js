import styled, {css} from "styled-components"
import DeleteIcon from "./icons/DeleteIcon"
import Image from "next/image"
import Button from "./Button"
import { useContext, useState } from "react"
import { CartContext } from "./CartContext"
import ProductIcon from "./icons/ProductIcon"

export default function CartList({products, cart}) {

  const {addToCart, removeItemFromCart, removeProduct} = useContext(CartContext);

  let totalPrice = 0;

  const RowSize = css`
    display: grid;
    grid-template-columns: 1.25fr 0.3fr 0.3fr 0.15fr;
    gap: 10px;
    text-align: right;
    padding: 0.5rem 0.5rem 0.5rem 0;
    div:first-child {
      text-align: left;
    }
  `

  const Head = styled.div`
    ${RowSize}
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #CCDBE4;
    text-transform: uppercase;
    font-size: 0.9rem;
  `

  const Bottom = styled.div`
    ${RowSize}
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #CCDBE4;
  `

  const Item = styled.div`
    ${RowSize}
    background: #ffffff;
    border-radius: 1rem;
    min-height: 90px;
    /* transition: 0.2s; */
    &:hover {
      background: #CCDBE4;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
    }
    div:first-child {
      justify-content: flex-start;
    }
    svg {
      width: 25px;
    }
    img {
      padding: 0 10px;
    }
    button {
      margin: 0 auto;
    }
  `
  const StyledQuantity = styled.div`
    border-radius: 50px;
    border: 1px solid rgba(135, 147, 176, 0.50);
    padding: 2px 0;
    display: flex;
    justify-content: space-between;
    background: #fff;
    button {
      border: none;
      /* border: 1px solid black; */
      background: none;
      font-size: 1.2rem;
      cursor: pointer;
      border-radius: 50px;
    }
    button:first-child {
      margin-right: auto;
      padding-right: 1rem;
      padding-left: 0.4rem;
    }
    button:last-child {
      margin-left: auto;
      padding-left: 1rem;
      padding-right: 0.4rem;
    }
  `
  const DefaultThumbnail = styled.div`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 90px;
    svg {
      width: 100%;
      scale: 2.5;
    }
  `
  function increaseQuantity(id) {
    addToCart(id);
  }
  function decreaseQuantity(id) {
    removeItemFromCart(id);
  }

  return (
    <>
      <Head>
        <div>Product</div>
        <div>Quantity</div>
        <div>Price</div>
        <div></div>
      </Head>
      {products.map(product => {
        const productQuantity = cart.filter(id => id === product._id).length;
        const total = product.salePrice ? product.salePrice * productQuantity : product.price * productQuantity;
        totalPrice = totalPrice + total;
        return (
          <Item key={product._id}>
            <div>
              
              {product.images[0] ? (
                <Image src={product.images[0]} width={90} height={90} alt={product.title}/>
              ) : (
                <DefaultThumbnail>
                  <ProductIcon width={90} height={90}/>
                </DefaultThumbnail>
              )}
              <h3>{product.title}</h3>
            </div>
            <div>
              <StyledQuantity>
                <button onClick={() => decreaseQuantity(product._id)}>-</button>
                {productQuantity}
                <button onClick={() => increaseQuantity(product._id)}>+</button>
              </StyledQuantity>
            </div>
            <div>
              ${total}
            </div>
            <div>
              <Button $white $icon onClick={() => removeProduct(product._id)}>
                <DeleteIcon/>
              </Button>
            </div>
          </Item>
        )
      })}
      <Bottom>
        <div></div>
        <div>Total</div>
        <div>${totalPrice}</div>
        <div></div>
      </Bottom>
    </>
  )
}