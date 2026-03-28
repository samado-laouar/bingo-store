"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status])

  if (status === "loading") return <p>Loading...</p>

  return (
    <div className="max-w-md mx-auto mt-16 p-8 border rounded-xl">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p><span className="font-semibold">Name:</span> {session?.user.name}</p>
      <p><span className="font-semibold">Email:</span> {session?.user.email}</p>
      <p><span className="font-semibold">Role:</span> {session?.user.role}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}