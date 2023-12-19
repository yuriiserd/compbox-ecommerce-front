import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import { useEffect } from "react";

import usePreloader from "@/hooks/usePreloader";
import PageLoading from "./PageLoading";
import { initGA, logPageView } from "@/services/analytics";



export default function Layout({children, noPreloader}) {

  const loading = usePreloader();

  useEffect(() => {
    initGA();
    logPageView();
  }, [])

  return (
    <>
      <Header />
        <Container>
          {noPreloader ? (
            <>
              {children}
            </>
          ) : (
            <>
              {loading ? <PageLoading/> : children}
            </>
          )}
        </Container>
      <Footer />
    </>
  )
}