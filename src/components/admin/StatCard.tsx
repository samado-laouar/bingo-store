import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: string
  sub?: string
}

export default function StatCard({ title, value, icon: Icon, color, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 flex items-start justify-between shadow-sm border border-gray-100">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  )
}