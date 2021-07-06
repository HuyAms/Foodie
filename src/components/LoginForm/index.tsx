import React from 'react'
import { FormGroup, Input, LoginFormWrapper } from './style'

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement
  password: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export interface Props {
  submitButton: React.ReactElement
}

function LoginForm({ submitButton }: Props) {
  function handleSubmit(event: React.FormEvent<LoginFormElement>) {
    event.preventDefault()

    const { username, password } = event.currentTarget.elements

    console.log('username: ', username.value)
    console.log('password: ', password.value)
  }

  return (
    <LoginFormWrapper onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="username">Username</label>
        <Input id="username" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        {React.cloneElement(
          submitButton,
          { type: 'submit' },
          ...(Array.isArray(submitButton.props.children)
            ? submitButton.props.children
            : [submitButton.props.children])
        )}
      </div>
    </LoginFormWrapper>
  )
}

export default LoginForm
