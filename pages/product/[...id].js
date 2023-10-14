import Container from "@/components/Container";
import Header from "@/components/Header";
import ImageGallary from "@/components/ImageGallary";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 70px;
  & > div {
    width: 50%;
    
  } 
  @media (max-width: 800px) {
    flex-wrap: wrap;
  }
`

export default function ProductPage({product}) {
  // console.log(product)
  return (
    <>
      <Header/>
      <Container>
        <Row>
          <div>
            <ImageGallary images={product.images}/>
          </div>
          <div>
            <Title>{product.properties["Brand"]} {product.title}</Title>
          </div>
        </Row>
      </Container>
    </>
  )
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const id = context.query.id;
  // console.log(context);
  const product = await Product.findOne({_id: id})
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }
  }
}