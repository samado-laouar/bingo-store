import { getProducts } from "@/lib/data/products"
import { ProductCard } from "@/components/store/product-card"

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-4 gap-6 p-10">
      {products.map((product: any) => (
        <ProductCard
          key={product._id}
          name={product.name}
          slug={product.slug}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  )
}