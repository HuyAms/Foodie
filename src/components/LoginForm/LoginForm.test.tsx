import React from 'react'
import { render, screen } from '@testing-library/react'
import LoginForm from './index'
import { buildLoginForm } from '../../test/generate'
import userEvent from '@testing-library/user-event'
import { waitForLoadingToFinish } from '../../test/app-test-utils'
import * as faker from 'faker'

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn(() => Promise.resolve())

  render(
    <LoginForm submitButton={<button>Submit</button>} onSubmit={handleSubmit} />
  )

  const { email, password } = buildLoginForm()

  const emailInput = screen.getByLabelText(/email/i)
  userEvent.type(emailInput, email)

  const passwordInput = screen.getByLabelText(/password/i)
  userEvent.type(passwordInput, password)

  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(handleSubmit).toHaveBeenCalledWith(email, password)
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  await waitForLoadingToFinish()
})

test('show an error message when fails to login', async () => {
  const handleSubmit = jest.fn(() =>
    Promise.reject(Error('There is an error while trying to login'))
  )

  render(
    <LoginForm submitButton={<button>Submit</button>} onSubmit={handleSubmit} />
  )

  const { email, password } = buildLoginForm()

  const emailInput = screen.getByLabelText(/email/i)
  userEvent.type(emailInput, email)

  const passwordInput = screen.getByLabelText(/password/i)
  userEvent.type(passwordInput, password)

  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  expect(handleSubmit).toHaveBeenCalledWith(email, password)
  expect(handleSubmit).toHaveBeenCalledTimes(1)

  await waitForLoadingToFinish()

  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"There is an error while trying to login"`
  )
})
