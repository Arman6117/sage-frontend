"use client"

import * as React from "react"
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

export interface AuthFormProps {
  /** Mode of the authentication form: "login" or "signup" */
  type: "login" | "signup"
  /** Placeholder callback for form submission (no auth logic attached) */
  onSubmit?: (e: React.FormEvent) => void
  /** Placeholder callback for Google social auth */
  onGoogleClick?: () => void
  /** Placeholder callback for GitHub social auth */
  onGithubClick?: () => void
  /** Target link for login route (defaults to /auth/login) */
  loginUrl?: string
  /** Target link for signup route (defaults to /auth/signup) */
  signupUrl?: string
  /** Target link for forgot password route */
  forgotPasswordUrl?: string
}

export function AuthForm({
  type,
  onSubmit = (e) => e.preventDefault(),
  onGoogleClick = () => {},
  onGithubClick = () => {},
  loginUrl = "/auth/login",
  signupUrl = "/auth/signup",
  forgotPasswordUrl = "#",
}: AuthFormProps) {
  const isLogin = type === "login"

  return (
    <Card className="w-full max-w-[400px] border-border/60 bg-card/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
      <CardHeader className="space-y-1.5 text-center pt-8 pb-6 px-6 sm:px-8">
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
        <div className="relative flex items-center justify-center my-1">
          <Separator className="w-full" />
          <span className="absolute bg-card px-2.5 text-[11px] font-medium tracking-wider uppercase text-muted-foreground/80">
            or continue with email
          </span>
        </div>

        {/* Form Fields (Presentation only - no auth logic) */}
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-xs font-semibold text-foreground/90">
              Email address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              className="h-10 rounded-lg bg-background/50 border-border/70 focus-visible:ring-ring/50"
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs font-semibold text-foreground/90">
                Password
              </Label>
              {isLogin && (
                <Link
                  href={forgotPasswordUrl}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
              className="h-10 rounded-lg bg-background/50 border-border/70 focus-visible:ring-ring/50"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-10 mt-2 font-medium rounded-lg shadow-sm transition-all"
          >
            {isLogin ? "Sign in with Email" : "Create account"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-border/40 bg-muted/20 py-4 px-6 sm:px-8 mt-2">
        <p className="text-xs text-muted-foreground text-center">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <Link
                href={signupUrl}
                className="font-medium text-foreground hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href={loginUrl}
                className="font-medium text-foreground hover:underline underline-offset-4"
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
