'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { MoveRightIcon } from 'lucide-react'

export default function LoginPage() {
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        router.push('/')
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        router.push('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
    }
  }

  if (session) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div role="status" aria-label="Redirecting" className="w-14 h-14 rounded-full border-4 border-slate-300 border-t-transparent animate-spin" />
      </div>
    )
  }

  const inputClass = "w-full px-4 py-2 border border-2 rounded-md focus:outline-none focus:bg-transparent"

  return (
    <div className="w-full h-auto flex items-center justify-center px-4">
      <div className="w-full max-w-md pt-24">
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder=""
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={inputClass}
              placeholder=""
            />
          </div>
          <div className="text-center space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="w-auto h-auto bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MoveRightIcon />
            </button>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}