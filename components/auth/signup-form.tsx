"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { AuthForm } from "@/components/auth/auth-form"
import { signup, loginWithGoogle } from "@/lib/helpers/auth"
import { AuthFormData } from "@/lib/types/auth"
import { signupSchema } from "@/lib/schemas/auth"

const SignupForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  const handleSignup = async ({ email, password }: AuthFormData) => {
    setErrorMessage(undefined)

    const result = signupSchema.safeParse({ email, password })
    if (!result.success) {
      setErrorMessage(result.error.issues[0].message)
      return
    }

    setIsLoading(true)

    const { data, error } = await signup({ email, password })

    if (error) {
      setErrorMessage(error.message)
      setIsLoading(false)
      return
    }

  
    const hasSession = data?.session !== null

    if (hasSession) {
      router.refresh()
      router.push("/dashboard")
    } else {
      router.push("/auth/login?confirmed=pending")
    }
  }

  const handleGoogleClick = async () => {
    setErrorMessage(undefined)
    const { error } = await loginWithGoogle()
    if (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <AuthForm
      type="signup"
      loginUrl="/auth/login"
      signupUrl="/auth/signup"
      onSubmit={handleSignup}
      onGoogleClick={handleGoogleClick}
      isLoading={isLoading}
      errorMessage={errorMessage}
    />
  )
}

export default SignupForm
