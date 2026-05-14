/* eslint-disable react/no-unescaped-entities */
// app/unauthorized/page.tsx
'use client'

import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-400 mb-8">You don't have permission to access this page.</p>
        <Link href="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
          Go Home
        </Link>
      </div>
    </div>
  )
}