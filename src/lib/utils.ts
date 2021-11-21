import remark from "remark"
import html from "remark-html"

/**
 * Convert the supplied markdown into HTML.
 * @param markdown
 * @returns {string}
 */
export const markdownToHtml = async (markdown: string) => {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(markdown)
  return processedContent.toString()
}

/**
 * Returns the relative URL of the content item specifie by the parameters.
 * @param type
 * @param slug
 * @returns {string}
 */
export const getPathFromSlug = (type: string, slug: string) => {
  switch (type) {
    case "article":
      return `articles/${slug}`
    case "recipe":
      return `recipes/${slug}`
    case "recipe-category":
      return `recipe-category/${slug}`
    case "tag":
      return `tags/${slug}`
    default:
      return slug
  }
}
