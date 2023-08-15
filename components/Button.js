import { styled } from "styled-components";

export default function Button(props) {

  const StyledButton = styled.button`
    background: ${props.$white ? "#ffffff" : "linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%)"};
    color: ${props.$white ? "#00178D" : "#ffffff"};
    text-decoration: none;
    background-color: #fff;
    border-radius: 30px;
    padding: 10px 20px;
    display: inline-block;
    font-weight: 500;
    border: none;
  `

  return (
    <StyledButton>{props.children}</StyledButton>
  )
}