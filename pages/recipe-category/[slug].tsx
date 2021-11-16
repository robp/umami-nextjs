import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Layout from "@/components/layout"
import Link from "next/link"
import RecipeCategoryType from "@/types/recipe-category"
import RecipeType from "@/types/recipe"
import MenuType from "@/types/menu"

import { getAllRecipeCategorySlugs, getRecipeCategoryBySlug, getMenuBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  recipeCategory: RecipeCategoryType
  mainMenu: MenuType
}

export default function RecipeCategory({ recipeCategory, mainMenu }: Props) {
  return (
    <Layout mainMenu={mainMenu}>
      <Head>
        <title>{recipeCategory.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{recipeCategory.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: recipeCategory.description }} />
        {recipeCategory.recipes.length > 0 && (
          <>
            <h2 className={utilStyles.headingLg}>Recipes</h2>
            <ul>
              {recipeCategory.recipes.map((recipe: RecipeType) => {
                return (
                  <li key={recipe.id}>
                    <Link href={`/recipes/${recipe.slug}`}>{recipe.title}</Link>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for `slug`
  const paths = await getAllRecipeCategorySlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the article using `params.slug`
  const recipeCategory = await getRecipeCategoryBySlug(params?.slug as string)
  const mainMenu = await getMenuBySlug("main-navigation")
  return {
    props: {
      recipeCategory,
      mainMenu,
    },
  }
}
