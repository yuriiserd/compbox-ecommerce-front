import { createGlobalStyle } from "styled-components";
import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";

import localFont from 'next/font/local';
import { CartContextProvider } from "@/components/CartContext";
import { LikedContextProvider } from "@/components/LikedContext";
import Head from "next/head";
import { store } from "@/store";

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

const regularFont = localFont({src: '../fonts/CeraPro-Regular.woff2'})

const GlobalStyles = createGlobalStyle`
  html {
    overflow-x: hidden;
  }
  * {
    margin: 0;
    padding: 0;
  }
  button, 
  input {
      font-family: inherit;
  }
  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  p {
    line-height: 160%;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles/>
      <Provider store={store}>
        <CartContextProvider>
          <LikedContextProvider>
            <main className={regularFont.className}>
              <Component {...pageProps} />
            </main>
          </LikedContextProvider>
        </CartContextProvider>
      </Provider>
    </>
  )
}
