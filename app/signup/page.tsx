import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"

export default function DirectSignupPage() {
  return (
    <AuthLayout>
      <AuthForm type="signup" loginUrl="/login" signupUrl="/signup" />
    </AuthLayout>
  )
}
