import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogIn, UserPlus } from "lucide-react"

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6 bg-background">
      <div className="flex max-w-md w-full flex-col gap-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Sage Application</h1>
          <p className="text-muted-foreground text-sm">
            Authentication UI preview. Click below to access the login and signup routes.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Link href="/auth/login">
            <Button variant="default" className="gap-2">
              <LogIn className="size-4" />
              Log In
            </Button>
          </Link>

          <Link href="/auth/signup">
            <Button variant="outline" className="gap-2">
              <UserPlus className="size-4" />
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="font-mono text-xs text-muted-foreground pt-4 border-t border-border/40">
          Routes available: <code className="bg-muted px-1.5 py-0.5 rounded">/auth/login</code> & <code className="bg-muted px-1.5 py-0.5 rounded">/auth/signup</code>
        </div>
      </div>
    </div>
  )
}
