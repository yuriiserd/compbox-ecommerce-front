import styled, {css} from "styled-components"

export default function CartList({products}) {

  const RowSize = css`
    display: grid;
    grid-template-columns: 1.28fr 0.3fr 0.3fr 0.12fr;
    text-align: right;
    div:first-child {
      text-align: left;
    }
  `

  const Head = styled.div`
    ${RowSize}
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #CCDBE4;
  `

  const Item = styled.div`
    ${RowSize}
  `

  return (
    <>
      <Head>
        <div>Product</div>
        <div>Quantity</div>
        <div>Price</div>
        <div></div>
      </Head>
      {products.map(product => (
        <Item>
          <div><h3>{product.title}</h3></div>
          <div>22</div>
          <div>33</div>
          <div>:D</div>
        </Item>
      ))}
    </>
  )
}