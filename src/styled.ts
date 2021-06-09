import 'styled-components'
import { colors, fonts } from './theme/theme'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: { [key in keyof typeof fonts]: string }
    colors: { [key in keyof typeof colors]: string }
  }
}
