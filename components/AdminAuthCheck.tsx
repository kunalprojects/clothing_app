'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AdminAuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn')
    
    if (!isLoggedIn || isLoggedIn !== 'true') {
      router.push('/admin/login')
    }
  }, [router])

  return <>{children}</>
}
