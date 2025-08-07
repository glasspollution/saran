import { createClient } from '@/lib/server'
import { NextRequest, NextResponse } from 'next/server'
import { getUserProfile } from '@/lib/auth-server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  let next = searchParams.get('next') ?? '/protected'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Check if user has a profile to determine redirect
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        const profile = await getUserProfile(user.id)
        
        if (!profile || !profile.role) {
          // New user or profile creation failed, redirect to profile setup
          next = '/auth/setup-profile'
        } else {
          // Existing user, redirect to their dashboard
          next = profile.role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'
        }
      }
      
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/error', request.url))
} 