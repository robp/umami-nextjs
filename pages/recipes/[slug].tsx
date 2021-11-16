import { GetStaticProps, GetStaticPaths } from "next"
import { getPlaiceholder } from "plaiceholder"
import Head from "next/head"
import Layout from "@/components/layout"
import Image from "next/image"
import Link from "next/link"
// import MediaImage from "@/components/media-image"
import RecipeType from "@/types/recipe"
import RecipeCategoryType from "@/types/recipe-category"
import TagType from "@/types/tag"
import MenuType from "@/types/menu"

import { getAllRecipeSlugs, getRecipeBySlug, getMenuBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"
import IngredientType from "@/types/ingredient"
import React from "react"

type Props = {
  recipe: RecipeType
  media_image_props: any
  mainMenu: MenuType
}

export default function Recipe({ recipe, media_image_props, mainMenu }: Props) {
  return (
    <Layout mainMenu={mainMenu}>
      <Head>
        <title>{recipe.title}</title>
      </Head>{" "}
      <article>
        <h1 className={utilStyles.headingXl}>{recipe.title}</h1>
        <p>
          Recipe Category:{" "}
          {recipe.recipe_categories.map((category: RecipeCategoryType) => {
            return (
              <React.Fragment key={category.id}>
                <Link href={`/recipe-category/${category.slug}`}>
                  {category.name}
                </Link>{" "}
              </React.Fragment>
            )
          })}
        </p>
        <p>
          Tags:{" "}
          {recipe.tags.map((tag: TagType) => {
            return (
              <React.Fragment key={tag.id}>
                <Link href={`/tags/${tag.slug}`}>{tag.name}</Link>{" "}
              </React.Fragment>
            )
          })}
        </p>{" "}
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        <Image
          priority={true}
          alt={recipe.media_image.alternativeText}
          {...media_image_props}
        />
        <div>
          <p>Preparation time: {recipe.preparation_time} minutes</p>
          <p>Cooking time: {recipe.cooking_time} minutes</p>
          <p>Number of servings: {recipe.number_of_servings}</p>
          <p>Difficulty: {recipe.difficulty}</p>
        </div>
        <div>
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ingredient: IngredientType) => (
              <li key={ingredient.id}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Recipe instruction</h2>
          <div
            dangerouslySetInnerHTML={{ __html: recipe.recipe_instruction }}
          />
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for `slug`
  const paths = await getAllRecipeSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the article using `params.slug`
  const recipe = await getRecipeBySlug(params?.slug as string)
  const { base64, img } = await getPlaiceholder(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${recipe?.media_image.url}`
  )
  const mainMenu = await getMenuBySlug("main-navigation")

  return {
    props: {
      recipe,
      media_image_props: {
        ...img,
        placeholder: "blur",
        blurDataURL: base64,
      },
      mainMenu,
    },
  }
}
