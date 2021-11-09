import ArticleType from "./article"
import RecipeType from "./recipe"

type TagType = {
  id: string
  name: string
  description: string
  slug: string
  articles: [ArticleType]
  recipes: [RecipeType]
}

export default TagType
