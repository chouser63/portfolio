import Link from "next/link"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Menu } from "lucide-react"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-background">
      <Link
          href="/"
          className={cn("text-lg font-semibold")}
        >
          Chase Houser
        </Link>

      <div className="flex items-center hidden sm:block space-x-6">

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

      <div className="sm:hidden flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="h-6 w-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-[200px] bg-background border rounded-md shadow-lg">
            <DropdownMenuItem asChild>
            </DropdownMenuItem>
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
                href="/shower-thoughts"
                className="w-full px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
              >
                Shower Thoughts
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
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </nav>
  )
}
