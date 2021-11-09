import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import styles from "@/styles/layout.module.scss"
import utilStyles from "@/styles/utils.module.scss"

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
          <a>
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
