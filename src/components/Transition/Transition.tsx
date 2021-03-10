import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

// 定义一个动画类型
type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-right' | 'zoom-in-bottom'


type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName,
  wrapper?: boolean // CSSTransitionProps 的 children只接受一个根节点,因此需要包裹
}

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    ...restProps
  } = props
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation} // 若不显示地指定 class,则 animation 会自动转为 class
      {...restProps}
    >
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  )
}
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
}

export default Transition