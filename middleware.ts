import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes qui nécessitent une authentification
const protectedRoutes: string[] = [] // Temporarily removed /soumettre-projet for debugging

// Routes d'authentification
const authRoutes = ["/auth/login", "/auth/register"]

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  const pathname = request.nextUrl.pathname

  // Vérifier si l'utilisateur tente d'accéder à une route protégée
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Vérifier si l'utilisateur est sur une route d'authentification
  const isAuthRoute = authRoutes.some((route) => pathname === route)

  // Si l'utilisateur n'est pas connecté et tente d'accéder à une route protégée
  if (isProtectedRoute && !session) {
    const url = new URL("/auth/login", request.url)
    url.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(url)
  }

  // Si l'utilisateur est connecté et tente d'accéder à une route d'authentification
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
