import { createBrowserClient } from "@supabase/ssr"

/**
 * Creates a Supabase client for use in Client Components (browser).
 *
 * This client:
 * - Stores the session in cookies (via @supabase/ssr defaults)
 * - Handles automatic token refresh on the client side
 * - Is safe to call repeatedly — @supabase/ssr deduplicates instances
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  )
}
