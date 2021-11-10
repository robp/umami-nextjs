import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "@/styles/layout.module.scss"
import utilStyles from "@/styles/utils.module.scss"
import menuStyles from "@/styles/menu.module.scss"

export const siteTitle = "Umami Food Magazine"

export default function Layout({
  children,
  home,
}: {
  children: React.ReactNode
  home?: boolean
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
        <nav
          className={menuStyles.nav}
          role="navigation"
          aria-labelledby="block-umami-main-menu-menu"
        >
          <h2
            className={utilStyles.visuallyHidden}
            id="block-umami-main-menu-menu"
          >
            Main navigation
          </h2>
          <ul className={menuStyles.menuMain}>
            <li className={menuStyles.menuItem}>
              <Link href="/">Home</Link>
            </li>
            <li className={menuStyles.menuItem}>
              <Link href="/articles">Articles</Link>
            </li>
            <li className={menuStyles.menuItem}>
              <Link href="/recipes">Recipes</Link>
            </li>
          </ul>
        </nav>
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
