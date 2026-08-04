import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

/**
 * Creates a Supabase client for use in Server Components, Route Handlers,
 * and Server Actions.
 *
 * This client:
 * - Reads the session from cookies (set by middleware)
 * - Can write cookies in Route Handlers / Server Actions
 * - Cannot write cookies in Server Components (swallowed in catch block — middleware handles it)
 *
 * Must be called with `await` because `cookies()` is async in Next.js 16.
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // Server Components cannot write cookies.
            // The @supabase/ssr middleware handles refresh-token rotation,
            // so this is safe to ignore here.
          }
        },
      },
    },
  )
}
