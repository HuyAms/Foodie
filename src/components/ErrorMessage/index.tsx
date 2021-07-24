import React from 'react'

interface Props {
  error: Error | null
}

function ErrorMessage(props: Props) {
  const { error } = props

  return <p>{error?.message}</p>
}

export default ErrorMessage
