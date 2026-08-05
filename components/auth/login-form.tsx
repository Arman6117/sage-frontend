"use client"
import React from "react"
import { useRouter } from "next/navigation"

import { AuthForm } from "@/components/auth/auth-form"
import { AuthFormData } from "@/lib/types/auth"
import { login, loginWithGoogle } from "@/lib/helpers/auth"
import { loginSchema } from "@/lib/schemas/auth"

const LoginForm = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>()

  const handleSubmit = async ({ email, password }: AuthFormData) => {
    setErrorMessage(undefined)

    const result = loginSchema.safeParse({ email, password })
    if (!result.success) {
      setErrorMessage(result.error.issues[0].message)
      return
    }

    setLoading(true)

    const { data, error } = await login({ email, password })

    if (error) {
      setErrorMessage(error.message)
      setLoading(false)
      return
    }

    router.refresh()
    router.push("/dashboard")
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
      type="login"
      loginUrl="/auth/login"
      signupUrl="/auth/signup"
      onSubmit={handleSubmit}
      onGoogleClick={handleGoogleClick}
      isLoading={loading}
      errorMessage={errorMessage}
    />
  )
}

export default LoginForm
