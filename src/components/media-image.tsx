import Image from "next/image"
// import { getPlaiceholder } from "plaiceholder"

type Props = {
  src: string
  alt: string
  width: number
  height: number
  priority: boolean
}

export default function MediaImage({
  src,
  alt,
  width,
  height,
  priority,
}: Props) {
  let isLoading = false
  const imageUrl = `${
    src.startsWith("/") ? process.env.NEXT_PUBLIC_STRAPI_API_URL : ""
  }${src}`

  // let blurDataURL

  // Create a base64 blurred placeholder image.
  // try {
  //   isLoading = true
  //   getPlaiceholder(imageUrl, { size: 64 }).then(({ base64 }) => {
  //     console.log(base64)
  //     blurDataURL = base64
  //     isLoading = false
  //   })
  // } catch (err) {
  //   err
  // }

  return (
    <Image
      // placeholder={placeholder}
      // blurDataURL={blurDataURL}
      priority={priority}
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
    />
  )
}
