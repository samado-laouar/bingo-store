import { connectDB } from "@/lib/db"
import Product from "@/models/Product"
import { createSlug } from "@/lib/slug"

export async function GET() {
  await connectDB()

  const products = await Product.find()

  return Response.json(products)
}

export async function POST(req: Request) {
  await connectDB()

  const body = await req.json()

  const slug = createSlug(body.name)

  const product = await Product.create({
    ...body,
    slug,
  })

  return Response.json(product)
}