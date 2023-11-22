import { useEffect, useRef } from "react"
import styled from "styled-components"

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid #8793B0;
  background: none;
  outline: none;
  padding: 0.3rem 0;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  margin-top: 10px;
  & + label {
    transition: all 0.3s;
    position: relative;
    top: -1.6rem;
    padding: 0.3rem 0;
    z-index: -1;
  }
  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -3.2rem;
    font-size: 0.9rem;
  } 
`

export default function Input(props) {

  const search = useRef();
  
  useEffect(() => {
    if (props.$focus) {
      search.current.focus()
    }
  },[])

  return <StyledInput ref={search} {...props}/> // empty placeholder for label animation
} 