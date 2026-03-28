import ProductPrice from "./ProductPrice"

interface Props {
  name: string
  price: number
}

export default function ProductInfo({ name, price }: Props) {
  return (
    <div className="p-4 space-y-2">
      <h3 className="font-medium text-lg">
        {name}
      </h3>

      <ProductPrice price={price} />
    </div>
  )
}