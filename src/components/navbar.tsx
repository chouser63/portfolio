import Link from "next/link"
import { cn } from "@/lib/utils"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-background">
      <div className="text-lg font-semibold">Chase Houser</div>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
        >
          Home
        </Link>

        <Link
          href="/experience"
          className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
        >
          Experience
        </Link>

        <Link
          href="/shower-thoughts"
          className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
        >
          Shower Thoughts
        </Link>
        
        <Link
          href="/resume"
          className={cn("text-sm font-medium text-muted-foreground hover:text-foreground transition-colors")}
        >
          Resume
        </Link>
      </div>
    </nav>
  )
}
