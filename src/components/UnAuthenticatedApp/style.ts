import styled from 'styled-components/macro'

export const UnAuthenticatedAppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const AuthenticationSection = styled.div`
  width: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`

export const Heading = styled.h1`
  margin-bottom: 8px;
`
