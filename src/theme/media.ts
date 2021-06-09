const maxWidth = (maxWidth: number) => `@media (max-width: ${maxWidth}px)`
const minWidth = (minWidth: number) => `@media (min-width: ${minWidth}px)`

export const media = {
  maxWidth,
  minWidth,
  phone: maxWidth(600),
  tabPort: maxWidth(900),
  tabLand: maxWidth(1200),
  bigDesktop: minWidth(1800),
}
