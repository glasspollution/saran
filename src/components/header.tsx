'use client'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Home, Briefcase, DollarSign, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { NavBar } from '@/components/ui/tubelight-navbar'
import { createClient } from '@/lib/client'
import { useRouter } from 'next/navigation'

export const HeroHeader = () => {
    const [user, setUser] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)
    const router = useRouter()

    React.useEffect(() => {
        const supabase = createClient()
        
        // Get initial user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.push('/')
    }

    const navItems = [
        { name: 'Features', url: '#link', icon: Home },
        { name: 'Pricing', url: '#link', icon: DollarSign },
        { name: 'About', url: '#link', icon: User }
    ]

    const logoElement = (
        <Link href="/" aria-label="home" className="flex items-center space-x-2">
            <Logo />
        </Link>
    )

    const rightContent = (
        <div className="flex items-center gap-3">
            {loading ? (
                <div className="w-32 h-8 bg-gray-200 animate-pulse rounded" />
            ) : user ? (
                <>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-sm">
                        <Link href="/protected">
                            <span>Protected</span>
                        </Link>
                    </Button>
                    <Button
                        onClick={handleLogout}
                        size="sm"
                        className="text-sm">
                        <span>Logout</span>
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-sm">
                        <Link href="/auth/login">
                            <span>Login</span>
                        </Link>
                    </Button>
                    <Button
                        asChild
                        size="sm"
                        className="text-sm">
                        <Link href="/auth/sign-up">
                            <span>Sign Up</span>
                        </Link>
                    </Button>
                </>
            )}
        </div>
    )

    return (
        <header>
            <NavBar 
                items={navItems}
                logo={logoElement}
                rightContent={rightContent}
            />
        </header>
    )
}
