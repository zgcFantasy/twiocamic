import { Story, Meta } from '@storybook/react'
import React, { useState } from 'react'
import Transition from './Transition'
import Button from '../Button/Button'
export default {
  title: 'component/Transition',
  component: Transition

} as Meta


export const ExampleTransition: Story = (args) => {
  const [show, setShow] = useState(false)
  return (
    <React.Fragment>
      <Button size='lg' onClick={() => {
        setShow(!show)
      }}> Toggle </Button>

      <Transition in={show} timeout={300} animation='zoom-in-left' wrapper>
        <div>this is a zoom-in-left transition</div>
        <div>this is a zoom-in-left transition</div>
        <div>this is a zoom-in-left transition</div>
        <div>this is a zoom-in-left transition</div>
        <div>this is a zoom-in-left transition</div>
        <Button>button</Button>
      </Transition>
    </React.Fragment>
  )
}