import Header from "@/components/Header";
import styled from "styled-components";
import Container from "@/components/Container";
import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongoose";
import Title from "@/components/Title";
import CategoriesGrid from "@/components/CategoriesGrid";

export default function CategoriesPage({categories}) {
  
  return (
    <>
      <Header/>
      <Container>
        <Title>Categories</Title>
        <CategoriesGrid categories={categories}/>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find({parent: {_id: '64bac2f697faffcc04671e3c'}});

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    }
  }
}