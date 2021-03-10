import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'

export interface MenuItemProps {
  index?: string,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties,
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  const context = useContext(MenuContext) // 接收 menu 传来的内容

  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index === index // 当传来的 index 和当前item 的 index 相同时，激活该类
  })

  // 点击时执行全局传来的 onSelect 函数，形成一种自定义事件
  const handleClick = () => {
    if (context.onSelect && !disabled && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}
MenuItem.displayName = 'MenuItem'
export default MenuItem
