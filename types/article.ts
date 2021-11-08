import MediaImageType from "./media-image"
import TagType from "./tag"

type ArticleType = {
  id: string
  created_at: string
  title: string
  body: string
  media_image: MediaImageType
  tags: [TagType]
  slug: string
}

export default ArticleType
