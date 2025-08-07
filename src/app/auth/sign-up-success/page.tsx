import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '@/components/auth-layout'

export default function Page() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
            <CardDescription>Check your email to confirm</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You&apos;ve successfully signed up. Please check your email to confirm your account.
              After confirmation, you&apos;ll be able to complete your profile setup and choose your role (teacher or student).
            </p>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  )
}
