import Button from "@/components/Button";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { primary, primaryLight, url } from "@/lib/colors";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import UserIcon from "./icons/UserIcon";
import SettingsIcon from "./icons/SettingsIcon";
import OrdersIcon from "./icons/OrdersIcon";
import LogoutIcon from "./icons/LogoutIcon";
import HeartIcon from "./icons/HeartIcon";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
`;
const Navigation = styled.nav`
  width: 20%;
  min-width: 200px;
  border: 1px solid  ${primaryLight};
  padding: 2rem 1rem 2rem 2rem;
  border-radius: 1rem;
  position: sticky;
  top: 7rem;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  a {
    color: inherit;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: gap 0.1s ease-in-out;
    padding: 0.5rem 0;
    &:hover {
      gap: 1rem;
    }
    svg {
      max-width: 20px;
    }
  }
  button {
    background: none;
    border: none;
    cursor: pointer;
    font: inherit;
    padding: 0;
    text-align: left;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: gap 0.1s ease-in-out;
    padding: 0.5rem 0;
    &:hover {
      gap: 1rem;
    }
    
    svg {
      max-width: 20px;
    }
  }
`;
const Content = styled.div`
  width: 80%;
  h2 {
    color: ${primary};
    margin-bottom: 1rem;
  }
`;

export default function AccountLayout(props) {
  const {data: session} = useSession();
  const router = useRouter();

  function logout() {
    signOut({callbackUrl: '/'});
  }

  useEffect(() => {
    if (session?.expires && session?.expires < Date.now() / 1000) {
      router.push("/");
    }
  }, [session]);



  return (
    <>
      <Header/>
      <Container>
        <Title>Account</Title>
        <Row>
          <Navigation>
            <ul>
              <li>
                <Link href="/account">
                  <UserIcon/>
                  Account</Link>
              </li>
              <li>
                <Link href="/account/orders">
                  <OrdersIcon/>
                  Orders</Link>
              </li>
              <li>
                <Link href="/account/liked">
                  <HeartIcon/>
                  Liked</Link>
              </li>
              <li>
                <Link href="/account/settings">
                  <SettingsIcon/>
                  Settings</Link>
              </li>
              <li>
                <button onClick={logout}>
                  <LogoutIcon/>
                  Logout</button>
              </li>
            </ul>
          </Navigation>
          <Content>
            {props.children}
          </Content>
        </Row>
      </Container>
      <Footer/>
    </>
  )
}