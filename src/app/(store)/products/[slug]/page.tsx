import { getProductBySlug } from "@/lib/data/products"

interface Props {
  params: Promise<{ slug: string }>  // ← Changed to Promise
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params   // ← Unwrap the Promise here

  const product = await getProductBySlug(slug)

  if (!product) {
    return <p>Product not found</p>
  }

  return (
    <div className="max-w-4xl mx-auto p-10 grid grid-cols-2 gap-10">
      {/* Product Info */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl object-cover w-full h-96"
        />
        <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
        <p className="text-green-600 text-2xl font-semibold mt-2">
          ${product.price}
        </p>
        <p className="mt-4">{product.description}</p>
      </div>

      {/* Order Form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Phone Number"
            required
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Address"
            required
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Order Now
          </button>
        </form>
      </div>
    </div>
  )
}