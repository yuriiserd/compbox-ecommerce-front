import CategoriesGrid from "@/components/CategoriesGrid";
import Container from "@/components/Container";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import BackArrowIcon from "@/components/icons/BackArrowIcon";
import { primaryLight, url } from "@/lib/colors";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import Link from "next/link";
import styled from "styled-components";

const StyledTitle = styled.div`
  a {
    color: ${url};
    text-decoration: none;
    font-weight: 600;
    margin-bottom: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    svg {
      width: 1.6rem;
    }
  }
`
const Devider = styled.hr`
  margin-top: 2rem;
  margin-bottom: 2rem;
  border: none;
  border-bottom: 1px solid ${primaryLight};
`

export default function CategoryPage({category, products, categoryChildrens}) {

  const productCategoryId = '64bac2f697faffcc04671e3c';
  
  return (
    <>
      <Header/>
      <Container>
        <StyledTitle>
          {category.parent === productCategoryId && (
            <Link href={`/categories`}><BackArrowIcon/> Back</Link>
          )}
          {category.parent !== productCategoryId && (
            <Link href={`/category/${category.parent}`}><BackArrowIcon/> Back</Link>
          )}
          <Title>{category.name}</Title>
        </StyledTitle>
        <CategoriesGrid colums={7} categories={categoryChildrens}/>
        {!!category.childrens.length && (
          <Devider/>
        )}
        <ProductsGrid products={products}/>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const id = context.query.id;
  const category = await Category.findOne({_id: id});
  const categoryChildrens = await Category.find({_id: category.childrens});

  const productsIds = [];

  const products = await Product.find({category});
  products.forEach(product => {
    productsIds.push(product._id)
  })

  const productsChildrens = await Product.find({category: categoryChildrens});
  productsChildrens.forEach(product => {
    productsIds.push(product._id);
  })

  // console.log(categoryChildrens[0]);

  await Promise.all(categoryChildrens.map(async cat => {
    if (cat.childrens.length > 0) {
      const deepLevelProducts = await Product.find({category: cat.childrens});
      console.log(deepLevelProducts);
      deepLevelProducts.forEach(product => {
        
        productsIds.push(product._id);
      })
    }
  }))


  const allProducts = await Product.find({_id: productsIds}, null, {sort: {'_id': -1}});

  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      products: JSON.parse(JSON.stringify(allProducts)),
      categoryChildrens: JSON.parse(JSON.stringify(categoryChildrens)),
    }
  }
}