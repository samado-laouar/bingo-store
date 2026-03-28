import Image from "next/image"

interface Props {
  src: string
  alt: string
}

export default function ProductImage({ src, alt }: Props) {
  return (
    <div className="relative h-60 w-full">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover rounded-t-xl"
      />
    </div>
  )
}