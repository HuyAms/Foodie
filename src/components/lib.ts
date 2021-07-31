import styled from 'styled-components/macro'
import { theme } from '../theme/theme'

export const Button = styled.button`
  padding: 10px 15px;
  border: 0;
  line-height: 1;
  border-radius: 3px;
  background-color: ${theme.gray10};
  color: black;
  cursor: pointer;
`

export const Input = styled.input`
  border: 1px solid ${theme.gray10};
  padding: 8px 24px;
  outline: none;
`
