import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" loginUrl="/auth/login" signupUrl="/auth/signup" />
    </AuthLayout>
  )
}
