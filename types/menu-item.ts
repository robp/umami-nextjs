import MenuType from "./menu"

type MenuItemType = {
  id: string
  title: string
  link: string
  menu: {
    id: string
  }
  parent: {
    id: string
  }
  children: MenuItemType[]
}

export default MenuItemType
