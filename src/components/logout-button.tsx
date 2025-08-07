'use client'

import { createClient } from '@/lib/client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function LogoutButton({ variant = 'default', size = 'default', className = '' }: {
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}) {
  const router = useRouter()

  const logout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  return (
    <Button 
      onClick={logout} 
      variant={variant} 
      size={size} 
      className={`w-full justify-start gap-2 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  )
}
