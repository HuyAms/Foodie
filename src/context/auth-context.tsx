import React from 'react'
import { useAsync } from '../utils/hook'
import { getUserCredential, UserCredential } from '../auth-provider'
import * as auth from '../auth-provider'
import FullPageSpinner from '../components/FullPageSpinner'

interface IAuthContext {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
  user: UserCredential | null
}

const AuthContext = React.createContext<IAuthContext | null>(null)

function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw Error('useAuth must be used within a AuthContext provider')
  }

  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const {
    data: user,
    run,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    setData: setUser,
    status,
  } = useAsync<UserCredential | null, Error>()

  React.useEffect(() => {
    run(getUserCredential())
  }, [run])

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

  if (isSuccess) {
    const value = { user, login, register, logout }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  }

  throw new Error(`Unhandled status: ${status}`)
}

export { AuthContext, AuthProvider, useAuth }
