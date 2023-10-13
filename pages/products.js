import Header from "@/components/Header";
import styled from "styled-components";
import { primary } from "@/lib/colors";
import Container from "@/components/Container";
import ProductsGrid from "@/components/ProductsGrid";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default function ProductsPage({products}) {

  const StyledTitle = styled.h2`
    margin-bottom: 2rem;
    margin-top: 3rem;
    font-size: 2rem;
    color: ${primary};
  `
  
  return (
    <>
      <Header/>
      <Container>
        <StyledTitle>Products</StyledTitle>
        <ProductsGrid products={products}/>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const products = await Product.find({}, null, {sort: {'_id': -1}});

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}