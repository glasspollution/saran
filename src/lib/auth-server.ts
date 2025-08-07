import { createClient } from '@/lib/server'
import type { UserRole, UserProfile } from '@/lib/auth'

// Server-side function to get user profile
export async function getUserProfile(userId?: string): Promise<UserProfile | null> {
  const supabase = await createClient()
  
  try {
    let targetUserId = userId
    if (!targetUserId) {
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) return null
      targetUserId = user.id
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', targetUserId)
      .single()

    if (error || !data) return null
    return data as UserProfile
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Check if user has specific role (server-side)
export async function hasRole(requiredRole: UserRole, userId?: string): Promise<boolean> {
  const profile = await getUserProfile(userId)
  return profile?.role === requiredRole
}

// Get user role (server-side)
export async function getUserRole(userId?: string): Promise<UserRole | null> {
  const profile = await getUserProfile(userId)
  return profile?.role || null
} 