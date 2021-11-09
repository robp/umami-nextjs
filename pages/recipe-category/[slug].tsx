import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Layout from "@/components/layout"
// import Image from "next/image"

import RecipeCategoryType from "@/types/recipe-category"
import ArticleType from "@/types/article"
import RecipeType from "@/types/recipe"

import { getAllRecipeCategorySlugs, getRecipeCategoryBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  recipeCategory: RecipeCategoryType
  posts: [ArticleType | RecipeType]
}

export default function RecipeCategory({ recipeCategory, posts }: Props) {
  return (
    <Layout>
      <Head>
        <title>{recipeCategory.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{recipeCategory.name}</h1>
        <p>
          <div
            dangerouslySetInnerHTML={{ __html: recipeCategory.description }}
          />
        </p>
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
  return {
    props: {
      recipeCategory,
    },
  }
}
