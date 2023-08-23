import Banner from "@/components/Banner";
import Container from "@/components/Container";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category"
import NewProducts from "@/components/ProductsGrid";

export default function HomePage({
  featuredProduct,
  newProducts,
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
        <NewProducts products={newProducts}/>
      </Container>
    </div>
  )
}

export async function getServerSideProps() {
  const featuredProductId = "64c01598d32dc66f2104b454";
  await mongooseConnect();
  const categories = await Category.find();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}, limit: 4});

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}