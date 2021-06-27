// Button.stories.tsx

import React from 'react'

import { Meta, Story } from '@storybook/react'

import {
  Modal,
  ModalDismissButton,
  ModalOpenButton,
  ModalContents,
} from './index'

export default {
  title: 'Components/Modal',
  subcomponents: { ModalDismissButton, ModalOpenButton, ModalContents },
  component: Modal,
} as Meta

const mockedLabel = 'Modal label'
const mockedTitle = 'Modal title'

export const Default = () => (
  <Modal>
    <ModalOpenButton>
      <button>Open</button>
    </ModalOpenButton>
    <ModalContents aria-label={mockedLabel} title={mockedTitle}>
      <p>Modal content</p>
    </ModalContents>
  </Modal>
)
