import { GetStaticProps } from "next"
import Head from "next/head"
import Layout, { siteTitle } from "@/components/layout"
import Link from "next/link"
import Date from "@/components/date"
import { CMS_NAME } from "@/lib/constants"
import RecipeType from "@/types/recipe"
import MenuType from "@/types/menu"

import { getAllRecipes, getMenuBySlug } from "@/lib/api"
import { getPathFromSlug } from "@/lib/utils"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  allRecipes: RecipeType[]
  mainMenu: MenuType
}

export default function Home({ allRecipes, mainMenu }: Props) {
  return (
    <Layout home mainMenu={mainMenu}>
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
              <Link href={`/${getPathFromSlug("recipe", slug)}`}>
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
  const mainMenu = await getMenuBySlug("main-navigation")
  return {
    props: { allRecipes, mainMenu, preview },
  }
}
