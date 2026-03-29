import { NextResponse } from "next/server"
import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Product from "@/models/Product"
import Order from "@/models/Order"
import { getServerSession } from "next-auth"

export async function GET() {
  const session = await getServerSession()
  if (!session || (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()

  const [totalUsers, totalProducts, totalOrders, orders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.countDocuments(),
    Order.find().sort({ createdAt: -1 }).limit(5).populate("user", "name email"),
  ])

  const revenue = await Order.aggregate([
    { $match: { status: { $ne: "cancelled" } } },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ])

  return NextResponse.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: revenue[0]?.total || 0,
    latestOrders: orders,
  })
}