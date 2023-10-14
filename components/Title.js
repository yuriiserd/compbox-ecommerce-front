const { styled } = require("styled-components")
import { primary } from "@/lib/colors";

const StyledTitle = styled.h2`
    margin-bottom: 2rem;
    font-size: 2rem;
    color: ${primary};
  `
export default function Title({children}) {
  return (
    <StyledTitle>{children}</StyledTitle>
  )
}