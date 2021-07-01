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
  }

  body[data-theme='light'] {
    --colors-primary: #434449;
    --colors-background: white;
    --colors-gray10: #f1f1f4;
  }
  body[data-theme='dark'] {
    --colors-primary: white;
    --colors-background: #434449;
    --colors-gray10: #f1f1f4;
  }
  
  body {
    background-color: var(--colors-background);
    font-size: 1.6rem;
  }
`
