import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
// import { MainMenu } from "./main-menu"
import { Menu } from "./menu"

import styles from "@/styles/layout.module.scss"
import utilStyles from "@/styles/utils.module.scss"
import MenuType from "@/types/menu"

export const siteTitle = "Umami Food Magazine"

export default function Layout({
  children,
  home,
  mainMenu,
}: {
  children: React.ReactNode
  home?: boolean
  mainMenu: MenuType
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        <Link passHref={true} href="/">
          <a className={styles.siteLogo}>
            <Image
              priority
              src="/images/logo.svg"
              width={205}
              height={60}
              alt={siteTitle}
            />
          </a>
        </Link>
        <div className={utilStyles.visuallyHidden}>{siteTitle}</div>
        <Menu menuData={mainMenu} />
      </header>
      <main>{children}</main>
      <footer>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </footer>
    </div>
  )
}
