import AccountLayout from "@/components/AccountLayout";
import { primaryLight } from "@/lib/colors";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledOrder = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${primaryLight};
  padding: 1rem;
  display: flex;
  margin-bottom: 1rem;
  div {
    width: 100%;
  }
  .info {
    width: 40%;
  }
  .products {
    width: 60%;
  }
`
const OrderItem = styled.div`
  border-radius: 0.5rem;
  border-bottom: 1px solid ${primaryLight};
  
`


export default function OrdersPage() {
  
  const [orders, setOrders] = useState([]);
  const {data: session} = useSession();
  const [notFound, setNotFound] = useState(false);
  
  
  useEffect(() => {
    if (session?.user) {
      axios.get('/api/orders?email=' + session?.user?.email).then(response => {
        setOrders(response.data);
      })
    }
  }, [session])

  return (
    <AccountLayout>
      <h2>Orders</h2>
      <p></p>
      {orders.length > 0 && (
        <>
          {/* {console.log(orders)} */}
          {orders.map(order => (
            <StyledOrder key={order.id}>
              <div className="info">
                <h3>Order Information</h3>
                <p>{new Date(order.createdAt).toLocaleString()}</p>
                {order.paid ? <p><b>Payment Status:</b> Paid</p> : <p><b>Payment Status:</b> Not Paid</p>}
                <p><b>Order ID:</b> {order._id}</p>
                <p><b>Name:</b> {order.name}</p>
                <p><b>Email:</b> {order.email}</p>
                <p><b>Adress:</b> {order.country}, {order.city}, {order.address}</p>
              </div>
              <div className="products">
                <h3>Products</h3>
                {order.product_items.map(product => {
                  console.log(product);
                  const item = product.price_data.product_data;
                  return (
                    <OrderItem>
                      <div className="productinfo">
                      <Link href={'/product/'+item.id}>
                        {item?.images && (
                          <Image src={item.images[0]} width={50} height={50}/>
                        )}
                        {product.quantity} x {item.name}
                      </Link>
                      </div>
                      <div>
                        <p></p>
                        {product.price_data.unit_amount / 100}$
                      </div>
                    </OrderItem>
                  )
                })}
              </div>
            </StyledOrder>
          ))}
        </>
      )}
      {notFound && (
        <p>No orders found</p>
      )}
    </AccountLayout>
  )
}