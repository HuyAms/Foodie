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
    --colors-primary: deeppink;
    --colors-background: white;
  }
  body[data-theme='dark'] {
    --colors-primary: lightpink;
    --colors-background: black;
  }
  
  body {
    background-color: var(--colors-background);
  }
`
