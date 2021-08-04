import styled from 'styled-components/macro'

export const Image = styled.img`
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

export const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 66.66%;
  position: relative;
  overflow: hidden;
`

export const CardWrapper = styled.div`
  box-shadow: rgb(0 0 0 / 6%) 0px 0px 0.125rem 0px,
    rgb(0 0 0 / 12%) 0px 0.125rem 0.125rem 0px;
  overflow: hidden;
  border-radius: 5px;
  max-width: 400px;

  &:hover {
    ${Image} {
      transform: scale(1.1);
      transition: 0.4s all ease-out;
    }
  }
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
