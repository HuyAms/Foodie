import React from 'react'
import { GlobalStyle } from '../theme/globalStyles'
import { AuthProvider } from './auth-context'

interface Props {
  children: React.ReactNode
}

function AppProviders({ children }: Props) {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <AuthProvider>{children}</AuthProvider>
    </React.StrictMode>
  )
}

export default AppProviders
