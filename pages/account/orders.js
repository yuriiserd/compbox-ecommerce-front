import AccountLayout from "@/components/AccountLayout";
import { green, primaryLight, red, url } from "@/lib/colors";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import statusColor from "@/lib/statusColor";

const StyledOrder = styled.div`
  border-radius: 0.5rem;
  border: 1px solid ${primaryLight};
  padding: 1rem;
  display: flex;
  margin-bottom: 1rem;
  gap: 1rem;
  div {
    width: 100%;
  }
  .info {
    width: 40%;
    h3 {
      margin-bottom: 1rem;
    }
  }
  .products {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
`
const OrderItem = styled.div`
  border-bottom: 1px solid ${primaryLight};
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  &:last-child {
    border-bottom: none;
  }
  .productinfo {
    width: 40%;
    a {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 0.9rem;
      text-decoration: none;
      color: ${url};
    }
  } 
  .total {
    width: 60%;
    display: flex;
    text-align: center;
    div:first-child {
      text-align: left;
    }
    div:last-child {
      text-align: right;
    }
  }
  
`
const Status = styled.span`
  padding: 0.1rem 0.5rem;
  border-radius: 0.3rem;
  display: inline-block;
  margin-bottom: 0.4rem;
`
const Total = styled.h3`
  margin-top: auto;
  margin-bottom: 0;
  text-align: right;
  span {
    font-size: 1rem;
    color: #797979;
  }
`


export default function OrdersPage() {
  
  const [orders, setOrders] = useState([]);
  const {data: session} = useSession();
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    if (session?.user) {
      axios.get('/api/orders?email=' + session?.user?.email).then(response => {
        setOrders(response.data);
        if (response.data.length === 0) {
          setNotFound(true);
        }
      })
    }
  }, [session])

  return (
    <AccountLayout>
      <h2>Orders</h2>
      <p></p>
      {orders.length > 0 && (
        <>
          {orders.map(order => {
            let total = 0;
            return (
              <StyledOrder key={order._id}>
                <div className="info">
                  <h3>Order Information</h3>
                  <p><Status style={{backgroundColor: statusColor[order.status]?.bg, color: statusColor[order.status]?.text}}>{order.status}</Status></p>
                  <p>{new Date(order.createdAt).toLocaleString()}</p>
                  {order.paid ? <p><b>Payment Status:</b> <span style={{color: green}}>Paid</span></p> : <p><b>Payment Status:</b> <span style={{color: red}}>Not Paid</span></p>}
                  <p><b>Order ID:</b> {order._id}</p>
                  <p><b>Name:</b> {order.name}</p>
                  <p><b>Email:</b> {order.email}</p>
                  <p><b>Adress:</b> {order.country}, {order.city}, {order.address}</p>
                  {order.coupon && (
                    <p><b>Coupon:</b> {order.coupon.name} - {order.coupon.percent_off}%</p>
                  )}
                </div>
                <div className="products">
                  <h3>Products</h3>
                  <div>
                    {order.product_items.map(product => {
                      const item = product.price_data.product_data;
                      total += product.price_data.unit_amount / 100 * product.quantity;
                      return (
                        <OrderItem key={item.id}>
                          <div className="productinfo">
                          <Link href={'/product/'+item.id}>
                            {item?.images && (
                              <Image src={item.images[0]} width={50} height={50} alt={item.name}/>
                            )}
                            {item.name}
                          </Link>
                          </div>
                          <div className="total">
                            <div>
                              <p>Price</p>
                              {product.price_data.unit_amount / 100}$
                            </div>
                            <div>
                              <p>Count</p>
                              {product.quantity}
                            </div>
                            <div>
                              <p>Total</p>
                              {product.price_data.unit_amount / 100 * product.quantity}$
                              
                            </div>
                          </div>
                        </OrderItem>
                      )
                    })}
                  </div>
                  {order.coupon ? (
                      <Total>
                        Total: <span>{total}$ - {order.coupon.percent_off}%</span> <br/> {total - total * order.coupon.percent_off / 100}$
                      </Total>
                    ) : (
                      <Total>
                        Total: {total}$
                      </Total>
                    )}
                </div>
              </StyledOrder>
            )
          })}
        </>
      )}
      {notFound && (
        <p>No orders found</p>
      )}
    </AccountLayout>
  )
}