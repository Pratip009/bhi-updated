// components/admin/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  FolderKanban, 
  CreditCard, 
  Mail,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Zap,
  FileText,
  Image as ImageIcon
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Manage Users', href: '/admin/users', icon: Users },
  { id: 'courses', label: 'Manage Courses', href: '/admin/courses', icon: BookOpen },
  { id: 'programs', label: 'Quick Programs', href: '/admin/quick-programs', icon: Zap },
  { id: 'blogs', label: 'Manage Blogs', href: '/admin/blogs', icon: FileText },
  { id: 'gallery', label: 'Gallery', href: '/admin/gallery', icon: ImageIcon },
  { id: 'payments', label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { id: 'contact', label: 'Contact Forms', href: '/admin/contact', icon: Mail },
]

const bottomMenuItems: any[] = []

interface UserProfile {
  email: string
  full_name?: string
  avatar_url?: string
}

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    fetchUserData()
  }, [])

  async function fetchUserData() {
    try {
      // Get the current authenticated user
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
      
      if (authError) throw authError
      
      if (authUser) {
        setUser({
          email: authUser.email || '',
          full_name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || '',
          avatar_url: authUser.user_metadata?.avatar_url || ''
        })
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    try {
      await supabase.auth.signOut()
      window.location.href = '/login' // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  // Get initials from name or email
  function getInitials(name?: string, email?: string): string {
    if (name) {
      const parts = name.trim().split(' ')
      if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      }
      return name.substring(0, 2).toUpperCase()
    }
    if (email) {
      return email.substring(0, 2).toUpperCase()
    }
    return 'AD'
  }

  return (
    <aside 
      className={`fixed left-0 top-28 h-[calc(100vh-7rem)] bg-[#0a0a0f] border-r border-white/10 transition-all duration-300 z-30 flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute -right-3 top-6 w-6 h-6 bg-violet-600 rounded-full flex items-center justify-center hover:bg-violet-700 transition-colors"
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4 text-white" />
        ) : (
          <ChevronRight className="w-4 h-4 text-white" />
        )}
      </button>

      {/* Logo/Brand */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center font-bold text-lg shrink-0">
            A
          </div>
          {sidebarOpen && (
            <span className="font-semibold text-white">Admin Panel</span>
          )}
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-white'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-violet-400' : 'group-hover:text-violet-400'}`} />
              {sidebarOpen && (
                <span className="font-medium truncate">{item.label}</span>
              )}
              {sidebarOpen && isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-500" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        {bottomMenuItems.length > 0 && bottomMenuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 border border-violet-500/30 text-white'
                  : 'hover:bg-white/5 text-gray-400 hover:text-white border border-transparent'
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-violet-400' : 'group-hover:text-violet-400'}`} />
              {sidebarOpen && (
                <span className="font-medium truncate">{item.label}</span>
              )}
            </Link>
          )
        })}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-transparent"
          title={!sidebarOpen ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {sidebarOpen && <span className="font-medium">Logout</span>}
        </button>

        {/* User Info */}
        {sidebarOpen && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mt-4">
            {loading ? (
              // Loading skeleton
              <>
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 bg-gray-700 rounded animate-pulse" />
                  <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse" />
                </div>
              </>
            ) : user ? (
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold shrink-0 text-sm">
                  {getInitials(user.full_name, user.email)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">
                    {user.full_name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </>
            ) : (
              // Fallback if no user data
              <>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-semibold shrink-0">
                  AD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-white">Admin</p>
                  <p className="text-xs text-gray-400 truncate">Not logged in</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}