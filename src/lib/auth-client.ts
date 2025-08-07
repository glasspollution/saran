import { createClient } from '@/lib/client'

export type UserRole = 'teacher' | 'student'

export interface UserProfile {
  id: string
  email: string
  full_name?: string
  role: UserRole
  school_name?: string
  grade_level?: string // For students
  subject_specialization?: string // For teachers
  created_at: string
  updated_at: string
}

// Client-side function to get user profile
export async function getUserProfile(): Promise<UserProfile | null> {
  const supabase = createClient()
  
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) return null

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error || !data) return null
    return data as UserProfile
  } catch (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
}

// Create or update user profile
export async function upsertUserProfile(
  profileData: Partial<UserProfile> & { role: UserRole }
): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()
  
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('Auth error in upsertUserProfile:', userError)
      return { success: false, error: 'User not authenticated' }
    }

    console.log('Attempting to upsert profile for user:', user.id)
    console.log('Profile data:', profileData)

    const profileToInsert = {
      id: user.id,
      email: user.email || '',
      ...profileData,
      updated_at: new Date().toISOString()
    }

    console.log('Final profile object:', profileToInsert)

    const { data, error } = await supabase
      .from('user_profiles')
      .upsert(profileToInsert, {
        onConflict: 'id'
      })
      .select()

    if (error) {
      console.error('Database error in upsertUserProfile:', error)
      return { success: false, error: `Database error: ${error.message}` }
    }

    console.log('Profile upsert successful:', data)
    return { success: true }
  } catch (error) {
    console.error('Unexpected error in upsertUserProfile:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

// Check if user has specific role
export async function hasRole(requiredRole: UserRole): Promise<boolean> {
  const profile = await getUserProfile()
  return profile?.role === requiredRole
}

// Get user role
export async function getUserRole(): Promise<UserRole | null> {
  const profile = await getUserProfile()
  return profile?.role || null
}

// Route protection helpers
export function getProtectedRoutes(): Record<UserRole, string[]> {
  return {
    teacher: ['/teacher', '/teacher/*', '/dashboard/teacher'],
    student: ['/student', '/student/*', '/dashboard/student']
  }
}

export function getDefaultRedirectForRole(role: UserRole): string {
  return role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'
} 