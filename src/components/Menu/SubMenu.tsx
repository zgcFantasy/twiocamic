import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { MenuContext } from './Menu'
import { MenuItemProps } from './MenuItem'
import Icon from '../Icon/'
import Transition from '../Transition/'
export interface SubMenuProps {
  index?: string,
  title: string,
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpened = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false
  const [menuOpen, setOpen] = useState(isOpened) // 子菜单显示与否

  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index,
    'is-opened': menuOpen,
    'is-vertical': context.mode === 'vertical'
  })

  // 点击更改子菜单的显示状态
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
    if (context.onSelect && (typeof index === 'string')) {
      context.onSelect(index)
    }
  }

  // 鼠标进入离开也会更改显示
  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    // 调整鼠标进入与离开时的延时
    if (toggle === true) {
      timer = setTimeout(() => {
        setOpen(toggle)
      }, 50)
    } else {
      timer = setTimeout(() => {
        setOpen(toggle)
      }, 200)
    }
  }

  // 根据 Menu 类型，生成对应的事件，在 tsx 处进行解构赋值，展开即可
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}
  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false)
    }
  } : {}

  // 渲染子组件，过滤非 MenuItem 内容
  const renderChildren = () => {
    const subMenuClasses = classNames('submenu', {
      'menu-opened': menuOpen,
      'is-active': context.index === index // 当传来的 index 和当前item 的 index 相同时，激活该类
    })
    const childrenComponent = React.Children.map(children, (child, subIndex) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const displayName = childElement.type ? childElement.type.displayName : '' // 规避直接传入字符导致的错误
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index: `${index}-${subIndex}` // 这里的 index 为 map 循环时的 index
        })
      } else {
        console.error('Warning:Menu has a child which is not a MenuItem component')
      }
    })
    return (
      <Transition
        animation="zoom-in-top"
        in={menuOpen} // 触发条件
        timeout={300}
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>

    )
  }


  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title'{...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu