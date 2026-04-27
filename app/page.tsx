'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import WhyLearn from '@/components/WhyLearn'
import RoadmapCTA from '@/components/RoadMap'

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      router.push('/home')
    }

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark, router])

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">

    <Header />
    <Hero />
    <WhyLearn />
    <RoadmapCTA />
    </main>
  )
}
