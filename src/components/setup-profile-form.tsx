'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { upsertUserProfile, type UserRole } from '@/lib/auth-client'

export function SetupProfileForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<UserRole | ''>('')
  const [schoolName, setSchoolName] = useState('')
  const [gradeLevel, setGradeLevel] = useState('')
  const [subjectSpecialization, setSubjectSpecialization] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) {
      setError('Please select your role')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const profileData = {
        full_name: fullName,
        role: role as UserRole,
        school_name: schoolName || undefined,
        ...(role === 'student' && gradeLevel && { grade_level: gradeLevel }),
        ...(role === 'teacher' && subjectSpecialization && { 
          subject_specialization: subjectSpecialization 
        }),
      }

      const { success, error: profileError } = await upsertUserProfile(profileData)

      if (!success) {
        console.error('Profile creation error:', profileError)
        throw new Error(profileError || 'Failed to create profile')
      }

      // Redirect to appropriate dashboard based on role
      const dashboardPath = role === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'
      router.push(dashboardPath)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      console.error('Setup profile error:', error)
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="bg-white">
        <CardHeader>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Please provide some information to personalize your experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="grid gap-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  suppressHydrationWarning
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="role">I am a:</Label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="teacher"
                      checked={role === 'teacher'}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Teacher</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={(e) => setRole(e.target.value as UserRole)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span>Student</span>
                  </label>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="schoolName">School Name (Optional)</Label>
                <Input
                  id="schoolName"
                  type="text"
                  placeholder="Enter your school name"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  suppressHydrationWarning
                />
              </div>

              {role === 'student' && (
                <div className="grid gap-2">
                  <Label htmlFor="gradeLevel">Grade Level</Label>
                  <Input
                    id="gradeLevel"
                    type="text"
                    placeholder="e.g., Grade 10, Class XII"
                    value={gradeLevel}
                    onChange={(e) => setGradeLevel(e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
              )}

              {role === 'teacher' && (
                <div className="grid gap-2">
                  <Label htmlFor="subjectSpecialization">Subject Specialization</Label>
                  <Input
                    id="subjectSpecialization"
                    type="text"
                    placeholder="e.g., Mathematics, English, Science"
                    value={subjectSpecialization}
                    onChange={(e) => setSubjectSpecialization(e.target.value)}
                    suppressHydrationWarning
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading} suppressHydrationWarning>
                {isLoading ? 'Setting up...' : 'Complete Setup'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 