import React from 'react'
import { FormGroup, Input, LoginFormWrapper } from './style'
import { useAsync } from '../../utils/hook'
import { UserCredential } from '../../auth-provider'
import ErrorMessage from '../ErrorMessage'
import Spinner from '../Spinner'

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement
  password: HTMLInputElement
}

interface LoginFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export interface Props {
  submitButton: React.ReactElement
  onSubmit: (email: string, password: string) => Promise<any>
}

function LoginForm({ onSubmit, submitButton }: Props) {
  const { isLoading, isError, error, run } = useAsync<UserCredential, Error>()

  function handleSubmit(event: React.FormEvent<LoginFormElement>) {
    event.preventDefault()

    const { email, password } = event.currentTarget.elements

    run(onSubmit(email.value, password.value))
  }

  return (
    <LoginFormWrapper onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" />
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
            : [submitButton.props.children]),
          isLoading ? <Spinner css={{ marginLeft: 5 }} /> : null
        )}
      </div>
      {isError ? <ErrorMessage error={error} /> : null}
    </LoginFormWrapper>
  )
}

export default LoginForm
