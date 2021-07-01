import { Dialog as ReachDialog } from '@reach/dialog'
import styled from 'styled-components/macro'
import { theme } from '../../theme/theme'

export const Dialog = styled(ReachDialog)`
  max-width: 450px;
  border-radius: 3px;
  padding: 32px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
  margin: 20vh auto;
`

export const CircleButton = styled.button`
  border-radius: 30px;
  padding: 0;
  width: 40px;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.background};
  color: ${theme.primary};
  border: 1px solid ${theme.gray10};
  cursor: pointer;
`
