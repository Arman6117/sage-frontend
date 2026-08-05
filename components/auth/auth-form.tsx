"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { AuthFormData } from "@/lib/types/auth";


export interface AuthFormProps {
  /** Mode of the authentication form: "login" or "signup" */
  type: "login" | "signup"
  /** Callback for form submission */
  onSubmit?: (data: AuthFormData) => void
  /** Callback for Google social auth */
  onGoogleClick?: () => void
  /** Callback for GitHub social auth */
  onGithubClick?: () => void
  /** Target link for login route (defaults to /auth/login) */
  loginUrl?: string
  /** Target link for signup route (defaults to /auth/signup) */
  signupUrl?: string
  /** Target link for forgot password route */
  forgotPasswordUrl?: string
  /** Whether the form is currently submitting */
  isLoading?: boolean
  /** Error message to display */
  errorMessage?: string
}

export function AuthForm({
  type,
  onSubmit = () => {},
  onGoogleClick = () => {},
  onGithubClick = () => {},
  loginUrl = "/auth/login",
  signupUrl = "/auth/signup",
  forgotPasswordUrl = "#",
  isLoading = false,
  errorMessage,
}: AuthFormProps) {
  const isLogin = type === "login"
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit({ email, password })
  }
  return (
    <Card className="w-full max-w-[400px] overflow-hidden rounded-2xl border-border/60 bg-card/80 shadow-2xl backdrop-blur-xl">
      <CardHeader className="space-y-1.5 px-6 pt-8 pb-6 text-center sm:px-8">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          {isLogin ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          {isLogin
            ? "Enter your credentials to access your account"
            : "Enter your details to create your new account"}
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-5 px-6 sm:px-8">
        {/* Social Authentication Buttons */}
        <SocialAuthButtons
          onGoogleClick={onGoogleClick}
          onGithubClick={onGithubClick}
        />

        {/* Divider */}
        <div className="relative my-1 flex items-center justify-center">
          <Separator className="w-full" />
          <span className="absolute bg-card px-2.5 text-[11px] font-medium tracking-wider text-muted-foreground/80 uppercase">
            or continue with email
          </span>
        </div>

        {/* Form Fields (Presentation only - no auth logic) */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label
              htmlFor="email"
              className="text-xs font-semibold text-foreground/90"
            >
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="h-10 rounded-lg border-border/70 bg-background/50 focus-visible:ring-ring/50"
            />
          </div>

          <div className="relative grid gap-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-xs font-semibold text-foreground/90"
              >
                Password
              </Label>
              {isLogin && (
                <Link
                  href={forgotPasswordUrl}
                  className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="h-10 rounded-lg border-border/70 bg-background/50 focus-visible:ring-ring/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-3 top-11 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-10 w-full rounded-lg font-medium shadow-sm transition-all"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isLogin ? (
              "Sign in with Email"
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="mt-2 flex justify-center border-t border-border/40 bg-muted/20 px-6 py-4 sm:px-8">
        <p className="text-center text-xs text-muted-foreground">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <Link
                href={signupUrl}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href={loginUrl}
                className="font-medium text-foreground underline-offset-4 hover:underline"
              >
                Sign in
              </Link>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  )
}
