import styled from 'styled-components/macro'

export const FoodMenuWrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 24px;
`

export const HomePageLayout = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 24px;
`

export const Heading = styled.h2`
  margin-bottom: 24px;
`

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 108px 0;
`

export const NotFoundText = styled.h2`
  font-size: 3.8rem;
`

export const NotFoundImage = styled.img`
  width: 300px;
  height: auto;
  object-fit: cover;
  margin-bottom: 24px;
`
