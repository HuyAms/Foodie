import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import userEvent from '@testing-library/user-event'

import * as stories from './Modal.stories'

const { Default } = composeStories(stories)

test('modal can be opened and closed', () => {
  render(<Default />)

  userEvent.click(screen.getByRole('button', { name: 'Open' }))

  const modal = screen.getByRole('dialog')
  expect(modal).toHaveAttribute('aria-label', 'Modal label')
  const inModal = within(screen.getByRole('dialog'))
  expect(
    inModal.getByRole('heading', { name: 'Modal title' })
  ).toBeInTheDocument()

  userEvent.click(inModal.getByRole('button', { name: /close/i }))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
