import React from "react"
import RecipeCategoryType from "@/types/recipe-category"
import Link from "next/link"
import { getPathFromSlug } from "@/lib/utils"

import utilStyles from "@/styles/utils.module.scss"
import styles from "@/styles/recipe-collections.module.scss"

type Props = {
  recipeCategories: RecipeCategoryType[]
}

export const RecipeCollections = ({ recipeCategories }: Props) => {
  return (
    <div>
      <h2 className={utilStyles.headingLg}>Recipe collections</h2>
      <ul className={styles.list}>
        {recipeCategories.map(recipeCategory => (
          <li key={recipeCategory.id}>
            <Link
              href={getPathFromSlug("recipe-category", recipeCategory.slug)}
            >
              <a>{recipeCategory.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
