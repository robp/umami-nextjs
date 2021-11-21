// import React, { useCallback, useEffect, useState } from "react"
// import { Menu } from "./menu"
// import { getMenuBySlug } from "@/lib/api"

/**
 * Component that loads the main menu using with a client-side API request.
 * The delay in loading the data causes pretty harsh CLS and a poor UX.
 * Nevertheless it serves as a simple example of how to use the functions in
 * lib/api.ts to load data on the client.
 * @returns
 */
export const MainMenu = () => {
  // const [isLoading, setIsLoading] = useState(true)
  // const [menuData, setMenuData] = useState(null)

  // const getMainMenu = useCallback(async () => {
  //   const data = await getMenuBySlug("main-navigation")
  //   setMenuData(data)
  //   setIsLoading(false)
  // }, [])

  // useEffect(() => {
  //   getMainMenu()
  // }, [getMainMenu])

  // return !isLoading && <Menu menuData={menuData} />
  return null
}
