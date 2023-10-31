import { primary, url } from "@/lib/colors";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-top: 3rem;
  a {
    text-decoration: none;
    color: ${primary};
    &:hover {
      color: ${url};
    }
  }
`

export default function Breadcrumbs({product}) {

  const [category, setCategory] = useState({});
  const [parentCategory, setParentCategory] = useState({});

  useEffect(() => {
    axios.post('/api/categories', {id: product.category}).then( async (res) => {
      const cat = res.data;
      setCategory(cat)
      await axios.post('/api/categories', {id: cat.parent}).then((res) => {
        setParentCategory(res.data)
      })
    })
  }, [])

  return (
    <StyledDiv>
      <Link href={'/'}> Home</Link> /
      <Link href={'/categories/'}> Categories</Link> / 
      {parentCategory.name && (
        <Link href={'/category/'+parentCategory._id}> {parentCategory.name}</Link>
      )}
      <Link href={'/category/'+product.category}> / {category.name}</Link> / 
      <Link href={'/category/'+product.category+'?Brand='+product.properties.Brand}> {product.properties.Brand} {category.name} </Link>
    </StyledDiv>
  )
}