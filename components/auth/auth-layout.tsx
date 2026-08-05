import * as React from "react"
import Link from "next/link"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between bg-background overflow-hidden selection:bg-primary/20">
      {/* Subtle SaaS Background Gradients / Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/10 blur-[120px] rounded-full opacity-60 dark:opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-accent/20 blur-[100px] rounded-full opacity-40" />
        
        {/* Fine Mesh Grid lines (Linear / Vercel style) */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* Header with Brand Logo */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="size-8 rounded-lg bg-foreground text-background flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
            S
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground">
            Sage
          </span>
        </Link>
      </header>

      {/* Centered Auth Card Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full px-4 py-8">
        {children}
      </main>

      {/* Footer Links */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 text-center text-xs text-muted-foreground/70 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/20">
        <p>© {new Date().getFullYear()} Sage. All rights reserved.</p>
        {/* <div className="flex items-center gap-6">
          <Link href="#" className="hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Help & Support
          </Link>
        </div> */}
      </footer>
    </div>
  )
}
