"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Store,
} from "lucide-react"

const navItems = [
  { label: "Home", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#0f0f0f] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Store size={20} className="text-amber-400" />
          <span className="text-lg font-bold tracking-tight">BINGO STORE</span>
        </div>
        <p className="text-xs text-white/40 mt-1 ml-7">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? "bg-amber-400 text-black"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Profile + Logout */}
      <div className="px-3 py-5 border-t border-white/10 space-y-1">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg">
          <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-white/40 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-all"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  )
}