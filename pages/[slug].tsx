import { GetStaticProps, GetStaticPaths } from "next"
import Layout from "@/components/layout"
import Head from "next/head"
import MenuType from "@/types/menu"

import { getAllPageSlugs, getPageBySlug, getMenuBySlug } from "@/lib/api"

import utilStyles from "@/styles/utils.module.scss"

type Props = {
  postData: {
    title: string
    body: string
  }
  mainMenu: MenuType
}

export default function Post({ postData, mainMenu }: Props) {
  return (
    <Layout mainMenu={mainMenu}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.body }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for `slug`
  const paths = await getAllPageSlugs()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Fetch necessary data for the article using `params.slug`
  const postData = await getPageBySlug(params.slug as string)
  const mainMenu = await getMenuBySlug("main-navigation")
  return {
    props: {
      postData,
      mainMenu,
    },
  }
}
