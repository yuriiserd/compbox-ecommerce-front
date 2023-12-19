import Container from "./Container";
import Footer from "./Footer";
import { useEffect } from "react";

import Header from "./Header";
import { initGA, logPageView } from "@/services/analytics";


export default function LayoutNoPreloader({children}) {

  useEffect(() => {
    initGA();
    logPageView();
  }, [])

  return (
    <>
      <Header />
        <Container>
          {children}
        </Container>
      <Footer />
    </>
  )
}