import Header from "@/components/Header"
import Container from "@/components/Container"
import styled from "styled-components"
import Button from "@/components/Button"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/components/CartContext"
import axios from "axios"
import CartList from "@/components/CartList"

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
      margin-bottom: 20px;
      width: 100%;
    }
  }
`

const TitleH2 = styled.h2`
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
`

export default function CartPage() {

  const {cartProducts} = useContext(CartContext);
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (cartProducts?.length > 0) {
      axios.post('/api/cart', {ids: cartProducts})
        .then(res => {
          setProducts(res.data);
        })
    }
  }, [cartProducts])

  return (
    <>
      <Header/>
      <Container>
        {!cartProducts?.length && (
          <TitleH2>Your cart is empty</TitleH2>
        )}
        {!!products?.length && (
          <StyledRow>
            <div>
              <h2>Cart</h2>
              <CartList products={products} />
            </div>
            <div>
              <h2>Order information</h2>
              <input type="text" placeholder="Address"/>
              <input type="text" placeholder="Address2"/>
              <Button>Continue to payment</Button>
            </div>
          </StyledRow>
        )}
        
      </Container>
    </>
  )
}
