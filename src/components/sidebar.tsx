import { cn } from '@/lib/utils'
import { BookOpen, Home, Trophy } from "lucide-react"
import { Link, useLocation } from 'react-router-dom'

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Lessons", href: "/lessons", icon: BookOpen },
  // { name: "Class Setup", href: "/class-setup", icon: Settings },
  // { name: "Pre-Class", href: "/pre-class", icon: BookOpen },
  // { name: "Training PPT", href: "/training-ppt", icon: Presentation },
  // { name: "Class Lecture", href: "/lecture", icon: GraduationCap },
  // { name: "Post-Class", href: "/post-class", icon: FileText },
  // { name: "Practice Zone", href: "/practice", icon: Code },
  { name: "Mock Tests", href: "/mock-tests", icon: Trophy },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <h1 className="text-xl font-bold text-sidebar-primary-foreground">Learning Assistant</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-sidebar-foreground mb-1">Student Portal</p>
          <p>Track your learning progress</p>
        </div>
      </div>
    </div>
  )
}
