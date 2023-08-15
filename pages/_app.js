import { createGlobalStyle } from "styled-components";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
})

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
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
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
