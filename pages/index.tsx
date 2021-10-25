// import useSWR from "swr"
import { GetStaticProps } from "next"
import Head from "next/head"
import Layout, { siteTitle } from "@/components/layout"
import Link from "next/link"
// import Alert from "@/components/alert"
import Date from "@/components/date"
import { CMS_NAME } from "@/lib/constants"

// import { getSortedPostsData } from "@/lib/posts"
import { getAllPostsForHome } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"

export default function Home({
  allArticles,
  allRecipes,
}: {
  allArticles: {
    id: string
    Title: string
  }
  allRecipes: {
    id: string
    Title: string
  }
}) {
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
        <h2 className={utilStyles.headingLg}>Articles</h2>
        <ul className={utilStyles.list}>
          {allArticles.map(({ id, Slug, created_at, Title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/articles/${Slug}`}>
                <a>{Title}</a>
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
          {allRecipes.map(({ id, Slug, created_at, Title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/recipes/${Slug}`}>
                <a>{Title}</a>
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
  const [allArticles, allRecipes] = (await getAllPostsForHome(preview)) || []
  return {
    props: { allArticles, allRecipes, preview },
  }

  // const allPostsData = getSortedPostsData()
  // return {
  //   props: {
  //     allPostsData,
  //   },
  // }
}

const fetcher = (...args) => fetch(...args).then(res => res.json())
