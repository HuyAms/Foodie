import React from 'react'
import { CardWrapper, Image, Body, Title, ImageWrapper } from './style'

interface Props {
  title: string
  description: string
  imgUrl: string
}

function Card({ title, description, imgUrl }: Props) {
  return (
    <CardWrapper>
      <ImageWrapper>
        <Image src={imgUrl} alt={title} />
      </ImageWrapper>
      <Body>
        <Title>{title}</Title>
        <p>{description}</p>
      </Body>
    </CardWrapper>
  )
}

export default Card
