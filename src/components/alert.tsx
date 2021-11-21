import cn from "classnames"
import styles from "@/styles/alert.module.scss"

type Props = {
  children: React.ReactNode
  type: string
}

export default function Alert({ children, type }: Props) {
  return (
    <div
      className={cn({
        [styles.success]: type === "success",
        [styles.error]: type === "error",
      })}
    >
      {children}
    </div>
  )
}
