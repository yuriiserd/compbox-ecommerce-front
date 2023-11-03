import { useRouter } from "next/router"
import { useEffect } from "react";
import styled from "styled-components"

export default function SelectedFilters({productsCount}) {

  const Selected = styled.div`
    margin-bottom: 1.5rem;
  `

  const router = useRouter();

  useEffect(() => {
    

  }, [])

  if (Object.keys(router.query).length === 0) return;
  

  return (
    <Selected>
      <span>Selected {productsCount} products</span>
    </Selected>
  )
}