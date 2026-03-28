import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/lib/db"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()
    await connectDB()

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      )
    }

    user.password = await bcrypt.hash(password, 10)
    user.resetToken = null
    user.resetTokenExpiry = null
    await user.save()

    return NextResponse.json({ message: "Password reset successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}