import styled from 'styled-components/macro'
import { theme } from '../../theme/theme'

export const Header = styled.header`
  padding: 0 30px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.gray10};
`

export const Logo = styled.div`
  font-size: 28px;

  &:hover {
    cursor: pointer;
  }
`
