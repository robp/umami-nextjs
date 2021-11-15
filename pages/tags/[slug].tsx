import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Layout from "@/components/layout"
import Link from "next/link"
// import Image from "next/image"

import TagType from "@/types/tag"
import ArticleType from "@/types/article"
import RecipeType from "@/types/recipe"

import { getAllTagSlugs, getTagBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  tag: TagType
}

export default function Tag({ tag }: Props) {
  console.log("articles", tag.articles)
  console.log("recipes", tag.recipes)

  return (
    <Layout>
      <Head>
        <title>{tag.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{tag.name}</h1>
        <div dangerouslySetInnerHTML={{ __html: tag.description }} />

        {tag.articles.length > 0 && (
          <>
            <h2 className={utilStyles.headingLg}>Articles</h2>
            <ul>
              {tag.articles.map((article: ArticleType) => {
                return (
                  <li key={article.id}>
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </>
        )}

        {tag.recipes.length > 0 && (
          <>
            <h2 className={utilStyles.headingLg}>Recipes</h2>
            <ul>
              {tag.recipes.map((recipe: RecipeType) => {
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
  const paths = await getAllTagSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the article using `params.slug`
  const tag = await getTagBySlug(params?.slug as string)
  return {
    props: {
      tag,
    },
  }
}
