import React from 'react'

interface Props {
  message: string
}

function ErrorMessage({ message }: Props) {
  return <p role="alert">{message}</p>
}

export default ErrorMessage
