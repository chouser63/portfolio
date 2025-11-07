'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Session } from '@supabase/supabase-js'

const protectedRoutes = ['/movie-reviews']

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
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
        <div role="status" aria-label="Loading" className="w-14 h-14 rounded-full border-4 border-slate-300 border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!session && protectedRoutes.some(route => pathname.startsWith(route))) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div role="status" aria-label="Redirecting" className="w-14 h-14 rounded-full border-4 border-slate-300 border-t-transparent animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}

