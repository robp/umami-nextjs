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

import { getAllRecipeSlugs, getRecipeBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"
import IngredientType from "@/types/ingredient"

type Props = {
  recipe: RecipeType
  media_image_props: any
}

export default function Recipe({ recipe, media_image_props }: Props) {
  return (
    <Layout>
      <Head>
        <title>{recipe.title}</title>
      </Head>{" "}
      <article>
        <h1 className={utilStyles.headingXl}>{recipe.title}</h1>
        <p>
          Recipe Category:{" "}
          {recipe.recipe_categories.map((category: RecipeCategoryType) => {
            return (
              <>
                <Link
                  key={category.id}
                  href={`/recipe-category/${category.slug}`}
                >
                  {category.name}
                </Link>{" "}
              </>
            )
          })}
        </p>
        <p>
          Tags:{" "}
          {recipe.tags.map((tag: TagType) => {
            return (
              <>
                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                  {tag.name}
                </Link>{" "}
              </>
            )
          })}
        </p>{" "}
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
        <p>
          <Image
            priority={true}
            alt={recipe.media_image.alternativeText}
            {...media_image_props}
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

  return {
    props: {
      recipe,
      media_image_props: {
        ...img,
        placeholder: "blur",
        blurDataURL: base64,
      },
    },
  }
}
