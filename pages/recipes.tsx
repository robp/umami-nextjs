import { GetStaticProps } from "next"
import Head from "next/head"
import Layout, { siteTitle } from "@/components/layout"
import Link from "next/link"
import Date from "@/components/date"
import { CMS_NAME } from "@/lib/constants"
import RecipeType from "@/types/recipe"

import { getAllRecipes } from "@/lib/api"
import { getPathFromSlug } from "@/lib/utils"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  allRecipes: RecipeType[]
}

export default function Home({ allRecipes }: Props) {
  return (
    <Layout home>
      <Head>
        <title>
          {CMS_NAME}: {siteTitle}
        </title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingXl}>Recipes</h1>
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
  const allRecipes = (await getAllRecipes(preview)) || []
  return {
    props: { allRecipes, preview },
  }
}
