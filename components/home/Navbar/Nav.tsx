'use client'

import { navLinks } from '@/constant/constant'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useRef } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { supabase } from '@/lib/supabaseClient'
import { FiLogOut, FiUser } from 'react-icons/fi'

type Props = {
    openNav: () => void
}

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const { user } = useAuth()

    // DEBUG: Check user metadata
    useEffect(() => {
        if (user) {
            console.log('User object:', user)
            console.log('User metadata:', user.user_metadata)
            console.log('User role:', user.user_metadata?.role)
        }
    }, [user])

    useEffect(() => {
        const handleScroll = () => setNavBg(window.scrollY >= 90)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
    }

    return (
        <div className={`fixed w-full transition-all duration-200 h-[12vh] z-[1000] ${navBg ? 'bg-indigo-800 shadow-lg' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between h-full w-[90%] xl:w-[90%] mx-auto">
                {/* Logo */}
                <Link href="/">
                    <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="cursor-pointer" />
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link key={link.id} href={link.url}>
                            <p className='nav__link'>{link.label}</p>
                        </Link>
                    ))}
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4 relative">
                    {user ? (
                        <div ref={dropdownRef} className="relative">
                            {/* User Button */}
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-md transition-all"
                            >
                                {user.user_metadata?.avatar_url && (
                                    <Image
                                        src={user.user_metadata.avatar_url}
                                        alt="Avatar"
                                        width={30}
                                        height={30}
                                        className="rounded-full border-2 border-white"
                                    />
                                )}
                                <span>{user.user_metadata?.full_name || 'User'}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <div
                                className={`absolute right-0 mt-2 w-48 bg-black shadow-lg z-50 rounded-lg overflow-hidden transition-all duration-300 ease-in-out
    ${dropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}
`}
                            >
                                {/* DEBUG: Show role value */}
                                <div className="px-4 py-2 text-xs text-gray-400 border-b border-gray-700">
                                    Role: {user.user_metadata?.role || 'not set'}
                                </div>

                                {/* Admin Dashboard Link (Only for Admin) */}
                                {user.user_metadata?.role === "admin" && (
                                    <Link
                                        href="/admin/dashboard"
                                        className="flex items-center gap-2 px-4 py-4 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all font-semibold"
                                    >
                                        🛠 Admin Dashboard
                                    </Link>
                                )}

                                {/* Profile */}
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 px-4 py-4 text-gray-100 hover:bg-gray-100 hover:text-black transition-all font-semibold"
                                >
                                    <FiUser className="w-5 h-5" />
                                    Profile
                                </Link>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 w-full text-left px-4 py-4 text-gray-100 hover:bg-rose-600 transition-all font-semibold"
                                >
                                    <FiLogOut className="w-5 h-5" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => router.push('/signin')}
                            className='md:px-6 md:py-2 px-4 py-1 text-white font-semibold text-base bg-rose-600 hover:bg-rose-700 transition-all duration-200 rounded-lg'
                        >
                            Sign In
                        </button>
                    )}

                    {/* Mobile Hamburger */}
                    <HiBars3BottomRight onClick={openNav} className='w-8 h-8 cursor-pointer text-white lg:hidden' />
                </div>
            </div>
        </div>
    )
}

export default Nav