import RecipeType from "./recipe"

type RecipeCategoryType = {
  id: string
  name: string
  description: string
  slug: string
  recipes: [RecipeType]
}

export default RecipeCategoryType
