import React from 'react'
import UnAuthenticatedApp from './components/UnAuthenticatedApp'
import * as auth from './auth-provider'
import { getUserCredential, UserCredential } from './auth-provider'
import AuthenticatedApp from './components/AuthenticatedApp'
import { useAsync } from './utils/hook'
import FullPageSpinner from './components/FullPageSpinner'

function App() {
  const [theme] = React.useState('light')

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  const {
    data: user,
    run,
    error,
    isLoading,
    isIdle,
    isError,
    setData: setUser,
  } = useAsync<UserCredential | null, Error>()

  React.useEffect(() => {
    run(getUserCredential())
  }, [])

  const login = (email: string, password: string) =>
    auth.login(email, password).then((u) => setUser(u))
  const register = (email: string, password: string) =>
    auth.register(email, password).then((u) => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div
        css={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error?.message}</pre>
      </div>
    )
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
