import { primary } from "@/lib/colors";
import Container from "./Container";
import styled from "styled-components";
import Link from "next/link";
import github from "@/public/github.gif"
import linkedin from "@/public/linkedin.gif"
import Image from "next/image";

const StyledFooter = styled.footer`
  margin-top: auto;
  &>div {
    background: linear-gradient(30deg, #2D1E1E 0%, #0A0A0A 100%);
    color: #fff;
    padding: 50px 0px;
    margin-top: 70px;
  }
  h3 {
    margin-bottom: 1rem;
  }
  ul {
    list-style: none;
    li {
      margin-bottom: 0.5rem;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  hr {
    border: none;
    border-bottom: 1px solid #fff;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`
const Col = styled.div`
  width: 25%;
`
const Row = styled.div`
  display: flex;
`
const Social = styled.ul`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`

export default function Footer() {
  return (
    <StyledFooter>
      <div>
        <Container>
          <Row>
            <Col>
              <h3>Categories</h3>
              <ul>
                <li><Link href={'/'}>Computers</Link></li>
                <li><Link href={'/'}>Camera & Photo</Link></li>
                <li><Link href={'/'}>Television & Video</Link></li>
                <li><Link href={'/'}>Smartphones</Link></li>
                <li><Link href={'/'}>Audio</Link></li>
              </ul>
            </Col>
            <Col>
              <h3>Info</h3>
              <ul>
                <li><Link href={'/'}>About</Link></li>
                <li><Link href={'/'}>Contact</Link></li>
                <li><Link href={'/'}>Blog</Link></li>
                <li><Link href={'/'}>Privacy Policy</Link></li>
                <li><Link href={'/'}>Terms ans Conditions</Link></li>
              </ul>
            </Col>
            <Col>
            </Col>
            <Col>
              <Social>
                <li><Link href={'https://github.com/yuriiserd'} target="_blank"><Image src={github} width={40} height={40} alt="github"/></Link></li>
                <li><Link href={'https://www.linkedin.com/in/yura-serduchenko-01420b1b0/'} target="_blank"><Image src={linkedin} width={40} height={40} alt="linkedin"/></Link></li>
              </Social>
            </Col>
          </Row>
          <hr/>
          <p>&#169;{new Date().getFullYear()} CompBox. All Rights Reserved.</p>
        </Container>
      </div>
    </StyledFooter>
  )
}