"use client"

import { useState } from "react"

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value

    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    setMessage("If this email exists, a reset link has been sent.")
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-8 border rounded-xl">
        <h1 className="text-2xl font-bold">Forgot Password</h1>
        {message && <p className="text-green-600 text-sm">{message}</p>}
        <input name="email" type="email" placeholder="Your email" required className="border p-2 rounded" />
        <button type="submit" disabled={loading} className="bg-black text-white p-2 rounded">
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  )
}