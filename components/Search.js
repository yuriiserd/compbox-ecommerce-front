import styled from "styled-components"
import Input from "./Input"
import { primary, primaryLight } from "@/lib/colors"
import SearchIcon from "./icons/SearchIcon"
import { useEffect, useReducer, useRef, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { NotFound } from "./ProductsGrid"
import Image from "next/image"
import { motion } from "framer-motion"

const StyledDiv = styled.div`
  position: absolute;
  right: 0;
  padding-top: 20px;
  top: 100%;
  background: #fff;
  padding: 0.7rem 1.5rem 0.7rem;
  border: 1px solid ${primaryLight};
  border-radius: 0.4rem;
  width: 100%;
  max-width: 350px;
  box-shadow: 0px 14px 34px rgba(71, 82, 94, 0.21);
  z-index: 101; // for SearchOverlay overlap
  overflow: hidden;
  input {
    margin-top: 0;
    & + div {
      margin-top: 1rem;
    }
  }
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-width: calc(100% - 3rem);
  }
`
const StyledProduct = styled(Link)`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  color: #777;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

export default function Search({focus}) {

  const [searchValue, setSearchValue] = useState('');
  const [timeoutSearch, setTimeoutSearch] = useState(null);
  const [products, setProducts] = useState(null);
  const [noItemsFound, setNoItemsFound] = useState(false);
  

  useEffect(() => {
    searchProducts(searchValue)
  }, [searchValue])

  function searchProducts(search) {
    
    clearTimeout(timeoutSearch);
    setTimeoutSearch(setTimeout(() => {
      if (search) {
        axios.get('/api/products?search='+search).then(response => {
          const items = response.data.slice(0,5)
          setProducts(items);
          if (response.data.length === 0) {
            setNoItemsFound(true)
          } else {
            setNoItemsFound(false)
          }
        });
      } else {
        setProducts(null);
      }
    }, 500))
  }

  return (
    <StyledDiv>
      <Input $focus placeholder="Search" type="text" onChange={() => {
        setSearchValue(event.target.value);
      }}/>
      {noItemsFound && searchValue && (
        <NotFound>No products found &#9785;</NotFound>
      )}
      {products && searchValue && products.map((product, i) => (
        <motion.div
          key={product._id}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          viewport={{ once: true }}
        >
          <StyledProduct href={'/product/'+product._id}>
            <Image src={product.images[0]} width={40} height={40} alt={product.title}/>
            <p>{product.title}</p>
          </StyledProduct>
        </motion.div>
      ))}
    </StyledDiv>
  )
}