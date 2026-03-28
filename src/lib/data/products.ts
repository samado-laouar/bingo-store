import { connectDB } from "@/lib/db"
import Product from "@/models/Product"

export async function getProducts() {
  await connectDB()

  return Product.find().lean()
}

export async function getProductBySlug(slug: string) {
  await connectDB()

  return Product.findOne({ slug }).lean()
}