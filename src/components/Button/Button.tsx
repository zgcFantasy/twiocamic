import React from 'react'
import classNames from 'classnames' // 用于拼接类名

// 尺寸信息
// middle 大小是默认样式
type ButtonSize = 'lg' | 'sm'

// 按钮类型
type ButtonType = 'primary' | 'default' | 'danger' | 'link' // 链接类型


// 显式定义常用 Button 属性（一部分自定义）
interface BaseButtonProps {
  // className?: string,
  btnType?: ButtonType,
  size?: ButtonSize,
  disabled?: boolean, // 表示有效与无效状态
  href?: string, // 链接地址
  // children?: React.ReactNode; // 虚拟 DOM 的基本构件，包括 ReactElement，ReactText 等一系列类型。FC 自带
}

// 获取 button 和 a 的所有属性
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement> // 合并 Button 特有及其继承链上的属性和方法，HTMLElement 也有一部分属性
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>
type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps> // Partial 使得泛型中的属性变为可选

// 定义组件
const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    btnType,
    size,
    disabled,
    href,
    children,
    ...restProps // 剩下的属性，代表原生属性
  } = props

  // 格式 btn, btn-lg, btn-primary....
  // btn 是自带项，后面的是可选的，最后加上用户自定义 class
  const classes = classNames('btn', {
    [`btn-${btnType}`]: btnType,  // 名称为变量，注意加中括号
    [`btn-${size}`]: size,
    'disabled': (btnType === "link") && disabled
  }, className)

  if (btnType === "link" && href) {
    return (
      <a
        className={classes}
        href={href}
        {...restProps} // 扩展开后会自动变为 attributes
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  btnType: "default",
  disabled: false
}
Button.displayName = 'Button'

export type { ButtonProps, ButtonSize, ButtonType }
export default Button