import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

type UserRole = 'teacher' | 'student'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Define route patterns for role-based access
  const roleBasedRoutes = {
    teacher: ['/teacher', '/dashboard/teacher'],
    student: ['/student', '/dashboard/student'],
  }

  // General protected routes that require authentication
  const protectedRoutes = ['/protected', '/teacher', '/student', '/dashboard', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  )

  // Check if user is not authenticated and trying to access protected route
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    return NextResponse.redirect(url)
  }

  // If user is authenticated, check role-based access
  if (user && isProtectedRoute) {
    try {
      // Get user profile to check role
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const userRole = profile?.role as UserRole

      // If user doesn't have a profile yet, redirect to role selection
      if (!userRole && !pathname.startsWith('/auth/setup-profile')) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth/setup-profile'
        return NextResponse.redirect(url)
      }

      // Check role-based route access
      if (userRole) {
        // Check if user is trying to access a route for a different role
        for (const [role, routes] of Object.entries(roleBasedRoutes)) {
          const isAccessingRoleRoute = routes.some(route => pathname.startsWith(route))
          
          if (isAccessingRoleRoute && userRole !== role) {
            // Redirect to their appropriate dashboard
            const url = request.nextUrl.clone()
            url.pathname = userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'
            return NextResponse.redirect(url)
          }
        }

        // Redirect /protected to role-specific dashboard
        if (pathname === '/protected') {
          const url = request.nextUrl.clone()
          url.pathname = userRole === 'teacher' ? '/dashboard/teacher' : '/dashboard/student'
          return NextResponse.redirect(url)
        }
      }
    } catch (error) {
      console.error('Error checking user role in middleware:', error)
      // On error, allow the request to continue but log the issue
    }
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse
}
