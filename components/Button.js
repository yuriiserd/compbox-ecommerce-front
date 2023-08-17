import { styled, css } from "styled-components";

export const ButtonStyle = css`
  background: ${props => props.$white ? "#ffffff" : "linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%)"};
  color: ${props => props.$white ? "#00178D" : "#ffffff"};
  text-decoration: none;
  background-color: #fff;
  border-radius: 30px;
  padding: 10px 20px;
  display: inline-block;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  margin: 0 1rem 0 0;
`

const StyledButton = styled.button`
  ${ButtonStyle}    
`

export default function Button({children, ...rest}) {

  return (
    <StyledButton {...rest}>{children}</StyledButton>
  )
}