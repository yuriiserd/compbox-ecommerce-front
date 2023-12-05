import styled, {css} from "styled-components"
import DeleteIcon from "./icons/DeleteIcon"
import Image from "next/image"
import Button from "./Button"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "./CartContext"
import ProductIcon from "./icons/ProductIcon"
import Link from "next/link"
import { red, url } from "@/lib/colors"
import axios from "axios"
import { set } from "mongoose"

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
  grid-template-columns: 1.05fr 0.5fr 0.45fr;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #CCDBE4;
  
  &.totalProduct b{
    font-size: 1.1rem;
    font-weight: bold;
  }
  .oldPrice {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    gap: 0.3rem;
    align-items: center;
    span{
      font-size: 1.1rem;
      font-weight: bold;
      display: inline-block ;
      color: #787878;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%) rotate(-10deg);
        height: 2px;
        width: 100%;
        background: #787878;
      }
    }
    div {
      font-size: 1rem;
      color: ${red};
    
    }
  }
  &.totalPrice b{
    font-size: 1.4rem;
    font-weight: bold;
    display: block;
    color: ${red};
  }
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
  h3 {
    text-align: left;
  }
  a,
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
  }
  a:first-child {
    justify-content: flex-start;
    color: #000;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
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
const CouponBtn = styled.button`
  border: none;
  background: none;
  text-decoration: none;
  display: flex;
  color: ${url};
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
`
const CouponInput = styled.div`
  position: relative;
  display: flex;
  max-width: 300px;
  input {
    border: 1px solid #CCDBE4;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
  button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    bottom: 0;
    border: none;
    background: none;
    text-decoration: none;
    display: flex;
    color: ${url};
    align-items: center;
    font-size: 1rem;
    max-width: 100px;
    cursor: pointer;
    justify-content: center;
  }
`

export default function CartList({products, cart, setCoupon}) {

  const {addToCart, removeItemFromCart, removeProduct} = useContext(CartContext);
  const [couponCode, setCouponCode] = useState('');
  const [enterCoupon, setEnterCoupon] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [couponDoc, setCouponDoc] = useState(null);

  useEffect(() => {
    calculateTotalPrice()
  }, [products, couponDoc])
  
  function calculateTotalPrice() {
    let total = 0;
    products.forEach(product => {
      const productQuantity = cart.filter(id => id === product._id).length;
      const totalProductPrice = product.salePrice ? product.salePrice * productQuantity : product.price * productQuantity;
      total += totalProductPrice;
    })
    setProductTotalPrice(total);
    if (couponDoc) {
      total = total - (total * couponDoc.percent_off / 100);
      
    }
    setTotalPrice(total);
  }
  function increaseQuantity(id) {
    addToCart(id);
  }
  function decreaseQuantity(id) {
    removeItemFromCart(id);
  }
  async function getCoupon() {
    const coupon = await axios.get('/api/coupon?name=' + couponCode);
    console.log(coupon.data)
    setCoupon(coupon.data);
    setCouponDoc(coupon.data);
    setCouponCode('');
    setEnterCoupon(false);
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
        return (
          <Item key={product._id}>
            <Link href={'/product/'+product._id}>
              
              {product.images[0] ? (
                <Image src={product.images[0]} width={90} height={90} alt={product.title}/>
              ) : (
                <DefaultThumbnail>
                  <ProductIcon width={90} height={90}/>
                </DefaultThumbnail>
              )}
              <h3>{product.title}</h3>
            </Link>
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
      <Bottom className={couponDoc ? "totalProduct" : "totalPrice"}>
        <div>
          {enterCoupon ? (
            <CouponInput>
              <input type="text" value={couponCode} onChange={e => setCouponCode(e.target.value)}/>
              <button onClick={getCoupon}>Apply</button>
            </CouponInput>
          ) : (
            <CouponBtn onClick={() => setEnterCoupon(true)}>Enter Coupon Code</CouponBtn>
          )}

        </div>
        <div>{couponDoc ? "Products Total" : "Total"}</div>
        <div><b>${productTotalPrice}</b></div>
        <div></div>
      </Bottom>
      {couponDoc && (
        <Bottom className="totalPrice">
          <div></div>
          <div>Total</div>
          <div>
            <div className="oldPrice">
              <span>${productTotalPrice}</span>
              <div> - {couponDoc.percent_off}%</div>
            </div>
            <b>${totalPrice}</b>
          </div>
          <div></div>
        </Bottom>
      )}
      
    </>
  )
}