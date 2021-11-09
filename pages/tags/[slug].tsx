import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Layout from "@/components/layout"
// import Image from "next/image"

import TagType from "@/types/tag"
import ArticleType from "@/types/article"
import RecipeType from "@/types/recipe"

import { getAllTagSlugs, getTagBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  tag: TagType
  posts: [ArticleType | RecipeType]
}

export default function Tag({ tag, posts }: Props) {
  return (
    <Layout>
      <Head>
        <title>{tag.name}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{tag.name}</h1>
        <p>
          <div dangerouslySetInnerHTML={{ __html: tag.description }} />
        </p>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for `slug`
  const paths = await getAllTagSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the article using `params.slug`
  const tag = await getTagBySlug(params?.slug as string)
  return {
    props: {
      tag,
    },
  }
}
