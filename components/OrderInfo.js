import styled from "styled-components"
import Button from "./Button"
import Input from "./Input"
import { useEffect, useState } from "react"
import axios from "axios"
import { useSession } from "next-auth/react"


const Flex = styled.div`
  display: flex;
  gap: 0.7rem;
`

export default function OrderInfo({products, coupon}) {

  const [orderInfo, setOrderInfo] = useState({})

  const {data: session} = useSession();
  

  async function goToPayment() {
    const data = {...orderInfo, products, coupon}; 
    const response = await axios.post('/api/checkout', data);
    if (response.data.url) {
      window.location = response.data.url
    }
  }

  useEffect(() => {
    if (session?.user) {
      axios.get('/api/customer?email=' + session?.user?.email).then(response => {
        const order = response.data;
        setOrderInfo({
          name: order.name,
          email: order.email,
          phone: order.phone,
          city: order.city,
          zip: order.zip,
          address: order.address,
          country: order.country
        });
      })
    }
  }, [])

  
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      goToPayment();
    }}>
      <div>
        <Input placeholder=" " type="text" name="Name" required onChange={(event) => setOrderInfo(info => {
          return {...info, name: event.target.value}
        })}
        value={orderInfo.name || ''}/>
        <label>Name *</label>
      </div>
      <div>
        <Input placeholder=" " type="text" name="Phone" required onChange={(event) => setOrderInfo(info => {
          return {...info, phone: event.target.value}
        })}
        value={orderInfo.phone || ''}/>
        <label>Phone *</label>
      </div>
      <div>
        <Input placeholder=" " type="email" name="Email" required onChange={(event) => setOrderInfo(info => {
          return {...info, email: event.target.value}
        })}
        disabled={session?.user?.email}
        value={orderInfo.email || ''}/>
        <label>Email *</label>
      </div>
      <Flex>
        <div>
          <Input placeholder=" " type="text" name="City" onChange={(event) => setOrderInfo(info => {
            return {...info, city: event.target.value}
          })}
          value={orderInfo.city || ''}/>
          <label>City</label>
        </div>
        <div>
          <Input placeholder=" " type="text" name="Zip" onChange={(event) => setOrderInfo(info => {
            return {...info, zip: event.target.value}
          })}
          value={orderInfo.zip || ''}/>
          <label>ZiP code</label>
        </div>
      </Flex>
      <div>
        <Input placeholder=" " type="text" name="Address" onChange={(event) => setOrderInfo(info => {
          return {...info, address: event.target.value}
        })}
        value={orderInfo.address || ''}/>
        <label>Adress</label>
      </div>
      <div>
        <Input placeholder=" " type="text" name="Country" onChange={(event) => setOrderInfo(info => {
          return {...info, country: event.target.value}
        })}
        value={orderInfo.country || ''}/>
        <label>Country</label>
      </div>
      <Button type="submit">Continue to payment</Button>
    </form>
  )
}