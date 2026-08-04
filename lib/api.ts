import { createClient } from "@/lib/supabase/client"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

/**
 * Fetch wrapper that automatically attaches the user's Supabase JWT
 * to requests made to the Express backend.
 *
 * Usage:
 *   const data = await api("/api/some-endpoint")
 *   const data = await api("/api/items", { method: "POST", body: JSON.stringify({ name: "test" }) })
 */
export async function api<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  }

  // Attach the access token if the user is logged in
  if (session?.access_token) {
    ;(headers as Record<string, string>)["Authorization"] =
      `Bearer ${session.access_token}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }))
    throw new Error(error.message || `API error: ${response.status}`)
  }

  return response.json()
}
