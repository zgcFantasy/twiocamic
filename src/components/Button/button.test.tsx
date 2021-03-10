import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

const defaultProps = {
  onClick: jest.fn() // jest 提供的 mock 函数
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: 'lg',
  className: 'class'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test button component', () => {
  // 默认 button
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() // 测试加载
    expect(element.tagName).toEqual('BUTTON') // 测试组件名称
    expect(element).toHaveClass('btn btn-default') // 测试 class
    fireEvent.click(element) // fireEvent 可以模仿用户触发事件
    expect(defaultProps.onClick).toHaveBeenCalled() // 测试指定事件是否被调用
    expect(element.disabled).toBeFalsy()

  })

  // 带 props 的 button
  it("should render the correct based on different props", () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument() // 测试加载
    expect(element).toHaveClass('btn-primary btn-lg class')
  })

  // 测试 link
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(<Button btnType='link' href="www.baidu.com">Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument() // 测试加载
    expect(element.tagName).toEqual('A') // 测试组件名称
    expect(element).toHaveClass('btn-link')

  })

  // 测试 disabled 按钮是否是无效的
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument() // 测试加载
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})