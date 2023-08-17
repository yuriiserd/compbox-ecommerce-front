import Banner from "@/components/Banner";
import Container from "@/components/Container";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({
  featuredProduct
}) {
  
  return (
    <div>
      <Header/>
      <Banner>
        <Container>
          <Featured product={featuredProduct}/>
        </Container>
      </Banner>
      <Container>
        text
      </Container>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = "64c01598d32dc66f2104b454";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    }
  }
}