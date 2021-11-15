import React from "react"
import Link from "next/link"

import utilStyles from "@/styles/utils.module.scss"
import menuStyles from "@/styles/menu.module.scss"

export const Menu = ({ menuData }) => {
  console.log(menuData)
  return (
    <nav
      className={menuStyles.nav}
      role="navigation"
      aria-labelledby="block-umami-main-menu-menu"
    >
      <h2 className={utilStyles.visuallyHidden} id="block-umami-main-menu-menu">
        Main navigation
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
