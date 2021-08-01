import React from 'react'
import { GlobalStyle } from '../theme/globalStyles'
import { AuthProvider } from './auth-context'
import { BrowserRouter as Router } from 'react-router-dom'

interface Props {
  children: React.ReactNode
}

function AppProviders({ children }: Props) {
  return (
    <React.StrictMode>
      <GlobalStyle />
      <Router>
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </React.StrictMode>
  )
}

export default AppProviders
