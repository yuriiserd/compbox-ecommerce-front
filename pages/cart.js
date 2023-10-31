import Header from "@/components/Header"
import Container from "@/components/Container"
import styled from "styled-components"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/components/CartContext"
import axios from "axios"
import CartList from "@/components/CartList"
import OrderInfo from "@/components/OrderInfo"
import Footer from "@/components/Footer"

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 2rem;
  margin-top: 2rem;
  &>div {
    border: 1px solid #CCDBE4;
    border-radius: 1rem;
    box-shadow: 0px 14px 34px rgba(71, 82, 94, 0.2);
    padding: 1.5rem;
    h2 {
      margin-bottom: 20px;
    }
    input {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }
`
const Notice = styled.div`
  height: calc(100vh - 85px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

export default function CartPage() {

  const {cartProducts, clearCart} = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [w, setW] = useState({}); //window object

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post('/api/cart', {ids: cartProducts})
        .then(res => {
          setProducts(res.data);
        })
    } else {
      setProducts([]);
    }
    setW(window);
  }, [cartProducts])

  if (w.location?.href.includes('success')) {
    clearCart();
    return (
      <>
        <Header/>
        <Container>
          <Notice>
            <h2>Thanks for your order!</h2>
            <p>We will email you when your order will be sent.</p>
          </Notice>
        </Container>
        <Footer/>
      </>
    )
  }

  return (
    <>
      <Header/>
      <Container>
        {!cartProducts?.length && (
          <Notice>
            <h2>Your cart is empty</h2>
          </Notice>
        )}
        {!!products?.length && (
          <StyledRow>
            <div>
              <h2>Cart</h2>
              <CartList products={products} cart={cartProducts} />
            </div>
            <div>
              <h2>Order information</h2>
              <OrderInfo products={cartProducts}/>
            </div>
          </StyledRow>
        )}
        
      </Container>
      <Footer/>
    </>
  )
}
