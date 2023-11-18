import { primary, primaryLight, redLight, url } from "@/lib/colors";
import styled, { css } from "styled-components";

export const ButtonStyle = css`
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  background: linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%);
  color: #ffffff;
  margin: 0 1rem 0 0;
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
        border: 1px solid ${primary};
        color: ${primary};
        &:hover {
          background: ${primaryLight};
        }
      `
    }
  }}
  ${props => {
    if (props.$filter) {
      return `
        background: #fff;
        padding: 4px 4px 4px 18px;
        margin-right: 0;
        border: 1px solid ${primaryLight};
        color: ${primary};
        display: flex;
        align-items: center;
        gap: 0.2rem;
        &:hover {
          background: ${primaryLight};
          svg {
            background: #fff;
            color: red;
            opacity: 0.7;
          }
        }
        svg {
          margin-right: -0.1rem;
          margin-bottom: 0;
          border-radius: 1rem;
          padding: 2px;

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
        border: none;
      `
    }
  }}

  text-decoration: none;
  border-radius: 100px;
  font-weight: 500;
  cursor: pointer;
  
  
`

const StyledButton = styled.button`
  ${ButtonStyle}    
`

export default function Button({children, ...rest}) {

  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}