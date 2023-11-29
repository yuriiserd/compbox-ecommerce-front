import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({children}) {
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