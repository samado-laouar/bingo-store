import Sidebar from "@/components/admin/SideBar"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  // if (!session || (session.user as any).role !== "admin") {
  //   redirect("/")
  // }

  return (
    <div className="flex min-h-screen bg-[#f5f5f0]">
      <Sidebar user={session.user} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  )
}