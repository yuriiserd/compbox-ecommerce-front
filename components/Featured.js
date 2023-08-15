import Image from "next/image";
import Link from "next/link";
import styled from "styled-components"
import Button from "./Button";

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  h1 {
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
    line-height: 1.7;
  }
`;

export default function Featured() {

  return (
    <StyledDiv>
      <div>
        <h1>MacBook Pro</h1>
        <p>Supercharged by M2 Pro or M2 Max, MacBook Pro takes its power and efficiency further than ever. It delivers exceptional performance whether it’s plugged in or not, and now has even longer battery life. Combined with a stunning Liquid Retina XDR display and all the ports you need — this is a pro laptop without equal.</p>
        <Button $white>Buy Now</Button>
      </div>
      <div>
        <Image src="https://images.macrumors.com/t/MwgTEggiztXrvIN2l8bZny1f93M=/1600x/article-new/2013/09/2023-macbook-pro-transparent.png" width={632} height={486}/>
      </div>
    </StyledDiv>
  )
}