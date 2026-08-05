import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * OAuth callback handler.
 *
 * After the user authenticates with Google (or any OAuth provider),
 * Supabase redirects them here with a `code` query parameter.
 * This route handler exchanges that code for a session, then
 * redirects the user to the dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = searchParams.get("next") ?? "/dashboard"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If something went wrong, redirect to login with an error hint
  return NextResponse.redirect(`${origin}/auth/login?error=oauth_failed`)
}
