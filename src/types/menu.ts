import MenuItemType from "./menu-item"

type MenuType = {
  id: string
  title: string
  slug: string
  menu_items: MenuItemType[]
}

export default MenuType
