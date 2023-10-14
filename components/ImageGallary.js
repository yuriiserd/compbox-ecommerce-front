import Image from "next/image"
import { useState } from "react"
import styled from "styled-components"
import ProductIcon from "./icons/ProductIcon"

export default function ImageGallary({images}) {

  const [mainImage, setMainImage] = useState(images[0]);

  const MainImage = styled.div`
    height: 400px;
    margin-bottom: 30px;
    & > div {
      width: 100%;
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        transform: scale(1.5)
      }
    }
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  `
  const ImageButtons = styled.div`
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    gap: 0.4rem;
    button {
      max-height: 90px;
      border: 1px solid #CCDBE4;
      border-radius: 4px;
      padding: 0.6rem 0.2rem;
      background: none;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 14px 20px rgba(71, 82, 94, 0.2);
      }
      img {
        object-fit: contain;
        width: 100%;
        height: 100%;
      }
    }
  `
  return (
    <div>
      <MainImage>
        {!images.length && (
          <div>
            <ProductIcon/>
          </div>
        )}
        {!!images.length && (
          <Image src={mainImage} width={400} height={400}/>
        )}
      </MainImage>
      <ImageButtons>
        {images.map((image => (
          <button key={image} onMouseOver={() => setMainImage(image)}>
            <Image src={image} width={70} height={70} alt=""/>
          </button>
        )))}
      </ImageButtons>
    </div>
  )
}