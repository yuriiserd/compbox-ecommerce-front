import Header from "@/components/Header";
import styled from "styled-components";
import { primary } from "@/lib/colors";
import Container from "@/components/Container";
import ProductsGrid from "@/components/ProductsGrid";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import Title from "@/components/Title";

export default function ProductsPage({products}) {

  const Main = styled.div`
    margin-top: 70px;
  `
  
  return (
    <>
      <Header/>
      <Container>
        <Main>

        </Main>
        <Title>Products</Title>
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