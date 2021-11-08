import { GetStaticProps, GetStaticPaths } from "next"
import Head from "next/head"
import Layout from "@/components/layout"
import Date from "@/components/date"
import ArticleType from "@/types/article"

import { getAllArticleSlugs, getArticleBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  article: ArticleType
}

export default function Article({ article }: Props) {
  return (
    <Layout>
      <Head>
        <title>{article.title}</title>
      </Head>{" "}
      <article>
        <h1 className={utilStyles.headingXl}>{article.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={article.created_at} />
        </div>
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
  return {
    props: {
      article,
    },
  }
}
