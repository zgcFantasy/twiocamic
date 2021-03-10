import { FC } from 'react'

import Menu, { MenuProps } from './Menu'
import MenuItem, { MenuItemProps } from './MenuItem'
import SubMenu, { SubMenuProps } from './SubMenu'

// 给 Menu 扩展一下属性，方便合并
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu