/* eslint-disable react/no-unescaped-entities */
// app/admin/dashboard/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Users, Book, Layout, CreditCard, TrendingUp, Bell, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'

interface Stats {
  totalUsers: number
  totalCourses: number
  totalPrograms: number
  totalRevenue: number
}

interface Activity {
  id: string
  type: string
  message: string
  created_at: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalCourses: 0,
    totalPrograms: 0,
    totalRevenue: 0,
  })
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    try {
      // Fetch counts from your tables
      const [usersRes, coursesRes, programsRes, paymentsRes] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('programs').select('*', { count: 'exact', head: true }),
        supabase.from('payments').select('amount'),
      ])

      const totalRevenue = paymentsRes.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

      setStats({
        totalUsers: usersRes.count || 0,
        totalCourses: coursesRes.count || 0,
        totalPrograms: programsRes.count || 0,
        totalRevenue,
      })

      // Fetch recent activity (optional - create this table if needed)
      // const { data: activity } = await supabase
      //   .from('activity_log')
      //   .select('*')
      //   .order('created_at', { ascending: false })
      //   .limit(5)
      // setRecentActivity(activity || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    { 
      label: 'Total Users', 
      value: stats.totalUsers, 
      color: 'from-blue-500 to-cyan-500', 
      icon: Users,
      trend: '+12%',
      trendUp: true,
      href: '/admin/users'
    },
    { 
      label: 'Active Courses', 
      value: stats.totalCourses, 
      color: 'from-violet-500 to-purple-500', 
      icon: Book,
      trend: '+8%',
      trendUp: true,
      href: '/admin/courses'
    },
    { 
      label: 'Programs', 
      value: stats.totalPrograms, 
      color: 'from-fuchsia-500 to-pink-500', 
      icon: Layout,
      trend: '+5%',
      trendUp: true,
      href: '/admin/programs'
    },
    { 
      label: 'Revenue', 
      value: `$${stats.totalRevenue.toLocaleString()}`, 
      color: 'from-amber-500 to-orange-500', 
      icon: CreditCard,
      trend: '+23%',
      trendUp: true,
      href: '/admin/payments'
    },
  ]

  const quickLinks = [
    { label: 'Add New User', href: '/admin/users', icon: Users, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Create Course', href: '/admin/courses', icon: Book, color: 'bg-violet-600 hover:bg-violet-700' },
    { label: 'Add Program', href: '/admin/programs', icon: Layout, color: 'bg-fuchsia-600 hover:bg-fuchsia-700' },
    { label: 'View Payments', href: '/admin/payments', icon: CreditCard, color: 'bg-amber-600 hover:bg-amber-700' },
  ]

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Admin. Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <Link 
            key={i} 
            href={stat.href}
            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-violet-400" />
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {quickLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`flex items-center gap-3 p-4 rounded-xl ${link.color} transition-all duration-300 hover:scale-105`}
              >
                <link.icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-violet-400" />
            Recent Activity
          </h3>
          {recentActivity.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-400">
              <Bell className="w-12 h-12 mb-4 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <p className="text-sm text-gray-300 flex-1">{activity.message}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['New signups today', 'Pending payments', 'Unread messages'].map((label, i) => (
          <div 
            key={i}
            className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <span className="text-gray-300">{label}</span>
            <span className="text-2xl font-bold">--</span>
          </div>
        ))}
      </div>
    </div>
  )
}