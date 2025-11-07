'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Button } from '@/components/ui/button'
import { MoveRightIcon } from 'lucide-react'

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <button onClick={handleLogout} className="px-2 text-muted-foreground hover:text-foreground">
      <MoveRightIcon/>
    </button>
  )
}