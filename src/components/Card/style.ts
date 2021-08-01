import styled from 'styled-components/macro'

export const CardWrapper = styled.div`
  box-shadow: rgb(0 0 0 / 6%) 0px 0px 0.125rem 0px,
    rgb(0 0 0 / 12%) 0px 0.125rem 0.125rem 0px;
  overflow: hidden;
  border-radius: 5px;
  max-width: 400px;
`

export const Image = styled.img`
  height: 135px;
  width: 100%;
  object-fit: cover;
`

export const Title = styled.h2`
  font-size: 1.6rem;
`

export const Body = styled.div`
  padding: 16px;

  p {
    font-size: 1.2rem;
    color: #202125a3;
  }
`
