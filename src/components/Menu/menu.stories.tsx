// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { default as Menu } from './index'


export default {
  title: 'Component/Menu',
  component: Menu
} as Meta;

// 默认按钮
export const HorizontalMenu: Story = (args) => {
  return (
    <Menu defaultIndex="0" onSelect={(index) => alert(index)}>
      <Menu.Item >MenuItem 0</Menu.Item>
      <Menu.Item disabled>MenuItem 1(disabled)</Menu.Item>
      <Menu.Item >MenuItem 2</Menu.Item>
    </Menu>
  )
}

// 垂直排布
export const VerticalMenu: Story = (args) => {
  return (
    <Menu defaultIndex="0" onSelect={(index) => alert(index)} mode={"vertical"}>
      <Menu.Item >MenuItem 0</Menu.Item>
      <Menu.Item disabled>MenuItem 1(disabled)</Menu.Item>
      <Menu.Item >MenuItem 2</Menu.Item>
    </Menu>
  )
}

// Submenut 水平排布
export const HorizontalSubMenu: Story = (args) => {
  return (
    <Menu defaultIndex="0">
      <Menu.SubMenu title="SubMenu 0">
        <Menu.Item>MenuItem 0-0</Menu.Item>
        <Menu.Item>MenuItem 0-1</Menu.Item>
        <Menu.Item>MenuItem 0-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="SubMenu 1">
        <Menu.Item>MenuItem 1-0</Menu.Item>
        <Menu.Item>MenuItem 1-1</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item>MenuItem 2</Menu.Item>
    </Menu>
  )
}


// Submenu 垂直排布
export const VerticalSubMenu: Story = (args) => {
  return (
    <Menu defaultIndex="0" mode="vertical">
      <Menu.SubMenu title="SubMenu 0">
        <Menu.Item>MenuItem 0-0</Menu.Item>
        <Menu.Item>MenuItem 0-1</Menu.Item>
        <Menu.Item>MenuItem 0-2</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="SubMenu 1">
        <Menu.Item>MenuItem 1-0</Menu.Item>
        <Menu.Item>MenuItem 1-1</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu title="SubMenu 2">
        <Menu.Item>MenuItem 2-0</Menu.Item>
        <Menu.Item>MenuItem 2-1</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

