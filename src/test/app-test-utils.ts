import {
  render as rtlRender,
  RenderOptions,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import React from 'react'
import AppProviders from '../context/AppProviders'
import * as auth from '../auth-provider'
import userCredential from './data/user-credential.json'
import userEvent from '@testing-library/user-event'

const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/loading/i),
      ...screen.queryAllByText(/loading/i),
    ],
    { timeout: 4000 }
  )

function loginAsUser() {
  window.localStorage.setItem(
    auth.localStorageKey,
    JSON.stringify(userCredential)
  )
  return userCredential
}

interface Options extends Omit<RenderOptions, 'queries'> {
  user?: typeof userCredential
  route?: string
}

async function render(
  ui: React.ReactElement,
  { user, route = '/', ...renderOptions }: Options = {}
) {
  window.history.pushState({}, 'Test page', route)
  //
  // // pass null if need unauthenticated app
  user = typeof user === 'undefined' ? loginAsUser() : user

  const returnValue = {
    ...rtlRender(ui, {
      wrapper: AppProviders as React.FunctionComponent,
      ...renderOptions,
    }),
    user,
  }

  await waitForLoadingToFinish()

  return returnValue
}

export * from '@testing-library/react'
export { render, userEvent, waitForLoadingToFinish }
