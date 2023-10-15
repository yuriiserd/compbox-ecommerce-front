const { styled } = require("styled-components")
import { primary } from "@/lib/colors";


export default function Title({children}) {
  const StyledTitle = styled.h2`
    margin-bottom: 2rem;
    font-size: 2rem;
    color: ${primary};
  `
  return (
    <StyledTitle>{children}</StyledTitle>
  )
}