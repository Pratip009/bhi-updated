/* eslint-disable react/no-unescaped-entities */
'use client'

import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { User, Phone, Check, AlertCircle, LayoutDashboard, Mail } from 'lucide-react'

type Tab = 'profile' | 'dashboard'

export default function AccountPage() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<Tab>('profile')
    const [fullName, setFullName] = useState('')
    const [contact, setContact] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState<'success' | 'error'>('success')
    const [updating, setUpdating] = useState(false)
    const [memberSince, setMemberSince] = useState('')
    const [role, setRole] = useState<string | null>(null);


    useEffect(() => {
        if (!loading && !user) router.push('/signin')
        if (user) {
            setFullName(user.user_metadata?.full_name || '')
            setContact(user.user_metadata?.contact_number || '')
        }
    }, [user, loading])
    useEffect(() => {
        if (user) {
            setFullName(user.user_metadata?.full_name || "");
            setContact(user.user_metadata?.contact_number || "");
            setRole(user.user_metadata?.role || null);
        }
    }, [user]);
    useEffect(() => {
        if (!loading && user) {
            const createdAt = user.created_at
            if (createdAt) {
                const date = new Date(createdAt)
                // Show full month and year, e.g., "March 2024"
                setMemberSince(date.toLocaleString('default', { month: 'long', year: 'numeric' }))
            }
        }
    }, [user, loading])



    const handleUpdate = async () => {
        setMessage('')
        setUpdating(true)

        const { error } = await supabase.auth.updateUser({
            data: {
                full_name: fullName,
                contact_number: contact
            }
        })

        setUpdating(false)

        if (error) {
            setMessage(error.message)
            setMessageType('error')
        } else {
            setMessage('Profile updated successfully!')
            setMessageType('success')
        }

        setTimeout(() => setMessage(''), 4000)
    }

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm">Loading account...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="w-full bg-blue-800 py-16 text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-light mb-3 text-white tracking-tight mt-12">My Account</h1>
                <p className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto px-4">
                    Manage your profile, update personal information, and check your dashboard activity.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar - Tabs */}
                    <div className="lg:w-80">
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            {/* User Info Card */}
                            <div className="p-6 border-b border-gray-200 bg-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                        <User className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">
                                            {fullName || 'User'}
                                        </h3>
                                        <p className="text-sm text-gray-500 truncate">{user.email}</p>

                                        {/* Role Display */}
                                        {role ? (
                                            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                                                {role.toUpperCase()}
                                            </span>
                                        ) : (
                                            <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                                                No Role Assigned
                                            </span>
                                        )}

                                    </div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="p-3">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-all ${activeTab === 'profile'
                                        ? 'bg-blue-800 text-white shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <User className="w-5 h-5" />
                                    <span>Profile Settings</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('dashboard')}
                                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-all mt-1 ${activeTab === 'dashboard'
                                        ? 'bg-blue-800 text-white shadow-sm'
                                        : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span>Dashboard</span>
                                </button>
                            </nav>

                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1">
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
                                {/* Section Header */}
                                <div className="px-8 py-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-light text-gray-900">Profile Information</h2>
                                    <p className="text-sm text-gray-500 mt-1">Update your account details and personal information</p>
                                </div>

                                {/* Form Content */}
                                <div className="p-8 space-y-6">
                                    {/* Email (Read-only) */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full bg-gray-50 border border-gray-300 text-gray-500 rounded-xl py-3.5 pl-12 pr-4 cursor-not-allowed"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">Email address cannot be changed</p>
                                    </div>

                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Number */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Contact Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                type="text"
                                                placeholder="Enter your contact number"
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                                className="w-full bg-white border border-gray-300 text-gray-900 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Message Display */}
                                    {message && (
                                        <div className={`flex items-center gap-3 p-4 rounded-xl border ${messageType === 'success'
                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                            : 'bg-red-50 border-red-200 text-red-700'
                                            }`}>
                                            {messageType === 'success' ? (
                                                <Check className="w-5 h-5 flex-shrink-0" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            )}
                                            <p className="text-sm font-medium">{message}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={handleUpdate}
                                            disabled={updating}
                                            className="flex-1 bg-blue-600 text-white font-medium py-3.5 rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                        >
                                            {updating ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                                    Updating...
                                                </span>
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setFullName(user.user_metadata?.full_name || '')
                                                setContact(user.user_metadata?.contact_number || '')
                                                setMessage('')
                                            }}
                                            className="px-6 py-3.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Dashboard Tab */}
                        {activeTab === 'dashboard' && (
                            <div className="space-y-6">
                                {/* Welcome Card */}
                                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                                    <h2 className="text-2xl font-light text-gray-900 mb-2">
                                        Welcome back, {fullName || 'User'}!
                                    </h2>
                                    <p className="text-gray-600">
                                        Here's an overview of your account activity and quick stats.
                                    </p>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                                                <User className="w-6 h-6 text-blue-600" />
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Account Status</h3>
                                        <p className="text-2xl font-semibold text-gray-900">Active</p>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                                                <Check className="w-6 h-6 text-green-600" />
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Email Verified</h3>
                                        <p className="text-2xl font-semibold text-gray-900">Yes</p>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                                                <LayoutDashboard className="w-6 h-6 text-purple-600" />
                                            </div>
                                        </div>
                                        <h3 className="text-sm font-medium text-gray-500 mb-1">Member Since</h3>
                                        <p className="text-2xl font-semibold text-gray-900">{memberSince}</p>
                                    </div>
                                </div>

                                {/* Activity Section */}
                                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
                                    <h3 className="text-xl font-light text-gray-900 mb-4">Recent Activity</h3>
                                    <p className="text-gray-600">No recent activity to display. Your actions will appear here.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}