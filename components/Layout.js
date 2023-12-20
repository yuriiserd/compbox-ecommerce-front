import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import usePreloader from "@/hooks/usePreloader";
import PageLoading from "./PageLoading";

export default function Layout({children, noPreloader}) {

  const loading = usePreloader();

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