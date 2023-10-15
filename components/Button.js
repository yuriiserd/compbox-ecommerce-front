import { primary, primaryLight } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  padding: 10px 20px;
  font-size: 1rem;
  background: linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%);
  color: #ffffff;
  &:hover {
    background: linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%);
  }
  svg {
    width: 20px;
    margin-right: ${props => props.$icon ? "0" : "0.5rem"};
    margin-bottom: -4px;
  }
  /* {$white , $transparent, $icon , $size === "sm md lg"} */
  /* $white */
  ${props => {
    if (props.$white) {
      return `
        background: #ffffff;
        color: ${primary};
        &:hover {
          background: ${primaryLight};
        }
      `
    }
  }}
  ${props => {
    if (props.$size === "sm") {
      return `
        font-size: 0.8rem;
        svg {
          width: 1rem ;
        }
      `
    }
    if (props.$size === "md") {
      return `
        font-size: 1.2rem;
        svg {
          width: 1.5rem ;
        }
      `
    }
    if (props.$size === "lg") {
      return `
        font-size: 1.4rem;
        svg {
          width: 2rem;
        }
      `
    }
  }}
  /* $transparent */
  ${props => {
    if (props.$transparent) {
      return `
        background: "transparent";
      `
    }
  }}
  /* $icon */
  ${props => {
    if (props.$icon) {
      return `
        padding: 5px; 
        color: inherit;
      `
    }
  }}

  /* background: ${props => props.$white ? "#ffffff" : props.$transparent ? "transparent" : "linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%)"};
  color: ${props => props.$white ? primary : props.$icon ? "inherit" : "#ffffff"};
  padding: ${props => props.$icon ? "5px" : "10px 20px"}; */


  text-decoration: none;
  border-radius: 100px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin: 0 1rem 0 0;
  /* &:hover {
    background: ${props => props.$white ? primaryLight : props.$transparent ? "transparent" : "linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%)"};
  } */
  
`

const StyledButton = styled.button`
  ${ButtonStyle}    
`

export default function Button({children, ...rest}) {

  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}