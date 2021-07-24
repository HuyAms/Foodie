import React from 'react'
import UnAuthenticatedApp from './components/UnAuthenticatedApp'
import * as auth from './auth-provider'
import { UserCredential } from './auth-provider'
import AuthenticatedApp from './components/AuthenticatedApp'

function App() {
  const [theme] = React.useState('light')

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const [user, setUser] = React.useState<UserCredential | null>(null)

  const login = (email: string, password: string) =>
    auth.login(email, password).then((u) => setUser(u))
  const register = (email: string, password: string) =>
    auth.register(email, password).then((u) => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

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
