import React from 'react'

interface Props {
  logout: () => void
}

function AuthenticatedApp({ logout }: Props) {
  function handleLogout() {
    logout()
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>this is authenticated app</p>
    </div>
  )
}

export default AuthenticatedApp
