// import useSWR from "swr"
import { GetStaticProps } from "next"
import classNames from "classnames"
import Head from "next/head"
import Layout, { siteTitle } from "@/components/layout"
import Link from "next/link"
// import Alert from "@/components/alert"
import Date from "@/components/date"
import { CMS_NAME } from "@/lib/constants"
import PageType from "@/types/page"
import ArticleType from "@/types/article"
import RecipeType from "@/types/recipe"

import { getAllPostsForHome, getMenuBySlug } from "@/lib/api"
import { getPathFromSlug } from "@/lib/utils"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  allPages: PageType[]
  allArticles: ArticleType[]
  allRecipes: RecipeType[]
}

export default function Home({ allPages, allArticles, allRecipes }: Props) {
  // const { data, error } = useSWR("/api/hello", fetcher)
  // if (error) return `<div>failed to load: ${error}</div>`
  // if (!data) return <div>loading...</div>

  return (
    <Layout home>
      <Head>
        <title>
          {CMS_NAME}: {siteTitle}
        </title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1
          className={classNames(
            utilStyles.headingXl,
            utilStyles.visuallyHidden
          )}
        >
          Home
        </h1>
        <h2 className={utilStyles.headingLg}>Pages</h2>
        <ul className={utilStyles.list}>
          {allPages.map(({ id, slug, created_at, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/${getPathFromSlug("page", slug)}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={created_at} />
              </small>
            </li>
          ))}
        </ul>
        <h2 className={utilStyles.headingLg}>Articles</h2>
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
        <h2 className={utilStyles.headingLg}>Recipes</h2>
        <ul className={utilStyles.list}>
          {allRecipes.map(({ id, slug, created_at, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/${getPathFromSlug('recipe', slug)}`}>
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
  const [allPages, allArticles, allRecipes] =
    (await getAllPostsForHome(preview)) || []
  return {
    props: { allPages, allArticles, allRecipes, preview },
  }
}

// const fetcher = (...args) => fetch(...args).then(res => res.json())
