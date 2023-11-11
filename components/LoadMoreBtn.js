import { primary, primaryLight } from "@/lib/colors"
import styled from "styled-components"


const StyledBtn = styled.button`
  border: 1px solid ${primary};
  padding: 0.8rem 2rem;
  background: #ffffff;
  color: ${primary};
  font-size: 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  transform: scale(1);
  box-shadow: 0px 14px 34px rgba(71, 82, 94, 0);
  &:hover {
    background: ${primaryLight};
    transform: scale(1.05);
    box-shadow: 0px 14px 34px rgba(71, 82, 94, 0.21);
  }
`
const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default function LoadMoreBtn(props) {
  return (
    <Container>
      <StyledBtn {...props}>{props.children}</StyledBtn>
    </Container>
  )
}