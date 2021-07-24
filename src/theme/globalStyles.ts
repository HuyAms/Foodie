import { createGlobalStyle, css } from 'styled-components/macro'

const sharedColors = css`
  --colors-gray10: #f1f1f4;
  --colors-indigo: #3f51b5;
  --colors-white: #ffff;
`

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
    ${sharedColors}
  }
  body[data-theme='dark'] {
    --colors-primary: white;
    --colors-background: #434449;
    ${sharedColors}
  }
  
  body {
    background-color: var(--colors-background);
    font-size: 1.6rem;
  }
`
