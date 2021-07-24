import React from 'react'
import Spinner from '../Spinner'
import styled from 'styled-components/macro'

const StyledFullPageSpinner = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

function FullPageSpinner() {
  return (
    <StyledFullPageSpinner>
      <Spinner />
    </StyledFullPageSpinner>
  )
}

export default FullPageSpinner
