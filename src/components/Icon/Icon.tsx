// 对 react-fontawesome 做一个二次封装

import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import React from 'react'
import classNames from 'classnames'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // fas 是 icons 的集合 

library.add(fas) // library 使所有 fontawesome 图标可以直接通过 iconName 调用

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'


// 主要是封装一些特定的风格颜色
export interface IconProps extends FontAwesomeIconProps {
  icon: IconProp,
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  const { theme, className, ...restProps } = props
  const classes = classNames('icon', className, {
    [`icon-${theme}`]: theme
  })

  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
}

export default Icon