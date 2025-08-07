import { redirect } from 'next/navigation'
import { createClient } from '@/lib/server'
import { getUserProfile } from '@/lib/auth-server'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/auth/login')
  }

  const profile = await getUserProfile(data.user.id)
  if (!profile) {
    redirect('/auth/setup-profile')
  }

  // Redirect to role-specific dashboard
  if (profile.role === 'teacher') {
    redirect('/dashboard/teacher')
  } else if (profile.role === 'student') {
    redirect('/dashboard/student')
  }

  // Fallback redirect
  redirect('/auth/setup-profile')
} 