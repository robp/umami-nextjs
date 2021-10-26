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
