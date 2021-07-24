import React from 'react'
import { useAuth } from './context/auth-context'
import FullPageSpinner from './components/FullPageSpinner'

const AuthenticatedApp = React.lazy(
  () => import(/* webpackPrefetch: true */ './components/AuthenticatedApp')
)
const UnAuthenticatedApp = React.lazy(
  () => import('./components/UnAuthenticatedApp')
)

function App() {
  const [theme] = React.useState('light')

  const { login, register, logout, user } = useAuth()

  React.useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return (
    <>
      <React.Suspense fallback={<FullPageSpinner />}>
        {user ? (
          <AuthenticatedApp logout={logout} />
        ) : (
          <UnAuthenticatedApp login={login} register={register} />
        )}
      </React.Suspense>
    </>
  )
}

export default App
