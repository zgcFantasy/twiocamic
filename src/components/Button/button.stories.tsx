// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import Button, { ButtonProps } from './Button';


export default {
  title: 'Component/Button',
  component: Button
} as Meta;

// 默认按钮
export const DefaultButton: Story<ButtonProps> = (args) => {
  return (
    <Button {...args}>Default</Button>
  )
}
DefaultButton.args = {
  btnType: "default",
  onClick: () => { alert('这是一个按钮') }
}


// 按尺寸分开
export const BtnSizeList: Story<{ [btn: string]: ButtonProps }> = (args) => {
  const list: ButtonProps[] = []
  for (let i in args) {
    if (i.endsWith('Btn')) {
      list.push(args[i])
    }
  }
  return (
    <React.Fragment>
      {
        list.map((item, index) => {
          return (
            <div key={index} style={{ marginBottom: 20 }}>
              <Button {...item} onClick={() => { alert(item.children) }}>
              </Button>
            </div>
          )
        })
      }
    </React.Fragment>
  )
}
BtnSizeList.args = {
  LargeBtn: {
    size: 'lg',
    children: "Large",

  },
  MiddleBtn: {
    children: "Middle"
  },
  SmallBtn: {
    size: "sm",
    children: "Small"
  }
}

// 按类型区分
export const BtnTypeList: Story<{ [btn: string]: ButtonProps }> = (args) => {
  const list: ButtonProps[] = []
  for (let i in args) {
    if (i.endsWith('Btn')) {
      list.push(args[i])
    }
  }
  return (
    <React.Fragment>
      {
        list.map((item, index) => {
          return (
            <div key={index} style={{ marginBottom: 20 }}>
              <Button {...item} onClick={() => { alert(item.children + (item.href ? ' ' + item.href : '')) }}></Button>
            </div>
          )
        })
      }
    </React.Fragment>
  )
}
BtnTypeList.args = {
  PrimaryBtn: {
    btnType: 'primary',
    children: "Primary"
  },
  DangerBtn: {
    btnType: 'danger',
    children: "Danger"

  },
  DefaultBtn: {
    btnType: 'default',
    children: "Default"
  },
  LinkBtn: {
    btnType: 'link',
    href: '/',
    children: "Link"
  }
}




