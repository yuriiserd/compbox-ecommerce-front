import { url } from "@/lib/colors"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import ProductIcon from "./icons/ProductIcon";
import { motion } from "framer-motion";

export default function CategoriesGrid({categories, colums, disableAnimation = false}) {

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
      grid-template-columns:  ${colums >= 6 ? '1fr 1fr 1fr 1fr' : '1fr 1fr 1fr'};
      margin: 0 auto;
    }
    @media (max-width: 768px) {
      grid-template-columns: ${colums >= 6 ? '1fr 1fr' : '1fr'};
      max-width: 400px;
    }
    a {
      color: ${url};
      text-decoration: none;
      text-align: center;
      overflow: hidden;
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
      width: 100%;
      object-fit: contain;
      @media (max-width: 992px) {
        height: ${colums >= 6 ? '100px' : '150px'};
      }
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
      
      {categories.map((category, i) => (
        
        <div key={category._id}>
          {disableAnimation ? (
            <div>
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
            </div>
          ) : (
            <motion.div
              key={category._id}
              initial={{ y: 200, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true, margin: "200px" }}
              style={{ overflow: 'hidden' }}
            >
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
            </motion.div>
          )}
        </div>
      ))}
    </StyledGrid>
  )
}