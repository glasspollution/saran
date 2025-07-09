'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TextEffect } from '@/components/ui/text-effect'
import { AnimatedGroup } from '@/components/ui/animated-group'
import { HeroHeader } from './header'
import { FlickeringGrid } from './flickering-grid-hero'
import { Safari } from '@/components/magicui/safari'
import { EntropyLazy } from '@/components/ui/entropy-lazy'
import { createClient } from '@/lib/client'

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring' as const,
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export default function HeroSection() {
    const [user, setUser] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

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

    return (
        <>
            <HeroHeader />
            <main className="relative overflow-hidden">
                {/* Flickering Grid Background */}
                <div className="absolute inset-0 -z-20">
                    <FlickeringGrid
                        className="absolute inset-0"
                        squareSize={4}
                        gridGap={6}
                        color="rgb(99, 102, 241)"
                        maxOpacity={0.3}
                        flickerChance={0.1}
                    />
                </div>
                
                {/* Original background elements */}
                <div
                    aria-hidden
                    className="absolute inset-0 isolate hidden contain-strict lg:block -z-10">
                    <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
                    <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
                    <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
                </div>
                
                <section>
                    <div className="relative pt-24">
                        <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
                        
                        <div className="mx-auto max-w-5xl px-6 relative">
                            {/* Entropy component positioned responsively */}
                            <div className="absolute -right-6 -top-4 hidden lg:block xl:-right-12 2xl:-right-16">
                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 1,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}>
                                    <div className="relative">
                                        <EntropyLazy 
                                            size={350}
                                            particleColor="#0015FF"
                                            className="opacity-100"
                                        />
                                    </div>
                                </AnimatedGroup>
                            </div>
                            <div className="sm:mx-auto lg:mr-auto lg:mt-0">
                                <div className="mt-8 max-w-2xl text-balance text-4xl font-bold md:text-5xl lg:mt-16">
                                    <TextEffect
                                        preset="fade-in-blur"
                                        speedSegment={0.3}
                                        as="h1"
                                        className="text-4xl font-bold md:text-5xl">
                                        Plan Smarter. Teach Better. <span className="underline">Powered by AI.</span>
                                    </TextEffect>
                                </div>
                                <TextEffect
                                    per="line"
                                    preset="fade-in-blur"
                                    speedSegment={0.3}
                                    delay={0.5}
                                    as="p"
                                    className="mt-8 max-w-2xl text-pretty text-base md:text-lg font-caudex text-gray-600">
                                    Turn your curriculum into complete lesson plans, quizzes, and revision material in minutes — not hours. Tailark helps K–12 teachers save time and personalize learning, effortlessly.
                                </TextEffect>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.05,
                                                    delayChildren: 0.75,
                                                },
                                            },
                                        },
                                        ...transitionVariants,
                                    }}
                                    className="mt-12 flex items-center gap-2">
                                    <div
                                        key={1}
                                        className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5">
                                        {loading ? (
                                            <div className="w-48 h-11 bg-gray-200 animate-pulse rounded-xl" />
                                        ) : user ? (
                                            <Button
                                                asChild
                                                size="lg"
                                                className="rounded-xl px-5 text-base">
                                                <Link href="/protected">
                                                    <span className="text-nowrap">Go to Protected</span>
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                asChild
                                                size="lg"
                                                className="rounded-xl px-5 text-base">
                                                <Link href="/auth/sign-up">
                                                    <span className="text-nowrap">Start Teaching Smarter</span>
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-10.5 rounded-xl px-5 text-base">
                                        <Link href="#link">
                                            <span className="text-nowrap">See Demo</span>
                                        </Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>
                        </div>
                        
                        <AnimatedGroup
                            variants={{
                                container: {
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05,
                                            delayChildren: 0.75,
                                        },
                                    },
                                },
                                ...transitionVariants,
                            }}>
                            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                                <div
                                    aria-hidden
                                    className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                                />
                                <div className="relative mx-auto max-w-5xl">
                                    <Safari
                                        url="tailark.ai"
                                        imageSrc="/dashboard_hero.png"
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </AnimatedGroup>
                    </div>
                </section>
            </main>
        </>
    )
}
