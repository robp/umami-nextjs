import React from "react"
import Link from "next/link"
import MenuType from "@/types/menu"

import utilStyles from "@/styles/utils.module.scss"
import menuStyles from "@/styles/menu.module.scss"

type Props = {
  menuData: MenuType
}

export const Menu = ({ menuData }: Props) => {
  const menuId = `${menuData.slug}-menu`
  return (
    <nav className={menuStyles.nav} role="navigation" aria-labelledby={menuId}>
      <h2 className={utilStyles.visuallyHidden} id={menuId}>
        {menuData.title}
      </h2>
      <ul className={menuStyles.menuMain}>
        {menuData.menu_items.map(menuItem => (
          <li key={menuItem.id} className={menuStyles.menuItem}>
            <Link href={menuItem.link}>{menuItem.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
