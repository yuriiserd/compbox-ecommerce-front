import Image from "next/image";
import styled from "styled-components";

const StyledBanner = styled.div`
  width: 100%;
  background: linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%);
  /* margin-top: 80px; */
  padding-top: 70px;
  padding-bottom: 80px;
  margin-bottom: 60px;
  color: #ffffff;
`

export default function Banner({children}) {
  return (
    <StyledBanner>
      {children}
    </StyledBanner>
  )
} 