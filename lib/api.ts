import RecipeType from "@/types/recipe"
import { markdownToHtml } from "./utils"

const fetchAPI = async (query, { variables } = { variables: {} }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error("Failed to fetch API")
  }

  return json.data
}

export const getAllArticleSlugs = async () => {
  const data = await fetchAPI(`
    {
      articles {
        slug
      }
    }
  `)
  return data?.articles?.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export const getMenuBySlug = async (slug: string) => {
  const data = await fetchAPI(
    `
    fragment MenuItemFragment on MenuItem {
      id
      title
      link
      menu {
        id
      }
      parent {
        id
      }
      content_link {
        __typename
        ... on ComponentMenuComponentsArticleLink {
          content: article {
            title
            slug
          }
        }
        ... on ComponentMenuComponentsPageLink {
          content: page {
            title
            slug
          }
        }
        ... on ComponentMenuComponentsRecipeLink {
          content: recipe {
            title
            slug
          }
        }
      }
    }
    fragment MenuItemsFragment on Menu {
      menu_items {
        ...MenuItemFragment
        children {
          ...MenuItemFragment
          children {
            ...MenuItemFragment
            children {
              ...MenuItemFragment
            }
          }
        }
      }
    }
    query MenuBySlug($where: JSON) {
      menus(where: $where) {
        id
        title
        slug
        ...MenuItemsFragment
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )

  return data?.menus[0]
}

export const getArticleBySlug = async (slug: string) => {
  const data = await fetchAPI(
    `
    query ArticleBySlug($where: JSON){
      articles(where: $where) {
        id
        slug
        created_at
        title
        body
        media_image {
          id
          name
          alternativeText
          caption
          width
          height
          url
          formats
        }
        tags {
          id
          name
          description
          slug
        }
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )

  let article = data?.articles[0]

  if (!article) {
    return null
  }

  // Convert markdown to HTML
  article.body = await markdownToHtml(article.body)

  return article
}

// export const getAllArticlesWithSlug = async () => {
//   const data = fetchAPI(`
//     {
//       articles {
//         slug
//       }
//     }
//   `)
//   return data?.articles
// }

export const getAllRecipeSlugs = async () => {
  const data = await fetchAPI(`
    {
      recipes {
        slug
      }
    }
  `)
  return data?.recipes?.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export const getRecipeBySlug = async (slug: string) => {
  const data = await fetchAPI(
    `
    query RecipeBySlug($where: JSON){
      recipes(where: $where) {
        id
        slug
        created_at
        title
        summary
        cooking_time
        difficulty
        ingredients {
          id
          name
        }
        media_image {
          id
          name
          alternativeText
          caption
          width
          height
          url
          formats
        }
        number_of_servings
        preparation_time
        recipe_instruction
        recipe_categories {
          id
          name
          description
          slug
        }
        tags {
          id
          name
          description
          slug
        }
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )

  let recipe: RecipeType = data?.recipes[0]

  if (!recipe) {
    return null
  }

  // Convert markdown to HTML
  recipe.summary = await markdownToHtml(recipe.summary)
  recipe.recipe_instruction = await markdownToHtml(recipe.recipe_instruction)

  return recipe
}

export const getAllPageSlugs = async () => {
  const data = await fetchAPI(`
    {
      pages {
        slug
      }
    }
  `)
  return data?.pages?.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export const getPageBySlug = async (slug: string) => {
  const data = await fetchAPI(
    `
    query PageBySlug($where: JSON){
      pages(where: $where) {
        id
        slug
        created_at
        title
        body
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )

  let page = data?.pages[0]

  if (!page) {
    return null
  }

  // Convert markdown to HTML
  page.body = await markdownToHtml(page.body)

  return page
}

export const getAllTagSlugs = async () => {
  const data = await fetchAPI(`
    {
      tags {
        slug
      }
    }
  `)
  return data?.tags?.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export const getTagBySlug = async (slug: string) => {
  const data = await fetchAPI(
    `
    query TagBySlug($where: JSON){
      tags(where: $where) {
        id
        name
        description
        slug
        articles {
          id
          created_at
          title
          slug
        }
        recipes {
          id
          created_at
          title
          slug
        }
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )

  let tag = data?.tags[0]

  if (!tag) {
    return null
  }

  // Convert markdown to HTML
  tag.description = await markdownToHtml(tag.description)

  return tag
}

export const getAllRecipeCategorySlugs = async () => {
  const data = await fetchAPI(`
    {
      recipeCategories {
        slug
      }
    }
  `)
  return data?.recipeCategories?.map(({ slug }) => {
    return {
      params: {
        slug,
      },
    }
  })
}

export const getRecipeCategoryBySlug = async (slug: string) => {
  const data = await fetchAPI(
    `
    query RecipeCategoryBySlug($where: JSON){
      recipeCategories(where: $where) {
        id
        name
        description
        slug
        recipes {
          id
          created_at
          title
          slug
        }
      }
    }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )

  let recipeCategory = data?.recipeCategories[0]

  if (!recipeCategory) {
    return null
  }

  // Convert markdown to HTML
  recipeCategory.description = await markdownToHtml(recipeCategory.description)

  return recipeCategory
}

export const getAllPostsForHome = async preview => {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      pages(sort: "id:asc", where: $where) {
        id
        slug
        created_at
        title
      }
      articles(sort: "id:asc", where: $where) {
        id
        slug
        created_at
        title
      }
      recipes(sort: "id:asc", where: $where) {
        id
        slug
        created_at
        title
      }
    }
  `
    // {
    //   variables: {
    //     where: {
    //       ...(preview ? {} : { status: "published" }),
    //     },
    //   },
    // }
  )

  return [data?.pages, data?.articles, data?.recipes]
}

export const getAllArticles = async preview => {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      articles(sort: "id:asc", where: $where) {
        id
        slug
        created_at
        title
      }
    }
  `
    // {
    //   variables: {
    //     where: {
    //       ...(preview ? {} : { status: "published" }),
    //     },
    //   },
    // }
  )

  return data?.articles
}

export const getAllRecipes = async preview => {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      recipes(sort: "id:asc", where: $where) {
        id
        slug
        created_at
        title
      }
    }
  `
    // {
    //   variables: {
    //     where: {
    //       ...(preview ? {} : { status: "published" }),
    //     },
    //   },
    // }
  )

  return data?.recipes
}

export const getPreviewPostBySlug = async slug => {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data?.posts[0]
}

// export const getAllPostsWithSlug = async () => {
//   const data = fetchAPI(`
//     {
//       posts {
//         slug
//       }
//     }
//   `)
//   return data?.allPosts
// }

// export const getPostAndMorePosts = async (slug, preview) => {
//   const data = await fetchAPI(
//     `
//   query PostBySlug($where: JSON, $where_ne: JSON) {
//     posts(where: $where) {
//       title
//       slug
//       content
//       date
//       ogImage: coverImage{
//         url
//       }
//       coverImage {
//         url
//       }
//       author {
//         name
//         picture {
//           url
//         }
//       }
//     }

//     morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
//       title
//       slug
//       excerpt
//       date
//       coverImage {
//         url
//       }
//       author {
//         name
//         picture {
//           url
//         }
//       }
//     }
//   }
//   `,
//     {
//       preview,
//       variables: {
//         where: {
//           slug,
//           ...(preview ? {} : { status: "published" }),
//         },
//         where_ne: {
//           ...(preview ? {} : { status: "published" }),
//           slug_ne: slug,
//         },
//       },
//     }
//   )
//   return data
// }
