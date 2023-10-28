import { url } from "@/lib/colors"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import ProductIcon from "./icons/ProductIcon";

export default function CategoriesGrid({categories, colums}) {

  let columsString = '';
  for (let i = 0; i < colums; i++) {
    columsString += ' 1fr';
  }
  if (!colums) {
    columsString = ' 1fr 1fr 1fr 1fr 1fr';
  }

  const StyledGrid = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: ${columsString};
    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
      max-width: 700px;
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      max-width: 400px;
    }
    a {
      color: ${url};
      text-decoration: none;
      text-align: center;
      &:hover {
        text-decoration: underline;
      }
    }
    h3 {
      margin-bottom: 20px;
      margin-top: 10px;
    }
    img {
      height: ${colums >= 6 ? '150px' : '200px'};
      object-fit: contain;
    }
  `
  const DefaultThambnail = styled.div`
    height: ${colums >= 6 ? '150px' : '200px'};
    display: flex;
    justify-content: center;
    align-items: center;
  `
  
  return (
    <StyledGrid>
      {categories.map(category => (
        <Link key={category._id} href={`/category/${category._id}`}>
          {category.image && (
            <Image src={category.image} width={400} height={400} alt={category.name}/>
          )}
          {!category.image && (
            <DefaultThambnail>
              <ProductIcon/>
            </DefaultThambnail>
          )}
          <h3>{category.name}</h3>
        </Link>
      ))}
    </StyledGrid>
  )
}