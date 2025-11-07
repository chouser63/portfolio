"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"
import { LogoutButton } from "./auth/logout-button"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"


export function Navbar() {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-background">
      <Link
        href="/"
        className={cn("text-lg font-semibold")}
      >
        Chase Houser
      </Link>

      <div className="flex items-center hidden sm:flex space-x-6">
        <Link
          href="/experience"
          className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
        >
          Experience
        </Link>

        <Link
          href="/resume"
          className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
        >
          Resume
        </Link>

        <Link
          href="/media"
          className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
        >
          Media
        </Link>

        {session && (
          <Link
            href="/movie-reviews"
            className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
          >
            Movie Reviews
          </Link>
        )}

        {session && 
        <LogoutButton />}
      </div>

      <div className="sm:hidden flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px] bg-background border rounded-md shadow-lg">
            <DropdownMenuItem asChild>
              <Link
                href="/experience"
                className="w-full px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                Experience
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/resume"
                className="w-full px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                Resume
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/media"
                className="w-full px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                Media
              </Link>
            </DropdownMenuItem>
            {session && (
              <DropdownMenuItem asChild>
                <Link
                  href="/movie-reviews"
                  className="w-full px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  Movie Reviews
                </Link>
              </DropdownMenuItem>
            )}
            {session && (
              <DropdownMenuItem asChild>
                  <LogoutButton />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </nav>
  )
}
