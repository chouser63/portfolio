'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabaseClient'

const protectedRoutes = ['/movie-reviews']

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!loading) {
      const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
      const isLoginPage = pathname === '/login'

      if (!session && isProtectedRoute) {
        router.push('/')
      } else if (session && isLoginPage) {
        router.push('/')
      }
    }
  }, [session, loading, pathname, router])

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg">Redirecting...</p>
      </div>
    )
  }

  return <>{children}</>
}

