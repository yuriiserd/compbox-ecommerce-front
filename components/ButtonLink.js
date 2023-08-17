import { styled, css } from "styled-components";
import { ButtonStyle } from "./Button";
import Link from "next/link";

const StyledLink = styled(Link)`
  ${ButtonStyle};
`

export default function ButtonLink({children, href, ...rest}) {

  return (
    <StyledLink href={href} {...rest}>{children}</StyledLink>
  )
}