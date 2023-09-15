import { createGlobalStyle } from "styled-components";
import { Montserrat } from "next/font/google";

import localFont from 'next/font/local';
import { CartContextProvider } from "@/components/CartContext";
import { LikedContextProvider } from "@/components/LikedContext";

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

const regularFont = localFont({src: '../fonts/CeraPro-Regular.woff2'})

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  button, 
  input {
      font-family: inherit;
  }
  img {
    max-width: 100%;
    height: auto;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles/>
      <CartContextProvider>
        <LikedContextProvider>
          <main className={regularFont.className}>
            <Component {...pageProps} />
          </main>
        </LikedContextProvider>
      </CartContextProvider>
      
    </>
  )
}
