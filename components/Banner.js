import Image from "next/image";
import { styled } from "styled-components";

const StyledBanner = styled.div`
  height: 600px;
  width: 100%;
  background: linear-gradient(202deg, #2D1E1E 0%, #0A0A0A 100%);
  padding-top: 120px;
`

export default function Banner({children}) {
  return (
    <StyledBanner>
      {children}
    </StyledBanner>
  )
} 