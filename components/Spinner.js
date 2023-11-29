import Image from "next/image";
import spinner from '../public/spinner.svg';
import styled from "styled-components";

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`

export default function Spinner() {
  return (
    <SpinnerContainer>
      <Image src={spinner} width={60} height={60} alt="Loading..."/>
    </SpinnerContainer>
  )
}