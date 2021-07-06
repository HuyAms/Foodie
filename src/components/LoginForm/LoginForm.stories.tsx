import React from 'react'
import { Button } from '../lib'

import { Meta, Story } from '@storybook/react'

import LoginForm, { Props } from './index'

export default {
  title: 'Components/LoginForm',
  component: LoginForm,
} as Meta

const Template: Story<Props> = (args) => <LoginForm {...args} />

export const Default = Template.bind({})
Default.args = {
  submitButton: <Button>Login</Button>,
}
