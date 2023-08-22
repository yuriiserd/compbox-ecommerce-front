import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import styled from "styled-components";
import Container from "./Container";

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
`;
const Logo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default function Header() {
  return (
    <StyledHeader>
      <Container>
        <Logo href={"/"} >
          <Image src={logo} width={202} height={34} alt="CompHub"/>
        </Logo>
        <StyledNav>
          <div>
            <Link href={"products/"}>Products</Link>
            <Link href={"categories/"}>Categories</Link>
          </div>
          <div>
            <Link href={"account/"}>Account</Link>
            <Link href={"cart/"}>Cart (0)</Link>
          </div>
        </StyledNav>
      </Container>
    </StyledHeader>
  )
}