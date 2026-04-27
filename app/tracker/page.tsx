'use client'

import { useState, useEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Bell,
  ChevronDown,
  BookOpen,
  Play,
  Folder,
  Code2,
  Clock,
  CheckCircle2,
  Circle,
  Lock,
  TrendingUp,
  Activity,
  Flame,
  BarChart2,
  Calendar,
  Puzzle,
  Boxes,
  Database,
  MousePointer2,
  GitBranch,
  Zap,
  LayoutGrid,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type DayStatus = 'completed' | 'in-progress' | 'none'

interface Module {
  id: number
  title: string
  icon: React.ReactNode
  color: string
  completed: number
  total: number
  status: 'completed' | 'in-progress' | 'locked'
}

interface Activity {
  id: number
  label: string
  type: 'completed' | 'started'
  time: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MODULES: Module[] = [
  { id: 1, title: 'JavaScript Fundamentals', icon: <span className="font-bold text-yellow-300 text-sm">JS</span>, color: 'bg-yellow-500', completed: 5, total: 5, status: 'completed' },
  { id: 2, title: 'React Basics', icon: <Zap size={14} className="text-cyan-300" />, color: 'bg-cyan-500', completed: 4, total: 4, status: 'completed' },
  { id: 3, title: 'JSX', icon: <Code2 size={14} className="text-emerald-300" />, color: 'bg-emerald-500', completed: 3, total: 3, status: 'completed' },
  { id: 4, title: 'Components', icon: <Puzzle size={14} className="text-purple-300" />, color: 'bg-purple-500', completed: 5, total: 6, status: 'in-progress' },
  { id: 5, title: 'Props', icon: <Boxes size={14} className="text-blue-300" />, color: 'bg-blue-500', completed: 2, total: 3, status: 'in-progress' },
  { id: 6, title: 'State', icon: <Database size={14} className="text-orange-300" />, color: 'bg-orange-500', completed: 1, total: 4, status: 'in-progress' },
  { id: 7, title: 'Event Handling', icon: <MousePointer2 size={14} className="text-slate-300" />, color: 'bg-slate-600', completed: 0, total: 3, status: 'locked' },
  { id: 8, title: 'Conditional Rendering', icon: <GitBranch size={14} className="text-rose-300" />, color: 'bg-rose-600', completed: 0, total: 3, status: 'locked' },
]

const RECENT_ACTIVITIES: Activity[] = [
  { id: 1, label: 'Completed: useEffect Hook', type: 'completed', time: '2h ago' },
  { id: 2, label: 'Completed: Lists & Keys', type: 'completed', time: '1d ago' },
  { id: 3, label: 'Started: Components', type: 'started', time: '2d ago' },
  { id: 4, label: 'Completed: JSX', type: 'completed', time: '3d ago' },
]

const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const CAL_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

const STREAK_BARS = [
  { day: 'Mon', height: 40 },
  { day: 'Tue', height: 55 },
  { day: 'Wed', height: 35 },
  { day: 'Fri', height: 45 },
  { day: 'Sat', height: 60 },
  { day: 'Sun', height: 80 },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  // week starts Monday: getDay() → 0=Sun … shift so Mon=0
  const startOffset = (first.getDay() + 6) % 7
  const days: (number | null)[] = Array(startOffset).fill(null)
  for (let d = 1; d <= last.getDate(); d++) days.push(d)
  return days
}

function dayStatus(day: number | null, month: Date): DayStatus {
  if (!day) return 'none'
  const d = day
  // Hardcoded demo pattern matching screenshot
  const completed = [1, 2, 3, 4, 6, 7]
  const inProgress: number[] = []
  if (completed.includes(d)) return 'completed'
  if (inProgress.includes(d)) return 'in-progress'
  return 'none'
}

function progressColor(status: Module['status']) {
  if (status === 'completed') return 'bg-green-400'
  if (status === 'in-progress') return 'bg-purple-500'
  return 'bg-slate-600'
}

function statusLabel(status: Module['status']) {
  if (status === 'completed') return <span className="text-xs text-green-400 font-semibold">Completed</span>
  if (status === 'in-progress') return <span className="text-xs text-purple-400 font-semibold">In Progress</span>
  return <span className="text-xs text-slate-500 font-semibold">Locked</span>
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, accent }: {
  icon: React.ReactNode; label: string; value: string; sub: string; accent?: string
}) {
  return (
    <div className="bg-[#0f1729] border border-[#1e2d4a] rounded-2xl p-5 flex gap-4 items-start">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${accent || 'bg-indigo-600/20'}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-400 mb-1 font-medium">{label}</p>
        <p className="text-2xl font-bold text-white leading-none">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{sub}</p>
      </div>
    </div>
  )
}

function ModuleRow({ mod, expanded, onToggle }: { mod: Module; expanded: boolean; onToggle: () => void }) {
  const pct = mod.total > 0 ? (mod.completed / mod.total) * 100 : 0

  return (
    <div className="bg-[#0f1729] border border-[#1e2d4a] rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.02] transition"
        onClick={onToggle}
      >
        {/* Timeline dot */}
        <div className="flex-shrink-0 w-8 flex justify-center">
          {mod.status === 'completed' ? (
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center">
              <CheckCircle2 size={14} className="text-white" />
            </div>
          ) : mod.status === 'locked' ? (
            <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
              {mod.id}
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
              {mod.id}
            </div>
          )}
        </div>

        {/* Icon */}
        <div className={`w-9 h-9 rounded-lg ${mod.color} flex items-center justify-center flex-shrink-0 opacity-90`}>
          {mod.icon}
        </div>

        {/* Title + Progress */}
        <div className="flex-1 text-left min-w-0">
          <p className={`text-sm font-semibold ${mod.status === 'locked' ? 'text-slate-500' : 'text-white'}`}>
            {mod.id}. {mod.title}
          </p>
          <div className="mt-1.5 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor(mod.status)}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Count + status */}
        <div className="text-right flex-shrink-0 ml-3">
          <p className="text-sm font-semibold text-white">
            {mod.completed} / {mod.total}
          </p>
          {statusLabel(mod.status)}
        </div>

        {/* chevron or lock */}
        <div className="ml-2 flex-shrink-0">
          {mod.status === 'locked'
            ? <Lock size={14} className="text-slate-600" />
            : <ChevronDown size={16} className={`text-slate-400 transition ${expanded ? 'rotate-180' : ''}`} />}
        </div>
      </button>

      {expanded && mod.status !== 'locked' && (
        <div className="px-4 pb-3 pt-1 border-t border-[#1e2d4a]">
          <div className="grid grid-cols-3 gap-2 mt-2">
            {Array.from({ length: mod.total }).map((_, i) => (
              <div key={i} className={`rounded-lg px-3 py-2 text-xs font-medium ${i < mod.completed ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-slate-800 text-slate-500'}`}>
                Lesson {i + 1}
                {i < mod.completed && <CheckCircle2 size={10} className="inline ml-1" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TrackerPage() {
  const [calMonth, setCalMonth] = useState(new Date(2024, 4)) // May 2024
  const [expandedModule, setExpandedModule] = useState<number | null>(null)
  const [timeFilter, setTimeFilter] = useState('This Week')

  const calDays = buildCalendarDays(calMonth.getFullYear(), calMonth.getMonth())
  const monthLabel = calMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const today = 15 // demo: 15th is today

  return (
    <div className="min-h-screen bg-[#070d1a] text-white font-sans" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-30 bg-[#070d1a]/90 backdrop-blur-md border-b border-[#1e2d4a] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <TrendingUp size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight leading-none">My Learning Tracker</h1>
            <p className="text-xs text-slate-400 mt-0.5">Track your progress and stay consistent on your React journey.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#0f1729] border border-[#1e2d4a] rounded-xl px-4 py-2 text-sm font-medium hover:border-indigo-500/50 transition">
            <Calendar size={14} className="text-indigo-400" />
            {timeFilter}
            <ChevronDown size={14} className="text-slate-400" />
          </button>
          <button className="relative w-9 h-9 bg-[#0f1729] border border-[#1e2d4a] rounded-xl flex items-center justify-center hover:border-indigo-500/50 transition">
            <Bell size={16} className="text-slate-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* ── Stat Cards ── */}
      <section className="px-6 pt-6 pb-2">
        <div className="grid grid-cols-5 gap-4">
          <StatCard
            icon={<BookOpen size={18} className="text-indigo-400" />}
            label="Overall Progress"
            value="42%"
            sub="Completed"
            accent="bg-indigo-600/20"
          />
          <StatCard
            icon={<Play size={18} className="text-green-400" />}
            label="Lessons Completed"
            value="45 / 108"
            sub="41%"
            accent="bg-green-500/20"
          />
          <StatCard
            icon={<Folder size={18} className="text-purple-400" />}
            label="Modules Completed"
            value="8 / 18"
            sub="44%"
            accent="bg-purple-500/20"
          />
          <StatCard
            icon={<Code2 size={18} className="text-yellow-400" />}
            label="Projects Completed"
            value="6 / 20"
            sub="30%"
            accent="bg-yellow-500/20"
          />
          <StatCard
            icon={<Clock size={18} className="text-rose-400" />}
            label="Total Time Spent"
            value="24h 30m"
            sub="This Week"
            accent="bg-rose-500/20"
          />
        </div>
      </section>

      {/* ── Progress bars under stat cards ── */}
      <section className="px-6 pb-4">
        <div className="grid grid-cols-5 gap-4">
          {[
            { pct: 42, color: 'bg-indigo-500' },
            { pct: 41, color: 'bg-green-500' },
            { pct: 44, color: 'bg-purple-500' },
            { pct: 30, color: 'bg-yellow-500' },
            { pct: 100, color: 'bg-rose-500', label: 'This Week' },
          ].map((b, i) => (
            <div key={i} className="px-5">
              <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Body: Roadmap + Right Panel ── */}
      <div className="px-6 pb-10 grid grid-cols-[1fr_340px] gap-6">

        {/* ── LEFT: Roadmap ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" />
              <h2 className="font-bold text-base">Roadmap Progress</h2>
            </div>
            <button className="flex items-center gap-1 text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition">
              Expand All <ChevronDown size={13} />
            </button>
          </div>

          {/* Timeline + modules */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-green-500 via-indigo-500 to-slate-700" />

            <div className="space-y-3">
              {MODULES.map((mod) => (
                <ModuleRow
                  key={mod.id}
                  mod={mod}
                  expanded={expandedModule === mod.id}
                  onToggle={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                />
              ))}
            </div>
          </div>

          {/* View All button */}
          <button className="mt-4 w-full bg-[#0f1729] border border-[#1e2d4a] rounded-xl py-3 text-sm font-semibold text-slate-300 flex items-center justify-center gap-2 hover:border-indigo-500/50 hover:text-white transition">
            View All Modules (18) <ChevronDown size={15} />
          </button>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="space-y-5">

          {/* Activity Calendar */}
          <div className="bg-[#0f1729] border border-[#1e2d4a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-indigo-400" />
                <h3 className="font-bold text-sm">Activity Calendar</h3>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))}
                  className="w-6 h-6 flex items-center justify-center hover:bg-slate-800 rounded transition"
                >
                  <ChevronLeft size={14} />
                </button>
                <span className="text-xs font-semibold text-white px-1">{monthLabel}</span>
                <button
                  onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))}
                  className="w-6 h-6 flex items-center justify-center hover:bg-slate-800 rounded transition"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {CAL_DAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-slate-500">{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {calDays.map((day, i) => {
                const status = dayStatus(day, calMonth)
                const isToday = day === today

                let cls = 'text-slate-600 hover:bg-slate-800/50'
                if (status === 'completed') cls = 'bg-green-500 text-white'
                else if (status === 'in-progress') cls = 'bg-indigo-500 text-white'
                else if (day) cls = 'text-slate-400 hover:bg-slate-800/50'

                return (
                  <div key={i} className="flex items-center justify-center">
                    {day ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer transition
                        ${cls}
                        ${isToday && status === 'none' ? 'ring-2 ring-indigo-500 text-white' : ''}
                      `}>
                        {day}
                      </div>
                    ) : <div className="w-8 h-8" />}
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-4 text-[10px] text-slate-400 font-medium">
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500" />Completed</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />In Progress</div>
              <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-600" />No Activity</div>
            </div>
          </div>

          {/* Current Streak */}
          <div className="bg-[#0f1729] border border-[#1e2d4a] rounded-2xl p-5 flex items-center gap-4">
            <div className="text-4xl">🔥</div>
            <div className="flex-1">
              <p className="text-xs text-slate-400 font-medium">Current Streak</p>
              <p className="text-3xl font-extrabold text-yellow-400 leading-tight">7 Days</p>
              <p className="text-xs text-slate-500 mt-0.5">Best Streak: 12 Days</p>
            </div>

            {/* Mini bar chart */}
            <div className="flex items-end gap-1.5 h-16">
              {STREAK_BARS.map((b) => (
                <div key={b.day} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-5 rounded-sm transition-all ${b.day === 'Sun' ? 'bg-purple-500' : 'bg-slate-700'}`}
                    style={{ height: `${b.height}%` }}
                  />
                  <span className="text-[9px] text-slate-500">{b.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#0f1729] border border-[#1e2d4a] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Recent Activity</h3>
              <button className="text-xs text-indigo-400 font-semibold hover:text-indigo-300 transition">View All</button>
            </div>

            <div className="space-y-3">
              {RECENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="flex items-center gap-3">
                  {act.type === 'completed' ? (
                    <div className="w-7 h-7 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={13} className="text-green-400" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                      <Play size={11} className="text-indigo-400 ml-0.5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate">{act.label}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 flex-shrink-0">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}