import styled from "styled-components"

const StyledDiv = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
  width: calc(100% - 30px);
`

export default function Container({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}