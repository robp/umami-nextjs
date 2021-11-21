import IngredientType from "./ingredient"
import MediaImageType from "./media-image"
import RecipeCategoryType from "./recipe-category"
import TagType from "./tag"

type RecipeType = {
  id: string
  created_at: string
  title: string
  summary: string
  cooking_time: number
  difficulty: string
  ingredients: IngredientType[]
  media_image: MediaImageType
  number_of_servings: number
  preparation_time: number
  recipe_instruction: string
  recipe_categories: RecipeCategoryType[]
  tags: TagType[]
  slug: string
}

export default RecipeType
