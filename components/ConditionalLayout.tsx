// components/ConditionalLayout.tsx
'use client'

import { usePathname } from 'next/navigation'
import Footer from '@/components/home/footer/Footer'
import AiChat from '@/components/helper/AiChat'
import ScrollToTop from '@/components/helper/ScrollToTop'
import FloatingSocialIcons from '@/components/helper/FloatingSocialIcons'

export function ConditionalFooter() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  if (isAdmin) return null
  return <Footer />
}

export function ConditionalExtras() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  if (isAdmin) return null
  return (
    <>
      <AiChat />
      <ScrollToTop />
      <FloatingSocialIcons />
    </>
  )
}