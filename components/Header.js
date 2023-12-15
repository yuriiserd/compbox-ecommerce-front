import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.svg";
import styled, { css } from "styled-components";
import Container from "./Container";
import CartIcon from "./icons/CartIcon";
import UserIcon from "./icons/UserIcon";
import { primary, primaryLight } from "@/lib/colors";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "./CartContext";
import SearchIcon from "./icons/SearchIcon";
import Button from "./Button";
import Search from "./Search";
import { signIn, signOut, useSession } from "next-auth/react";
import LogoutIcon from "./icons/LogoutIcon";
import HeartIcon from "./icons/HeartIcon";
import bcrypt from "bcryptjs";
import axios from "axios";
import useWindowWidth from "@/hooks/useWindowWidth";

const StyledHeader = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #ffffff;
  position: fixed;
  z-index: 1001;
  top: 0;
  left: 0;
  width: 100%;
  &>div {
    padding: 30px 0;
  }
  @media (max-width: 768px) {
    padding: 0.5rem 0;
    &>div {
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const Logo = styled(Link)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    transform: translate(0%);
    width: 110px;
  }
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
  @media (max-width: 768px) {
    padding-right: 0.5rem;
    span {
      width: 1.2rem;
      height: 1.2rem;
      font-size: 0.8rem;
    }
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
  @media (max-width: 768px) {
    margin-right: 0;
    img {
      width: 40px;
      height: 40px;
    }
    button {
      visibility: visible;
      opacity: 1;
      border: none !important;
      display: flex;
      top: calc(-100% - 1rem);
      font-weight: 600;
      color: #444444;
      font-size: 1rem;
      align-items: center;
      box-shadow: none !important;
      padding-right: 0 !important;
      right: 0;
      
    }
  }
`
const modal = css`
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
  padding: 1rem 1.5rem;
  z-index: 101;
  max-width: 250px;
  @media (max-width: 768px) {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    min-width: 250px;
    padding: 1rem 2rem;
  }
  div.social {
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
  p {
    max-width: 90%;
    text-align: center;
    font-size: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    input {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      font-size: 1rem;
      width: 100%;
      &[type="password"] {
        letter-spacing: 0.25rem;
      }
      &[type="password"]::placeholder {
        letter-spacing: initial;
      }
    }
    button {
      margin-top: 0.5rem;
      border: 1px solid ${primary};
      padding: 0.5rem 1.5rem;
      display: inline-block
    }
  }
  button {
    font-size: 1rem;
  }
`
const LoginModal = styled.div`
  ${modal}
`
const RegisterModal = styled.div`
  ${modal};
`
const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  @media (max-width: 768px) {
    background: rgba(0,0,0,0.5);
    
  }
`
const Error = styled.div`
  background-color: #FEE2E2;
  border: 1px solid #FCA5A5;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  justify-content: center;
  margin-top: 0.5rem;
  p {
    color: #C53030;
    font-size: 0.8rem;
    width: 100%;
  }
`
const HamburgerMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: relative;
    z-index: 101;
    width: 30px;
    height: 22px;
    cursor: pointer;
    span {
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #444;
        left: 0;
        transition: all 0.3s;
        &:nth-child(1) {
          top: 0;
        }
        &:nth-child(2) {
          opacity: 1;
          top: 50%;
          transform: translateY(-50%);
        }
        &:nth-child(3) {
          bottom: 0;
        }
      }
    &.active {
      span {
        &:nth-child(1) {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }
        &:nth-child(2) {
          opacity: 0;
          transform: translate(-100%, -50%);
        }
        &:nth-child(3) {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      }
    }
    
  }
`
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  box-sizing: border-box;
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
  @media (max-width: 768px) {
    justify-content: space-between;
    position: absolute;
    padding: 5rem 1rem 1rem;
    top: 0;
    width: auto;
    right: -100%;  
    height: 100vh;
    margin-right: -1rem;
    display: flex;
    flex-direction: column;
    align-items: end;
    background: #fff;
    z-index: 100;
    transition: all 0.5s;
    box-shadow: 0px 5px 10px rgba(71, 82, 94, 0.1);
    div:first-child {
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
      margin-bottom: 2rem;
    }
    div:last-child {
      position: sticky;
      bottom: 1rem;
      svg {
        width: 25px;
        height: 25px;
      }
    }
    &.active {
      right: 0;
    }
  }
`
const MobileMenu = styled.div`
  display: none;
  align-items: center;
  gap: 2.5rem;
  svg {
    width: 25px;
    height: 25px;
    color: #444444;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`


export default function Header() {

  const {cartProducts} = useContext(CartContext);
  const [showSearch, setShowSearch] = useState(false);
  const {data: session} = useSession();
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [loginMessage, setLoginMessage] = useState('Sign in to your account');
  const [error, setError] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);

  const mobile = useWindowWidth() < 768;

  const headerRef = useRef(null); // for sticky header
  const mobileMenu = useRef(null); // for mobile menu
  const hamburgerRef = useRef(null); // for hamburger menu
  
  async function login(provider) {
    await signIn(provider, {callbackUrl: '/account'});
  }
  async function logout() {
    await signOut({callbackUrl: '/'});
  }
  async function handleLogin(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
      acknowledged: true,
    }
    const result = await signIn('credentials', body);
    if (result?.error) {
      console.log(result.error);
      setError(result.error);
    } else {
      setLoginModal(false);
      setError('');
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(data.get('password'), salt);
    const body = {
      newUser: true,
      name: data.get('username'),
      email: data.get('email'),
      password,
      orders: [], 
      likedProducts: [],
      image: "https://scontent.fifo5-1.fna.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=c15.0.50.50a_cp0_dst-jpg_p50x50&_nc_cat=1&ccb=1-7&_nc_sid=810bd0&_nc_ohc=mnbLMYH6n8gAX8aASn5&_nc_ht=scontent.fifo5-1.fna&edm=AP4hL3IEAAAA&oh=00_AfA5KS3an71MRWrQdoL5dMzFokh1uXWChCEGDZZb91VySA&oe=658BB359",
    }
    console.log(body)
    await axios.post('/api/customer', body).then((res) => {
      if (res.status === 200) {
        setRegisterModal(false);
        setLoginModal(true);
        setLoginMessage('Register successfully! Please login to continue');
      }
    });
  }

  useEffect(() => {
    setHeaderHeight(headerRef.current?.offsetHeight || 95);
  }, []);
  //set margin height base on header height
  const StyledMargin = styled.div`
    height: ${headerHeight}px;
  `

  return (
    <>
      <StyledHeader ref={headerRef}>
        <Container>
          <Logo href={"/"} >
            <Image src={logo} width={150} height={60} alt="CompBox"/>
          </Logo>
          <StyledNav ref={mobileMenu}>
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
                )}
              </Cart>
              <Link href={session?.user ? "/account/liked/" : "/liked/"}><HeartIcon/></Link>
              {session ? (
                <Profile className="profile">
                  <Link href={"/account/"}><Image src={session?.user?.image} width={30} height={30} alt={session?.user?.name}/></Link>
                  <button onClick={logout}>
                    <LogoutIcon/>
                    Logout
                  </button>
                </Profile>
              ) : (
                <>
                  <button onClick={() => setLoginModal(true)}><UserIcon/></button>
                  {loginModal && !registerModal && (
                    <>
                      <LoginModal>
                        <p>{loginMessage}</p>
                        <form  onSubmit={(event) => handleLogin(event)}>
                          <input type="text" name="email" placeholder="Email" />
                          <input type="password" name="password" placeholder="Password" />
                          {error && (
                            <Error>
                              <p>{error}</p>
                            </Error>
                          )}
                          <Button $white type="submit">Sign in</Button>
                        </form>
                        <p>or Sign in with:</p>
                        <div className="social">
                          <Button onClick={() => login('facebook')}>Facebook</Button>
                          <Button onClick={() => login('google')}>Google</Button>
                        </div>
                        <div><small>Don't have an account?</small> <button onClick={() => {
                          setLoginModal(false);
                          setRegisterModal(true);
                        }}><strong>Register</strong></button></div>
                      </LoginModal>
                      <ModalOverlay onClick={() => setLoginModal(false)}></ModalOverlay>
                    </>
                  )}
                  {registerModal && !loginModal && (
                    <>
                      <RegisterModal>
                        <p>
                          Please enter your information
                        </p>
                        <form  onSubmit={(event) => handleRegister(event)}>
                          <input type="text" name="username" placeholder="Name"/>
                          <input type="text" name="email" placeholder="Email"/>
                          <input type="password" name="password" placeholder="Password" />
                          <Button $white type="submit">Register</Button>
                        </form>
                        <p>or Sign up with:</p>
                        <div className="social">
                          <Button onClick={() => login('facebook')}>Facebook</Button>
                          <Button onClick={() => login('google')}>Google</Button>
                        </div>
                        <div><small>Already have an account?</small> <button onClick={() => {
                          setLoginModal(true);
                          setRegisterModal(false);
                        }}><strong>Login</strong></button></div>
                      </RegisterModal>
                      <ModalOverlay onClick={() => setRegisterModal(false)}></ModalOverlay>
                    </>
                  )}
                </>
              )}
            </div>
          </StyledNav>
          <MobileMenu>
            <Cart href={"/cart/"}>
              <CartIcon/>
              {cartProducts.length > 0 && (
                <span>{cartProducts.length}</span>
              )}
            </Cart>
            <HamburgerMenu ref={hamburgerRef} onClick={() => {
              hamburgerRef.current.classList.toggle('active');
              mobileMenu.current.classList.toggle('active');
            }}>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerMenu>
          </MobileMenu>
          {showSearch && <Search focus/>}
          {showSearch && <SearchOverlay onClick={() => setShowSearch(false)}></SearchOverlay>} {/* SearchOverlay close search if click target is not search */}
        </Container>
      </StyledHeader>
      <StyledMargin></StyledMargin> {/* dont delete - use for mrgin because header if fixed  */}
    </>
    
  )
}