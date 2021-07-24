import React from 'react'

import { Meta, Story } from '@storybook/react'
import Spinner from './index'

export default {
  title: 'Components/Spinner',
  component: Spinner,
} as Meta

const Template: Story = () => <Spinner />

export const Default = Template.bind({})
