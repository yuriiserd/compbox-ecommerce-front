import Banner from "@/components/Banner";
import Container from "@/components/Container";
import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category"
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import CategoriesGrid from "@/components/CategoriesGrid";
import Link from "next/link";
import styled from "styled-components";
import { url } from "@/lib/colors";
import { Setting } from "@/models/Setting";
import usePreloader from "@/hooks/usePreloader";
import PageLoading from "@/components/PageLoading";

const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  margin-top: -10px;
  margin-bottom: 20px;
  color: ${url};
  align-items: center;
  font-size: 1.1rem;
  gap: 0.5rem;
  transition: gap 0.1s;
  svg {
    max-width: 20px;
  }
  &:hover {
    gap: 0.7rem;
  }
`

export default function HomePage({
  featuredProduct,
  newProducts,
  categories
}) {

  const loading = usePreloader();

  return (
    <>
      <Header/>
      {loading ? <PageLoading/> : (
        <>
          {featuredProduct && (
            <Banner>
              <Container>
                <Featured product={featuredProduct}/>
              </Container>
            </Banner>
          )}
          <Container>
            <Title>New Products</Title>
            <StyledLink href="/products/">
              See all 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </StyledLink>
            <ProductsGrid products={newProducts}/>
            <Title>Categories</Title>
            <StyledLink href="/categories/">
              See all 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </StyledLink>
            <CategoriesGrid categories={categories} colums={2}/>
          </Container>
        </>
      )}
      <Footer/>
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const featuredProduct = await Setting.findOne({name: 'featuredProduct'});
  const featuredProductId = featuredProduct.value;
  const categories = await Category.find({parent: {_id: '64bac2f697faffcc04671e3c'}}, null, {sort: {order: 1}}).limit(4);
  const featuredProductDoc = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {sort: {'_id': -1}}).limit(4);


  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProductDoc)),
      categories: JSON.parse(JSON.stringify(categories)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    }
  }
}