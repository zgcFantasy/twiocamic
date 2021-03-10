import { Story, Meta } from '@storybook/react/types-6-0'
import React from 'react'
import Icon from './Icon'


export default {
  title: "component/Icon",
  component: Icon
} as Meta


export const testIcon: Story = (props) => {
  return (
    <React.Fragment>
      <Icon icon='angle-left' size='3x' theme='danger' />
      <Icon icon="coffee" size='3x' theme='primary' />
      <Icon icon="angle-down" size='3x' theme='primary' />
    </React.Fragment>
  )
}