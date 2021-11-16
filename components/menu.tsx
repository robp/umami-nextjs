import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import MenuType from "@/types/menu"
import classNames from "classnames"

import utilStyles from "@/styles/utils.module.scss"
import menuStyles from "@/styles/menu.module.scss"

type Props = {
  menuData: MenuType
}

export const Menu = ({ menuData }: Props) => {
  const { asPath } = useRouter()
  const menuId = `${menuData.slug}-menu`
  return (
    <nav className={menuStyles.nav} role="navigation" aria-labelledby={menuId}>
      <h2 className={utilStyles.visuallyHidden} id={menuId}>
        {menuData.title}
      </h2>
      <ul className={menuStyles.menuMain}>
        {menuData.menu_items.map(menuItem => {
          const isActive = menuItem.link === asPath
          // Active Path must match a directory, with a trailing slash, so
          // ensure the link has a trailing slash before matching.
          const isActivePath = asPath.startsWith(menuItem.link.replace(/\/$/, '') + '/')
          return (
            <li key={menuItem.id} className={menuStyles.menuItem}>
              <Link href={menuItem.link}>
                <a className={classNames(menuStyles.menuLink, { [menuStyles.isActive]: isActive, [menuStyles.isActivePath]: isActivePath })}>
                  {menuItem.title}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
