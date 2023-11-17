import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import styled from "styled-components";
import Container from "./Container";
import CartIcon from "./icons/CartIcon";
import UserIcon from "./icons/UserIcon";
import { primary } from "@/lib/colors";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import SearchIcon from "./icons/SearchIcon";
import Button from "./Button";
import Search from "./Search";

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

export default function Header() {

  const {cartProducts} = useContext(CartContext);
  const [showSearch, setShowSearch] = useState(false);

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
              <Link href={"/account/"}><UserIcon/></Link>
              <Cart href={"/cart/"}>
                <CartIcon/>
                {cartProducts.length > 0 && (
                  <span>{cartProducts.length}</span>
                )}</Cart>
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