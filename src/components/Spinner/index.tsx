import React from 'react'
import { FaSpinner } from 'react-icons/fa'
import styled, { keyframes } from 'styled-components/macro'

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
})

const StyledSpinner = styled(FaSpinner)`
  animation: ${spin} 1s linear infinite;
`

function Spinner() {
  return <StyledSpinner />
}

export default Spinner
