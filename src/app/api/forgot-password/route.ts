import { NextResponse } from "next/server"
import crypto from "crypto"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      // Return success anyway to not expose if email exists
      return NextResponse.json({ message: "If this email exists, a reset link has been sent." })
    }

    const token = crypto.randomBytes(32).toString("hex")
    user.resetToken = token
    user.resetTokenExpiry = new Date(Date.now() + 1000 * 60 * 60) // 1 hour
    await user.save()

    // TODO: Send email with this link
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
    console.log("Reset link:", resetLink) // Replace with real email later

    return NextResponse.json({ message: "If this email exists, a reset link has been sent." })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}