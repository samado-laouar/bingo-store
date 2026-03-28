import Link from "next/link"
import ProductImage from "./ProductImage"
import ProductInfo from "./ProductInfo"

interface Props {
  name: string
  slug: string
  price: number
  image: string
}

export default function ProductCard({
  name,
  slug,
  price,
  image,
}: Props) {
  return (
    <Link
      href={`/products/${slug}`}
      className="border rounded-xl overflow-hidden hover:shadow-lg transition"
    >
      <ProductImage src={image} alt={name} />

      <ProductInfo name={name} price={price} />
    </Link>
  )
}