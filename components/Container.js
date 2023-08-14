import styled from "styled-components"

const StyledDiv = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 15px;
  position: relative;
`

export default function Container({children}) {
  return (
    <StyledDiv>{children}</StyledDiv>
  )
}