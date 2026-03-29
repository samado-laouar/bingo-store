import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

//   // Protect /admin routes
//   if (pathname.startsWith("/admin")) {
//     if (!token) return NextResponse.redirect(new URL("/login", req.url))
//     if (token.role !== "admin") return NextResponse.redirect(new URL("/", req.url))
//   }

  // Protect /profile
  if (pathname.startsWith("/profile")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
}
