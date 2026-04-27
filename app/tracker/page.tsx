'use client'

import { Sidebar } from '@/components/sidebar'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Flame, Target, Award } from 'lucide-react'

// Generate contribution data for the past year
function generateContributionData() {
  const data: Record<string, number> = {}
  const today = new Date()
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    
    // Random contribution levels (0-4)
    data[dateStr] = Math.random() > 0.7 ? 0 : Math.floor(Math.random() * 5)
  }
  
  return data
}

function getIntensityColor(level: number) {
  const colors = [
    'bg-slate-800',
    'bg-green-900',
    'bg-green-700',
    'bg-green-500',
    'bg-green-300',
  ]
  return colors[level] || colors[0]
}

export default function TrackerPage() {
  const [contributions, setContributions] = useState<Record<string, number>>({})
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      window.location.href = '/'
    }
    setContributions(generateContributionData())
  }, [])

  // Calculate stats
  const today = new Date().toISOString().split('T')[0]
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  
  const stats = {
    total: Object.values(contributions).reduce((a, b) => a + b, 0),
    longestStreak: 45,
    currentStreak: 12,
    average: Math.round(Object.values(contributions).reduce((a, b) => a + b, 0) / 365),
  }

  // Get calendar grid
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendarDays = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      
      <main className="flex-1 md:ml-64">
      {/* Header */}
      <header className="border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Learning Tracker</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Track your daily learning activity and maintain your streak.
          </p>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: '📊',
                label: 'Total Minutes',
                value: `${stats.total * 45}`,
                subtext: 'minutes spent learning',
              },
              {
                icon: '🔥',
                label: 'Current Streak',
                value: stats.currentStreak,
                subtext: 'days in a row',
              },
              {
                icon: '🏆',
                label: 'Best Streak',
                value: stats.longestStreak,
                subtext: 'consecutive days',
              },
              {
                icon: '⭐',
                label: 'Average Daily',
                value: `${stats.average * 45}`,
                subtext: 'minutes per day',
              },
            ].map((stat) => (
              <div key={stat.label} className="border border-slate-800 rounded-lg p-6">
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-sm text-slate-400 mb-2">{stat.label}</div>
                <div className="text-3xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-2">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribution Calendar */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Year Overview */}
            <div>
              <h2 className="text-2xl font-bold mb-6">641 contributions in the last year</h2>
              
              {/* Months Grid */}
              <div className="overflow-x-auto pb-4">
                <div className="inline-block space-y-4 min-w-full">
                  {/* Month Labels */}
                  <div className="flex gap-2">
                    <div className="w-12" />
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                      <div key={month} className="w-12 text-xs text-slate-400 font-medium">
                        {month}
                      </div>
                    ))}
                  </div>

                  {/* Day rows */}
                  {['Mon', 'Wed', 'Fri'].map(day => (
                    <div key={day} className="flex gap-2 items-center">
                      <div className="w-12 text-xs text-slate-400 font-medium text-right">{day}</div>
                      <div className="flex gap-1.5">
                        {[...Array(52 * 7)].map((_, i) => {
                          const date = new Date()
                          date.setDate(date.getDate() - i)
                          const dateStr = date.toISOString().split('T')[0]
                          const level = contributions[dateStr] || 0
                          
                          return (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-sm cursor-pointer hover:ring-2 ring-cyan-400 transition ${getIntensityColor(level)}`}
                              title={`${level} contributions on ${dateStr}`}
                              onClick={() => setSelectedDate(dateStr)}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Legend */}
                  <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-6">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(i => (
                      <div key={i} className={`w-3 h-3 rounded-sm ${getIntensityColor(i)}`} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Month Grid */}
            <div className="border border-slate-800 rounded-lg p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                    className="p-2 hover:bg-slate-800 rounded-lg transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                    className="p-2 hover:bg-slate-800 rounded-lg transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Days of week header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-slate-400">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((day, i) => {
                  if (!day) {
                    return <div key={`empty-${i}`} className="aspect-square" />
                  }

                  const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  const dateStr = dateObj.toISOString().split('T')[0]
                  const level = contributions[dateStr] || 0
                  const isToday = dateStr === today

                  return (
                    <div
                      key={day}
                      className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer font-semibold transition hover:ring-2 ring-cyan-400 ${
                        getIntensityColor(level)
                      } ${isToday ? 'ring-2 ring-cyan-400' : ''}`}
                      onClick={() => setSelectedDate(dateStr)}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Selected Date Info */}
            {selectedDate && (
              <div className="border border-cyan-400/50 bg-cyan-400/10 rounded-lg p-6">
                <h4 className="font-bold text-lg mb-2">
                  {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </h4>
                <p className="text-slate-400">
                  <span className="text-cyan-400 font-semibold">{contributions[selectedDate] || 0}</span> contribution level
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}
