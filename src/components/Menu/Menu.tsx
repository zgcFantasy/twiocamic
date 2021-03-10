import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'


type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectIndex: string) => void; // 定义 onSelect 的回调类型

export interface MenuProps {
  defaultIndex?: string, // 默认高亮项
  className?: string,
  mode?: MenuMode;
  style?: React.CSSProperties;
  defaultOpenSubMenus?: string[],
  onSelect?: SelectCallback // 针对于所有子项点击时的通用处理，通过回调执行
}

// 定义向 item 传递信息的格式
interface IMenuContext {
  index: string,
  onSelect?: SelectCallback,
  defaultOpenSubMenus?: string[],
  mode?: MenuMode
}

// 创建一个 context 向下输入数据
export const MenuContext = createContext<IMenuContext>({ index: "0" })

const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, onSelect, defaultOpenSubMenus, children } = props
  const [activeIndex, SetActive] = useState(defaultIndex)
  // 设置类名
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })

  // 点击更改 actived item 的 index，由子组件回调，更改 context.index
  const handleSelect: SelectCallback = (index: string) => {
    SetActive(index)
    if (onSelect) {
      onSelect(index)
    }
  }
  // 要发送的 Context
  const passedContext: IMenuContext = {
    index: activeIndex ? activeIndex : "0",
    onSelect: handleSelect,
    defaultOpenSubMenus,
    mode
  }

  // 做一个渲染前的预处理，保证子元素只渲染 MenuItem
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const displayName = childElement.type ? childElement.type.displayName : '' // 规避直接传入字符导致的错误
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        // 给子元素设置 index
        return React.cloneElement(childElement, {
          index: index.toString() // 这里的 index 为 map 循环时的 index
        })
      } else {
        console.error('Warning:Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    // data-testid 用于测试时获取元素
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: "0",
  mode: 'horizontal',
  defaultOpenSubMenus: []
}


export default Menu
