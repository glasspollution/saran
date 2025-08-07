'use client'

import { createClient } from '@/lib/client'
import { useEffect, useState } from 'react'

export function SupabaseTest() {
  const [status, setStatus] = useState('Testing...')
  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient()
        
        // Test 1: Check if client is created
        console.log('Supabase client created:', !!supabase)
        
        // Test 2: Check environment variables
        console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log('Supabase Anon Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
        
        // Test 3: Check auth
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          console.error('Auth error:', authError)
          setError(`Auth error: ${authError.message}`)
          setStatus('Auth failed')
          return
        }
        
        console.log('User data:', user)
        setUser(user)
        
        if (user) {
          setStatus('User authenticated')
          
          // Test 4: Check database connection
          const { data, error: dbError } = await supabase
            .from('user_profiles')
            .select('count')
            .limit(1)
          
          if (dbError) {
            console.error('Database error:', dbError)
            setError(`Database error: ${dbError.message}`)
            setStatus('Database connection failed')
          } else {
            setStatus('All systems working')
          }
        } else {
          setStatus('No user session')
        }
        
      } catch (err) {
        console.error('Test error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setStatus('Test failed')
      }
    }
    
    testConnection()
  }, [])

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-bold mb-2">Supabase Connection Test</h3>
      <p className="mb-2">Status: {status}</p>
      {error && <p className="text-red-600 mb-2">Error: {error}</p>}
      {user && (
        <div className="text-sm">
          <p>User ID: {user.id}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  )
} 