'use client'

import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) router.push('/signin')
    }, [user, loading])

    if (loading || !user) return <p>Loading...</p>

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p>Welcome, {user.user_metadata?.full_name || 'User'}!</p>
            {/* Add your dashboard content here */}
        </div>
    )
}
