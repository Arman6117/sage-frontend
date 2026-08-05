import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

/**
 * Next.js middleware that refreshes the Supabase access token cookie
 * on every request.
 *
 * Why this is required:
 * - The access token stored in cookies has a short TTL (default 1 hour)
 * - Server Components CANNOT write cookies, so they can't rotate tokens
 * - This middleware intercepts every request, calls getUser() which triggers
 *   a token refresh if needed, and writes the new cookies to the response
 * - Without this, users appear logged out once the token expires
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // Forward cookies to the request (for downstream Server Components)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          // Create a new response with the updated request
          supabaseResponse = NextResponse.next({ request })
          // Write cookies to the response (for the browser)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // Triggers token refresh. The result isn't used directly —
  // the side effect (cookie writes via setAll) is what matters.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect unauthenticated users to login, except for auth pages
  const protectedRoutes =['/dashboard', '/collections', '/settings', '/chat']
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")
const isProtectedRoute = protectedRoutes.some(route =>
  request.nextUrl.pathname.startsWith(route)
)
                

  if (!user  && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/auth/login"
    return NextResponse.redirect(loginUrl)
  }

  // Redirect logged-in users away from auth pages
  if (user && isAuthRoute) {
    const homeUrl = request.nextUrl.clone()
    homeUrl.pathname = "/dashboard"
    return NextResponse.redirect(homeUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
