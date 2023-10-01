import styled from "styled-components"
import Button from "./Button"
import Input from "./Input"
import { useState } from "react"
import axios from "axios"


const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
`

export default function OrderInfo({products}) {

  const [orderInfo, setOrderInfo] = useState({})

  async function goToPayment() {
    console.log('test');
    const data = {...orderInfo, products}; 
    const response = await axios.post('/api/checkout', data);

    if (response.data.url) {
      window.location = response.data.url
    }
  }

  

  return (
    <>
      <div>
        <Input type="text" name="Name" onChange={(event) => setOrderInfo(info => {
          return {...info, name: event.target.value}
        })}/>
        <label>Name</label>
      </div>
      <div>
        <Input type="email" name="Email" onChange={(event) => setOrderInfo(info => {
          return {...info, email: event.target.value}
        })}/>
        <label>Email</label>
      </div>
      <Flex>
        <div>
          <Input type="text" name="City" onChange={(event) => setOrderInfo(info => {
          return {...info, city: event.target.value}
        })}/>
          <label>City</label>
        </div>
        <div>
          <Input type="text" name="Zip" onChange={(event) => setOrderInfo(info => {
          return {...info, zip: event.target.value}
        })}/>
          <label>ZiP code</label>
        </div>
      </Flex>
      <div>
        <Input type="text" name="Adress" onChange={(event) => setOrderInfo(info => {
          return {...info, adress: event.target.value}
        })}/>
        <label>Adress</label>
      </div>
      <div>
        <Input type="text" name="Country" onChange={(event) => setOrderInfo(info => {
          return {...info, country: event.target.value}
        })}/>
        <label>Country</label>
      </div>
      <Button onClick={() => goToPayment()}>Continue to payment</Button>
    </>
  )
}