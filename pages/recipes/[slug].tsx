import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Image from "next/image"
import Layout from "@/components/layout"
import Date from "@/components/date"
import RecipeType from "@/types/recipe"
import RecipeCategoryType from "@/types/recipe-category"
import TagType from "@/types/tag"

import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"
import IngredientType from "@/types/ingredient"

type Props = {
  recipe: RecipeType
}

export default function Recipe({ recipe }: Props) {
  return (
    <Layout>
      <Head>
        <title>{recipe.title}</title>
      </Head>{" "}
      <article>
        <h1 className={utilStyles.headingXl}>{recipe.title}</h1>
        <p>
          Recipe Category:{" "}
          {recipe.recipe_categories.map(
            (category: RecipeCategoryType) => `${category.name} `
          )}
        </p>
        <p>Tags: {recipe.tags.map((tag: TagType) => `${tag.name} `)}</p>
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        <p>
          <Image
            src={recipe.media_image.url}
            alt={recipe.media_image.alternativeText}
            width={recipe.media_image.width}
            height={recipe.media_image.height}
          />
        </p>
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
          <div dangerouslySetInnerHTML={{ __html: recipe.recipe_instruction }} />
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
  const recipe = await getRecipeBySlug(params.slug as string)
  return {
    props: {
      recipe,
    },
  }
}
