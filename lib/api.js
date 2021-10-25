const fetchAPI = async (query, { variables } = {}) => {
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

export const getAllPostsWithSlug = async () => {
  const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)
  return data?.allPosts
}

export const getAllPostsForHome = async preview => {
  const data = await fetchAPI(
    `
    query Posts($where: JSON){
      articles(sort: "id:asc", where: $where) {
        id
        Slug
        created_at
        Title
      }
      recipes(sort: "id:asc", where: $where) {
        id
        Slug
        created_at
        Title
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
  return [data?.articles, data?.recipes]
}

export const getPostAndMorePosts = async (slug, preview) => {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON, $where_ne: JSON) {
    posts(where: $where) {
      title
      slug
      content
      date
      ogImage: coverImage{
        url
      }
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }

    morePosts: posts(sort: "date:desc", limit: 2, where: $where_ne) {
      title
      slug
      excerpt
      date
      coverImage {
        url
      }
      author {
        name
        picture {
          url
        }
      }
    }
  }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: "published" }),
        },
        where_ne: {
          ...(preview ? {} : { status: "published" }),
          slug_ne: slug,
        },
      },
    }
  )
  return data
}
