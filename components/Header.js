import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import styled from "styled-components";
import Container from "./Container";
import CartIcon from "./icons/CartIcon";
import UserIcon from "./icons/UserIcon";
import { primary } from "@/lib/colors";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const StyledHeader = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ffffff;
  padding: 30px 0;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
`;
const StyledMargin = styled.div`
  height: 85px;
`
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  div {
    display: flex;
    gap: 10px;
    list-style: none;
  }
  a {
    text-decoration: none;
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
  span {
    position: absolute;
    top: -0.5rem;
    right: 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    background: ${primary};
    color: #fff
  }
`

export default function Header() {

  const {cartProducts} = useContext(CartContext);

  return (
    <>
      <StyledHeader>
        <Container>
          <Logo href={"/"} >
            <Image src={logo} width={150} height={60} alt="CompBox"/>
          </Logo>
          <StyledNav>
            <div>
              <Link href={"products/"}>Products</Link>
              <Link href={"categories/"}>Categories</Link>
            </div>
            <div>
              <Link href={"account/"}><UserIcon/></Link>
              <Cart href={"cart/"}>
                <CartIcon/>
                {cartProducts.length > 0 && (
                  <span>{cartProducts.length}</span>
                )}</Cart>
            </div>
          </StyledNav>
        </Container>
      </StyledHeader>
      <StyledMargin></StyledMargin>
    </>
    
  )
}