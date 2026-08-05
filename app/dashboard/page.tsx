"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/helpers/auth"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = React.useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    const { error } = await logout()

    if (error) {
      
      console.error("Logout error:", error.message)
    }

    router.refresh()
    router.push("/auth/login")
  }

  return (
    <div className="relative min-h-screen w-full bg-background overflow-hidden selection:bg-primary/20">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full opacity-60 dark:opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-accent/20 blur-[100px] rounded-full opacity-40" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            S
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Sage
          </span>
        </Link>

        <Button
          variant="outline"
          size="sm"
          disabled={isLoggingOut}
          onClick={handleLogout}
          className="gap-2 rounded-lg border-border/70 bg-background/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all"
        >
          {isLoggingOut ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <LogOut className="size-4" />
          )}
          <span>{isLoggingOut ? "Signing out…" : "Sign out"}</span>
        </Button>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground font-[family-name:var(--font-heading)]">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back! You&apos;re signed in.
          </p>
        </div>
      </main>
    </div>
  )
}
