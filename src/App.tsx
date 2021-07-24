import React from 'react'
import UnAuthenticatedApp from './components/UnAuthenticatedApp'
import AuthenticatedApp from './components/AuthenticatedApp'
import { useAuth } from './context/auth-context'

function App() {
  const [theme] = React.useState('light')

  const { login, register, logout, user } = useAuth()

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <>
      {user ? (
        <AuthenticatedApp logout={logout} />
      ) : (
        <UnAuthenticatedApp login={login} register={register} />
      )}
    </>
  )
}

export default App
