import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import styled from "styled-components";
import Container from "./Container";
import CartIcon from "./icons/CartIcon";
import UserIcon from "./icons/UserIcon";
import { primary, primaryLight } from "@/lib/colors";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import SearchIcon from "./icons/SearchIcon";
import Button from "./Button";
import Search from "./Search";
import { signIn, signOut, useSession } from "next-auth/react";
import LogoutIcon from "./icons/LogoutIcon";

const StyledHeader = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ffffff;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  &>div {
    padding: 30px 0;
  }
`;
const StyledMargin = styled.div`
  height: 85px;
`
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  div {
    display: flex;
    gap: 1rem;
    list-style: none;
    align-items: center;
    button {
      margin-right: 0;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
    }
  }
  a {
    text-decoration: none;
    font-weight: 600;
    color: #444444;
    img {
      border-radius: 30px;
    }
  }
  svg {
    width: 20px;
    height: 20px;   
    margin-left: 10px;
    margin-right: 10px; 
    
  }
`;
const Logo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const Cart = styled(Link)`
  position: relative;
  span {
    position: absolute;
    top: -0.5rem;
    right: 0;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    background: ${primary};
    color: #fff;
    font-weight: 400;
  }
`
const SearchOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
`
const Profile = styled.div`
  position: relative;
  margin: 0 10px;
  button {
    margin-right: 0;
    cursor: pointer;
    position: absolute;
    background-color: #fff !important;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.1s ease-in-out;
    box-shadow: 0px 5px 10px rgba(71, 82, 94, 0.1);
    border: 1px solid ${primaryLight} !important;
    top: 100%;
    right: -1rem;
    background: #fff;
    border-radius: 0.5rem;
    display: flex;
    padding: 0.5rem 1rem 0.5rem 0.1rem !important;
  }
  &:hover button {
    opacity: 1;
    visibility: visible;
  }
`;
const LoginModal = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  transition: opacity 0.1s ease-in-out;
  box-shadow: 0px 5px 10px rgba(71, 82, 94, 0.1);
  border: 1px solid ${primaryLight} !important;
  background-color: #fff;
  padding: 2rem 1rem;
  div {
    button {
      padding: 0.5rem 1rem;
    }
    button:first-child {
      background-color: #3B5999;
    }
    button:last-child {
      background-color: #CB4023;
    }
  }
`

export default function Header() {

  const {cartProducts} = useContext(CartContext);
  const [showSearch, setShowSearch] = useState(false);
  const {data: session} = useSession();
  const [loginModal, setLoginModal] = useState(false);
  
  async function login(provider) {
    await signIn(provider, {callbackUrl: '/account'});
  }
  async function logout() {
    await signOut({callbackUrl: '/account'});
  }

  return (
    <>
      <StyledHeader>
        <Container>
          <Logo href={"/"} >
            <Image src={logo} width={150} height={60} alt="CompBox"/>
          </Logo>
          <StyledNav>
            <div>
              <Link href={"/products/"}>New Products</Link>
              <Link href={"/categories/"}>Categories</Link>
            </div>
            <div>
              <button onClick={() => setShowSearch(!showSearch)}>
                <SearchIcon/>
              </button>
              <Cart href={"/cart/"}>
                <CartIcon/>
                {cartProducts.length > 0 && (
                  <span>{cartProducts.length}</span>
                )}</Cart>
              {session ? (
                <Profile>
                  <Link href={"/account/"}><Image src={session?.user?.image} width={30} height={30} alt={session?.user?.name}/></Link>
                  <button onClick={logout}>
                    <LogoutIcon/>
                    Logout
                  </button>
                </Profile>
              ) : (
                <>
                  <button onClick={() => setLoginModal(true)}><UserIcon/></button>
                  {loginModal && (
                    <LoginModal>
                      <p>Login with:</p>
                      <div>
                        <Button onClick={() => login('facebook')}>Facebook</Button>
                        <Button onClick={() => login('google')}>Google</Button>
                      </div>
                    </LoginModal>
                  )}
                </>
              )}
              
            </div>
          </StyledNav>
          {showSearch && <Search focus/>}
          {showSearch && <SearchOverlay onClick={() => setShowSearch(false)}></SearchOverlay>} {/* SearchOverlay close search if click target is not search */}
        </Container>
      </StyledHeader>
      <StyledMargin></StyledMargin> {/* dont delete - use for mrgin because header if fixed  */}
    </>
    
  )
}