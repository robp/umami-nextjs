import { GetStaticProps, GetStaticPaths } from "next"
import { getPlaiceholder } from "plaiceholder"
import Head from "next/head"
import Layout from "@/components/layout"
import Date from "@/components/date"
import Image from "next/image"
import Link from "next/link"
import ArticleType from "@/types/article"
import TagType from "@/types/tag"
import MenuType from "@/types/menu"

import { getAllArticleSlugs, getArticleBySlug, getMenuBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"
import React from "react"

type Props = {
  article: ArticleType
  media_image_props: any
  mainMenu: MenuType
}

export default function Article({
  article,
  media_image_props,
  mainMenu,
}: Props) {
  return (
    <Layout mainMenu={mainMenu}>
      <Head>
        <title>{article.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{article.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={article.created_at} />
        </div>
        <p>
          Tags:{" "}
          {article.tags.map((tag: TagType) => {
            return (
              <React.Fragment key={tag.id}>
                <Link href={`/tags/${tag.slug}`}>{tag.name}</Link>{" "}
              </React.Fragment>
            )
          })}
        </p>
        <Image
          priority={true}
          alt={article.media_image.alternativeText}
          {...media_image_props}
        />
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for `slug`
  const paths = await getAllArticleSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the article using `params.slug`
  const article = await getArticleBySlug(params?.slug as string)
  const external = article?.media_image.url.match(/:\/\//) !== null
  const { base64, img } = await getPlaiceholder(
    `${external ? "" : process.env.NEXT_PUBLIC_STRAPI_API_URL}${
      article?.media_image.url
    }`
  )
  const mainMenu = await getMenuBySlug("main-navigation")
  return {
    props: {
      article,
      media_image_props: {
        ...img,
        placeholder: "blur",
        blurDataURL: base64,
      },
      mainMenu,
    },
  }
}
