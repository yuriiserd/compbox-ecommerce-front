import { primary, primaryLight } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`


  background: ${props => props.$white ? "#ffffff" : props.$transparent ? "transparent" : "linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%)"};
  color: ${props => props.$white ? primary : props.$icon ? "inherit" : "#ffffff"};
  padding: ${props => props.$icon ? "5px" : "10px 20px"};


  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin: 0 1rem 0 0;
  &:hover {
    background: ${props => props.$white ? primaryLight : props.$transparent ? "transparent" : "linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%)"};
  }
  svg {
    width: 20px;
    margin-right: ${props => props.$icon ? "0" : "0.5rem"};
    margin-bottom: -4px;
  }
`

const StyledButton = styled.button`
  ${ButtonStyle}    
`

export default function Button({children, ...rest}) {

  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}