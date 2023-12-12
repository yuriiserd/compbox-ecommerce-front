import AccountLayout from "@/components/AccountLayout";
import ButtonLink from "@/components/ButtonLink";
import { primaryLight, url } from "@/lib/colors";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import statusColor from "@/lib/statusColor";

const Main = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  p {
    margin-bottom: 0.4rem;
  }
  a {
    margin-top: 1rem;
    display: inline-block;
    color: ${url};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  h3 {
    margin-bottom: 0.6rem;
  }
`
const OrderItem = styled.div`
  border: 1px solid ${primaryLight};
  padding: 1rem 1rem 0.5rem;
  border-radius: 0.5rem;
`
const Status = styled.span`
  padding: 0.1rem 0.5rem;
  border-radius: 0.3rem;
  display: inline-block;
  margin-bottom: 0.4rem;
`
const Flex = styled.div`
  display: flex;
  gap: 0.5rem;
`

export default function AccountPage() {
  
  const [accountInfo, setAccountInfo] = useState(false);
  const [order, setOrder] = useState(false);


  const {data: session} = useSession();

  useEffect(() => {
    if (session?.user) {
      axios.get('/api/customer?email=' + session?.user?.email).then(response => {
        setAccountInfo(response.data);
        if (!response.data) {
          //create customer
          axios.post('/api/customer', {
            name: session?.user?.name,
            email: session?.user?.email,
            image: session?.user?.image,
            orders: [],
            likedProducts: [],
          }).then(response => {
            setAccountInfo(response.data);
          })
        }
      })
      axios.get('/api/orders?email=' + session?.user?.email).then(response => {
        if (response.data.length !== 0) {
          setOrder(response.data[0])
        }
      })
    }
  }, [session])

  return (
    <AccountLayout>
      <h2>Account Details</h2>
      <p>Logged in as {accountInfo?.name ? accountInfo?.name : session?.user?.name}</p>
      <Main>
        <div>
          
          <h3>Info</h3>
          <p><b>Email:</b>  {accountInfo?.email}</p>
          {accountInfo?.phone && (
            <p><b>Phone:</b>  {accountInfo?.phone}</p>
          )}
          {accountInfo?.country && accountInfo?.city && accountInfo?.address && (
             <p><b>Address:</b>  {accountInfo?.country}, {accountInfo?.city}, {accountInfo?.address}</p>
          )}
          <Link href="/account/settings" $white>Edit</Link>
        </div>
        <div>
          <h3>Orders</h3>
          {order ? (
            <>
              <OrderItem>
                <Flex>
                  <p><Status style={{backgroundColor: statusColor[order.status]?.bg, color: statusColor[order.status]?.text}}>{order.status}</Status></p>
                  <p style={{marginLeft: 'auto'}}>{new Date(order.createdAt).toLocaleString()}</p>
                </Flex>
                <p><b>Order ID:</b> {order._id}</p>

              </OrderItem>
              <Link href={`/account/orders`} $white>View Orders</Link>
            </>
          ) : (
            <p>You have no orders</p>
          )}
        </div>
      </Main>
      
    </AccountLayout>
  )
}