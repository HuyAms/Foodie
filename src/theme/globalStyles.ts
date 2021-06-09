import { createGlobalStyle } from 'styled-components/macro'

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
    --brown: #854d27;
    --orange: #dd7230;
    --green: #71a033;
  }
`
