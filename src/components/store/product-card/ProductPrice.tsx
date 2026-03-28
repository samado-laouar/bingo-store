interface Props {
  price: number
}

export default function ProductPrice({ price }: Props) {
  return (
    <p className="text-lg font-semibold text-green-600">
      ${price}
    </p>
  )
}