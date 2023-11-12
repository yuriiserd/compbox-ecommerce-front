import Header from "@/components/Header";
import styled from "styled-components";
import Container from "@/components/Container";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import Title from "@/components/Title";
import CategoriesGrid from "@/components/CategoriesGrid";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function CategoriesPage({categories}) {
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header/>
      <Container>
        <Title>Categories</Title>
        <CategoriesGrid categories={categories}/>
      </Container>
      <Footer/>
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({parent: {_id: '64bac2f697faffcc04671e3c'}}, null, {sort: {order: 1}});

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    }
  }
}