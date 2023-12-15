import { primary } from "@/lib/colors";
import styled from "styled-components";



export default function Title({children}) {

  const Title = styled.h2`
    margin-bottom: 2rem;
    font-size: 2rem;
    color: ${primary};
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  `
  
  
  return (
    <Title>{children}</Title>
  )
}