import { AuthLayout } from "@/components/auth/auth-layout"
import { AuthForm } from "@/components/auth/auth-form"

export default function DirectLoginPage() {
  return (
    <AuthLayout>
      <AuthForm type="login" loginUrl="/login" signupUrl="/signup" />
    </AuthLayout>
  )
}
