import React from 'react'
import { CardWrapper, Image, Body, Title } from './style'

interface Props {
  title: string
  description: string
  imgUrl: string
}

function Card({ title, description, imgUrl }: Props) {
  return (
    <CardWrapper>
      <Image src={imgUrl} alt={title} />
      <Body>
        <Title>{title}</Title>
        <p>{description}</p>
      </Body>
    </CardWrapper>
  )
}

export default Card
