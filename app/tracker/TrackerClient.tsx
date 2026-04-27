'use client'

import { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'

// ─── TYPES ─────────────────────────

type Heat = { date: string; count: number }

interface Analytics {
  stats: {
    totalLessons: number
    completedLessons: number
    overallProgress: number
    totalTime: number
  }
  streak: {
    current: number
    best: number
  }
  heatmap: Heat[]
  recentActivity: any[]
}

// ─── MAIN ─────────────────────────

export default function TrackerUI({ initialAnalytics }: { initialAnalytics: Analytics | null }) {

  // ✅ SAFE INITIAL STATE (prevents crash)
  const [analytics, setAnalytics] = useState<Analytics>(
    initialAnalytics || {
      stats: {
        totalLessons: 0,
        completedLessons: 0,
        overallProgress: 0,
        totalTime: 0,
      },
      streak: { current: 0, best: 0 },
      heatmap: [],
      recentActivity: [],
    }
  )

  const [loading, setLoading] = useState(!initialAnalytics)

  // ─── FALLBACK FETCH (if SSR fails)
  useEffect(() => {
    if (initialAnalytics) return

    const load = async () => {
      try {
        const res = await fetch('/api/analytics')
        const data = await res.json()
        setAnalytics(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [initialAnalytics])

  // ─── REALTIME (WebSocket)
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001')

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      setAnalytics(data)
    }

    return () => ws.close()
  }, [])

  // ─── SAFE HEATMAP ACCESS (FIXES YOUR ERROR)
  const getHeat = (dateStr: string) => {
    if (!analytics?.heatmap) return 0
    const found = analytics.heatmap.find((d) => d.date === dateStr)
    return found?.count || 0
  }

  // ─── UI ─────────────────────────

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-6">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-4">
          Learning Tracker
        </h1>

        {/* LOADING */}
        {loading && <p>Loading...</p>}

        {/* STATS */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-slate-800 rounded">
            <p className="text-sm text-gray-400">Progress</p>
            <p className="text-xl font-bold">
              {analytics.stats.overallProgress}%
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded">
            <p className="text-sm text-gray-400">Lessons</p>
            <p className="text-xl font-bold">
              {analytics.stats.completedLessons} / {analytics.stats.totalLessons}
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded">
            <p className="text-sm text-gray-400">Streak</p>
            <p className="text-xl font-bold">
              🔥 {analytics.streak.current}
            </p>
          </div>

          <div className="p-4 bg-slate-800 rounded">
            <p className="text-sm text-gray-400">Time</p>
            <p className="text-xl font-bold">
              {Math.round(analytics.stats.totalTime / 60)} min
            </p>
          </div>
        </div>

        {/* HEATMAP DEMO */}
        <div className="bg-slate-800 p-4 rounded">
          <h2 className="mb-2">Today Activity</h2>

          <p>
            {
              getHeat(
                new Date().toISOString().split('T')[0]
              )
            } actions today
          </p>
        </div>

        {/* RECENT */}
        <div className="mt-6">
          <h2 className="mb-2">Recent Activity</h2>

          {analytics.recentActivity.map((a, i) => (
            <div key={i} className="text-sm text-gray-300">
              {a.label}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}