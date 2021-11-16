import { GetStaticProps } from "next"
import Head from "next/head"
import Layout, { siteTitle } from "@/components/layout"
import Link from "next/link"
import Date from "@/components/date"
import { CMS_NAME } from "@/lib/constants"
import ArticleType from "@/types/article"
import MenuType from "@/types/menu"

import { getAllArticles, getMenuBySlug } from "@/lib/api"
import { getPathFromSlug } from "@/lib/utils"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  allArticles: ArticleType[]
  mainMenu: MenuType
}

export default function Home({ allArticles, mainMenu }: Props) {
  return (
    <Layout home mainMenu={mainMenu}>
      <Head>
        <title>
          {CMS_NAME}: {siteTitle}
        </title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>Articles</h1>
        <ul className={utilStyles.list}>
          {allArticles.map(({ id, slug, created_at, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/${getPathFromSlug("article", slug)}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={created_at} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ preview = null }) => {
  const allArticles = (await getAllArticles(preview)) || []
  const mainMenu = await getMenuBySlug("main-navigation")
  return {
    props: { allArticles, mainMenu, preview },
  }
}
