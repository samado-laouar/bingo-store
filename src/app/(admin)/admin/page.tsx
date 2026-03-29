import { connectDB } from "@/lib/db"
import User from "@/models/User"
import Product from "@/models/Product"
import Order from "@/models/Order"
import StatCard from "@/components/admin/StatCard"
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"

async function getStats() {
  await connectDB()

  const [totalUsers, totalProducts, totalOrders, orders, revenue] =
    await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "name email")
        .lean(),
      Order.aggregate([
        { $match: { status: { $ne: "cancelled" } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
    ])

  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: revenue[0]?.total || 0,
    latestOrders: orders,
  }
}

const statusStyles: Record<string, string> = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
}

export default async function AdminDashboard() {
  const { totalUsers, totalProducts, totalOrders, totalRevenue, latestOrders } =
    await getStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-amber-400"
          sub="All time"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingCart}
          color="bg-blue-500"
          sub="All time"
        />
        <StatCard
          title="Products"
          value={totalProducts}
          icon={Package}
          color="bg-violet-500"
          sub="In catalog"
        />
        <StatCard
          title="Users"
          value={totalUsers}
          icon={Users}
          color="bg-emerald-500"
          sub="Registered"
        />
      </div>

      {/* Latest Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Latest Orders</h2>
          <a href="/admin/orders" className="text-xs text-amber-500 hover:underline font-medium">
            View all →
          </a>
        </div>

        {latestOrders.length === 0 ? (
          <p className="px-6 py-8 text-sm text-gray-400 text-center">
            No orders yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {latestOrders.map((order: any) => (
                  <tr key={order._id.toString()} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                      #{order._id.toString().slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-800">{order.user?.name || "Guest"}</p>
                      <p className="text-xs text-gray-400">{order.user?.email}</p>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}