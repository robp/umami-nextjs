import React, { useCallback, useEffect, useState } from "react"
import { Menu } from "./menu"
import { getMenuBySlug } from "@/lib/api"

export const MainMenu = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [menuData, setMenuData] = useState(null)

  const getMainMenu = useCallback(async () => {
    const data = await getMenuBySlug("main-navigation")
    setMenuData(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    getMainMenu()
  }, [getMainMenu])

  return !isLoading && <Menu menuData={menuData} />
}
