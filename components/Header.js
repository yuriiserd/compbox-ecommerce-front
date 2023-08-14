import Image from "next/image";
import Link from "next/link";
import logoText from "@/public/logo-text.svg";
import { styled } from "styled-components";
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
`;
const Logo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #444444;
`;
const StyledList = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Container>
        <Logo href={"/"} >
          <Image src={logoText} width={202} height={34} alt="CompHub"/>
        </Logo>
        <StyledNav>
          <StyledList>
            <li><StyledLink href={"products/"}>Products</StyledLink></li>
            <li><StyledLink href={"categories/"}>Categories</StyledLink></li>
          </StyledList>
          <StyledList>
            <li><StyledLink href={"account/"}>Account</StyledLink></li>
            <li><StyledLink href={"cart/"}>Cart (0)</StyledLink></li>
          </StyledList>
        </StyledNav>
      </Container>
    </StyledHeader>
  )
}