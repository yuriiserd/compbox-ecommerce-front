import styled from "styled-components"
import Spinner from "./Spinner"


const PageLoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export default function PageLoading() {
  
  return (
    <PageLoadingContainer><Spinner/></PageLoadingContainer>
  )
}