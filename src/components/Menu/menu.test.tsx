// import React from 'react'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './Menu'
import MenuItem from './MenuItem'
import SubMenu from './SubMenu'
const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: 'test'
}

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: 'vertical'
}


const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem >active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem >item3</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>
          drop1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
  .submenu{
    display:none;
  }
  .submenu.menu-opened{
    display:block;
  }
  `
  const style: HTMLStyleElement = document.createElement('style')
  style.innerHTML = cssFile
  return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
  // jest 生命周期函数之一
  // 在测试前预先加载一些 dom，减少重复代码
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    // 插入样式，不然样式方面不好检测
    wrapper.container.append(createStyleFile())
    // test id 在组件定义处设置
    menuElement = wrapper.getByTestId('test-menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  // 测试一个普通 Menu 是否能够正常工作
  it('should render correct Menu and MenuIten based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('menu test')
    // :scope 获取元素本身
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4) // 是否成功生成 3 个 item + 1 个 submenu li
    expect(activeElement).toHaveClass('menu-item is-active')
    expect(disabledElement).toHaveClass('menu-item is-disabled')

  })

  // 检查 onSelect 回调
  it('click items should change active and call the right callback', () => {
    const thirdItem = wrapper.getByText('item3') // 获取第三个 item，并模拟点击
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')
    expect(activeElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).toHaveBeenCalledWith("2") // 这里的 2 指 onSelect 传入的参数

    // disabled item 不应触发
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1")
  })

  // 垂直 Menu
  it('should render vertical mode when mode is set to vertical', () => {
    cleanup() // 手动清除预生成的 dom 树，每个 case 结尾也会自动调用
    const wrapper = render(generateMenu(testVerProps))
    const menuElement = wrapper.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu menu-vertical')

  })

  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText('drop1')).not.toBeUndefined() // queryByText 可以返回 null
    const subMenuElement = wrapper.getByText('dropdown')

    // 鼠标移入移出,点击
    fireEvent.mouseEnter(subMenuElement)

    // waitFor 会重复执行断言函数，直到成功或超时
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible() // queryByText 可以返回 null
    })


    fireEvent.click(wrapper.getByText('drop1'))
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
    fireEvent.mouseLeave(subMenuElement)
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible()
    })
  })


  // 垂直 Submenu
  it("show show dropdown items when click on vertical subMenu", () => {
    cleanup() // 手动清除预生成的 dom 树，每个 case 结尾也会自动调用
    const wrapper = render(generateMenu(testVerProps))
    wrapper.container.append(createStyleFile())
    const subMenuElement = wrapper.getByText('dropdown')
    fireEvent.click(subMenuElement)
    expect(wrapper.queryByText('drop1')).toBeVisible()
  })
})