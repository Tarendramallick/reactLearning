'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Play, Folder, Code2, Clock, CheckCircle2,
  ArrowRight, Bell, Search, ChevronDown, ChevronLeft,
  ChevronRight, Flame, TrendingUp, Zap, Star, Trophy,
  Lock, Check, LogOut, Settings, Menu, X,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
interface User {
  id: string;
  name: string;
  email: string;
}

interface ProgressData {
  lessonsCompleted: number[];
  projectsCompleted: number[];
  quizzesCompleted: number[];
  totalMinutes: number;
  streak: number;
  activityLog: { date: string; minutes: number }[];
}

interface LessonFromDB {
  _id: string;
  title: string;
  description: string;
  module: string;
  estimatedTime: number;
  keyPoints: string[];
  resources: { title: string; url: string; type: string }[];
}

/* ═══════════════════════════════════════════════════════════
   STATIC MODULE DATA  (matches roadmap page exactly)
══════════════════════════════════════════════════════════════ */
const MODULES = [
  { id: 1,  dbModule: 'JavaScript Fundamentals', title: 'JavaScript Fundamentals', total: 5,  icon: null, iconLabel: 'JS', iconBg: '#d97706', iconText: '#000', accentColor: '#f59e0b', barColor: 'bg-amber-400' },
  { id: 2,  dbModule: 'React Fundamentals',       title: 'React Basics',            total: 4,  icon: 'react',  accentColor: '#22d3ee', barColor: 'bg-cyan-400' },
  { id: 3,  dbModule: 'Component Mastery',        title: 'JSX – JavaScript XML',    total: 3,  icon: 'jsx',    accentColor: '#a78bfa', barColor: 'bg-violet-400' },
  { id: 4,  dbModule: 'State & Props',            title: 'Components',              total: 3,  icon: 'puzzle', accentColor: '#818cf8', barColor: 'bg-indigo-400' },
  { id: 5,  dbModule: 'Advanced Hooks',           title: 'Props & Data Flow',       total: 4,  icon: 'state',  accentColor: '#f97316', barColor: 'bg-orange-400' },
  { id: 6,  dbModule: 'Styling & Performance',    title: 'State Management',        total: 2,  icon: 'gauge',  accentColor: '#34d399', barColor: 'bg-emerald-400' },
];

const ACHIEVEMENTS = [
  { icon: '🥇', color: 'bg-emerald-500/20 border-emerald-500/30', iconColor: 'text-emerald-400', title: 'First Steps',      sub: 'Completed your first lesson', time: '2h ago' },
  { icon: '🔥', color: 'bg-orange-500/20 border-orange-500/30',   iconColor: 'text-orange-400',  title: 'Consistent Learner', sub: 'Maintained a 7 day streak',  time: '1d ago' },
  { icon: '📦', color: 'bg-blue-500/20 border-blue-500/30',       iconColor: 'text-blue-400',    title: 'Project Starter',  sub: 'Started your first project',  time: '2d ago' },
];

const WEEK_DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const TOTAL_LESSONS = 108;
const TOTAL_MODULES = 18;
const TOTAL_PROJECTS = 20;

/* ═══════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════ */
function buildCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last  = new Date(year, month + 1, 0);
  const startOffset = (first.getDay() + 6) % 7; // Mon = 0
  const days: (number | null)[] = Array(startOffset).fill(null);
  for (let d = 1; d <= last.getDate(); d++) days.push(d);
  return days;
}

function getGreeting(name: string) {
  const h = new Date().getHours();
  const emoji = h < 12 ? '☀️' : h < 17 ? '👋' : '🌙';
  return `Hey, ${name.split(' ')[0]}! ${emoji}`;
}

/* ═══════════════════════════════════════════════════════════
   ICON RENDERS
══════════════════════════════════════════════════════════════ */
function ModuleIcon({ mod, size = 36 }: { mod: typeof MODULES[0]; size?: number }) {
  if (mod.icon === 'react') return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5"/>
      <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5" transform="rotate(60 50 50)"/>
      <ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5" transform="rotate(120 50 50)"/>
      <circle cx="50" cy="50" r="7" fill="#22d3ee"/>
    </svg>
  );
  if (mod.icon === 'jsx') return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round">
      <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/>
      <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>
    </svg>
  );
  if (mod.icon === 'puzzle') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 2c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"/></svg>;
  if (mod.icon === 'state') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="5" rx="2"/><rect x="2" y="10" width="20" height="5" rx="2"/><rect x="2" y="17" width="20" height="5" rx="2"/></svg>;
  if (mod.icon === 'gauge') return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 8 8"/><circle cx="12" cy="12" r="2"/></svg>;
  // JS badge
  return (
    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: mod.iconBg }}>
      <span style={{ fontSize: 14, fontWeight: 900, color: mod.iconText }}>{mod.iconLabel}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PROGRESS RING
══════════════════════════════════════════════════════════════ */
function ProgressRing({ pct, size = 56, stroke = 5 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const cx = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="#1e2d4a" strokeWidth={stroke}/>
      <circle cx={cx} cy={cx} r={r} fill="none" stroke="url(#pg)" strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ * 0.25} transform={`rotate(-90 ${cx} ${cx})`}/>
      <defs>
        <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1"/>
          <stop offset="100%" stopColor="#22d3ee"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   STAT CARD
══════════════════════════════════════════════════════════════ */
function StatCard({ icon, label, value, sub, subColor, accent, bar, barColor }: {
  icon: React.ReactNode; label: string; value: string; sub: string;
  subColor?: string; accent: string; bar: number; barColor: string;
}) {
  return (
    <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-2xl p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`}>{icon}</div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
      </div>
      <div>
        <p className="text-2xl font-extrabold text-white leading-none">{value}</p>
        <p className={`text-xs mt-1 font-semibold ${subColor ?? 'text-slate-400'}`}>{sub}</p>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${bar}%` }}/>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MODULE ROW  (Continue Learning section)
══════════════════════════════════════════════════════════════ */
function ModuleRow({ mod, done, total, onContinue }: {
  mod: typeof MODULES[0]; done: number; total: number; onContinue: () => void;
}) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const isCompleted = done >= total;

  return (
    <div className="flex items-center gap-4 bg-[#0d1526] border border-[#1e2d4a] rounded-2xl px-5 py-4 hover:border-indigo-500/40 transition group">
      {/* icon box */}
      <div className="w-14 h-14 rounded-xl bg-[#0f1f3a] flex items-center justify-center flex-shrink-0">
        <ModuleIcon mod={mod} size={32}/>
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-white font-bold text-sm mb-0.5">{mod.title}</h4>
        <div className="flex items-center gap-3 mt-1.5">
          <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${mod.barColor}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 flex-shrink-0 font-medium">{done} / {total} Lessons</span>
          {isCompleted && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold flex-shrink-0">
              <CheckCircle2 size={12}/> Completed
            </span>
          )}
        </div>
      </div>

      {/* button */}
      <button
        onClick={onContinue}
        className="flex-shrink-0 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white text-sm font-bold"
      >
        Continue
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   NAVBAR  (top bar matching screenshot)
══════════════════════════════════════════════════════════════ */
function TopBar({ user, streak, onSearch }: { user: User | null; streak: number; onSearch: () => void }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3 bg-[#070e1e]/90 backdrop-blur-xl border-b border-[#1e2d4a]">
      {/* Search */}
      <button
        onClick={onSearch}
        className="flex items-center gap-3 bg-[#0d1526] border border-[#1e2d4a] rounded-xl px-4 py-2.5 text-slate-400 text-sm hover:border-indigo-500/50 transition w-64"
      >
        <Search size={15}/>
        <span className="flex-1 text-left">Search anything...</span>
        <kbd className="text-[10px] bg-slate-800 rounded px-1.5 py-0.5 font-mono text-slate-500">⌘ K</kbd>
      </button>

      {/* Right cluster */}
      <div className="flex items-center gap-4">
        {/* Streak */}
        <div className="flex items-center gap-2 bg-[#0d1526] border border-[#1e2d4a] rounded-xl px-4 py-2">
          <Flame size={18} className="text-orange-400"/>
          <span className="text-white font-extrabold text-base leading-none">{streak}</span>
          <span className="text-slate-400 text-xs">Day Streak</span>
        </div>

        {/* Bell */}
        <button className="relative w-10 h-10 bg-[#0d1526] border border-[#1e2d4a] rounded-xl flex items-center justify-center hover:border-indigo-500/50 transition">
          <Bell size={16} className="text-slate-300"/>
          <span className="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full"/>
        </button>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 bg-[#0d1526] border border-[#1e2d4a] rounded-xl px-3 py-2 hover:border-indigo-500/50 transition"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
              {user?.name?.charAt(0).toUpperCase() ?? 'U'}
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-semibold leading-none">{user?.name?.split(' ')[0] ?? 'User'}</p>
              <p className="text-indigo-400 text-[10px] mt-0.5">Pro Learner ●</p>
            </div>
            <ChevronDown size={14} className="text-slate-400 ml-1"/>
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute right-0 top-full mt-2 w-44 bg-[#0d1526] border border-[#1e2d4a] rounded-xl overflow-hidden shadow-xl z-50"
              >
                <button className="flex items-center gap-2.5 w-full px-4 py-3 text-slate-300 hover:bg-white/5 text-sm transition">
                  <Settings size={14}/> Settings
                </button>
                <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 text-sm transition border-t border-[#1e2d4a]">
                  <LogOut size={14}/> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════
   LEFT SIDEBAR NAV
══════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { label: 'Home',      href: '/home',      icon: '🏠' },
  { label: 'Roadmap',   href: '/roadmap',   icon: '🗺️' },
  { label: 'Courses',   href: '/courses',   icon: '📚' },
  { label: 'Projects',  href: '/projects',  icon: '🎯' },
  { label: 'Tracker',   href: '/tracker',   icon: '📊' },
  { label: 'Resources', href: '/resources', icon: '💡' },
];

function LeftNav() {
  const router = useRouter();
  const [active, setActive] = useState('/home');

  return (
    <aside className="w-[220px] flex-shrink-0 bg-[#070e1e] border-r border-[#1e2d4a] flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-8 px-2">
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">R</div>
        <span className="text-white font-bold text-base tracking-tight">Kreeda Studios</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            onClick={() => { setActive(item.href); router.push(item.href); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all text-left w-full
              ${active === item.href
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

/* ═══════════════════════════════════════════════════════════
   CALENDAR
══════════════════════════════════════════════════════════════ */
function ActivityCalendar({ activityLog }: { activityLog: { date: string; minutes: number }[] }) {
  const [calMonth, setCalMonth] = useState(new Date());
  const days = buildCalendarDays(calMonth.getFullYear(), calMonth.getMonth());
  const monthLabel = calMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const today = new Date().getDate();
  const thisMonth = new Date().getMonth() === calMonth.getMonth() && new Date().getFullYear() === calMonth.getFullYear();

  const activeSet = new Set(
    activityLog
      .filter(a => {
        const d = new Date(a.date);
        return d.getMonth() === calMonth.getMonth() && d.getFullYear() === calMonth.getFullYear() && a.minutes > 0;
      })
      .map(a => new Date(a.date).getDate())
  );

  return (
    <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm text-white">{monthLabel}</h3>
        <div className="flex items-center gap-1">
          <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1))}
            className="w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center transition">
            <ChevronLeft size={13} className="text-slate-400"/>
          </button>
          <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1))}
            className="w-6 h-6 rounded hover:bg-slate-800 flex items-center justify-center transition">
            <ChevronRight size={13} className="text-slate-400"/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {WEEK_DAYS.map(d => <div key={d} className="text-center text-[9px] font-bold text-slate-500">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {days.map((day, i) => {
          const isActive = day ? activeSet.has(day) : false;
          const isToday = thisMonth && day === today;
          return (
            <div key={i} className="flex items-center justify-center">
              {day ? (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer transition-all
                  ${isActive ? 'bg-emerald-500 text-white' : isToday ? 'ring-2 ring-indigo-500 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                  {day}
                </div>
              ) : <div className="w-8 h-8"/>}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 text-[10px] text-slate-400 font-medium">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"/>Completed</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500"/>In Progress</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-700"/>No Activity</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   HERO BANNER
══════════════════════════════════════════════════════════════ */
function HeroBanner({ userName }: { userName: string }) {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0d1526] border border-[#1e2d4a] p-8 flex items-center justify-between">
      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(99,102,241,0.15),transparent_60%),radial-gradient(ellipse_at_80%_50%,rgba(6,182,212,0.1),transparent_60%)] pointer-events-none"/>

      {/* left text */}
      <div className="relative z-10 max-w-[420px]">
        <p className="text-indigo-400 font-bold text-sm mb-1">{getGreeting(userName)}</p>
        <h1 className="text-4xl font-extrabold text-white leading-[1.1] mb-1">
          Master React.<br/>
          Build <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Anything.</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Continue your learning journey and become<br/>a React expert step by step.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => router.push('/courses')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition text-white font-bold text-sm"
          >
            Continue Learning <Play size={14} fill="white"/>
          </button>
          <button
            onClick={() => router.push('/roadmap')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 transition text-white font-bold text-sm"
          >
            View Roadmap <BookOpen size={14}/>
          </button>
        </div>
      </div>

      {/* right — react orbit illustration */}
      <div className="relative w-[280px] h-[220px] flex-shrink-0 flex items-center justify-center">
        {/* orbit rings */}
        <div className="absolute w-[210px] h-[210px] rounded-full border border-white/[0.07]"/>
        <div className="absolute w-[160px] h-[160px] rounded-full border border-white/[0.05]"/>

        {/* floating icon badges */}
        {[
          { x: 'left-4',  y: 'top-6',    bg: '#1e1b4b', label: '</>',  color: '#a78bfa', fs: 11 },
          { x: 'right-2', y: 'top-4',    bg: '#0d1f3a', label: '{}',   color: '#22d3ee', fs: 15 },
          { x: 'right-1', y: 'bottom-8', bg: '#1a1630', label: '🚀',  color: '#f472b6', fs: 16 },
          { x: 'left-6',  y: 'bottom-6', bg: '#0d2a1e', label: '📘',  color: '#34d399', fs: 16 },
        ].map((b, i) => (
          <div key={i}
            className={`absolute ${b.x} ${b.y} w-12 h-12 rounded-[12px] flex items-center justify-center border border-white/10`}
            style={{ background: b.bg, animation: `float ${3 + i * 0.5}s ease-in-out infinite ${i * 0.4}s` }}
          >
            <span style={{ fontSize: b.fs, color: b.color, fontFamily: 'monospace', fontWeight: 700 }}>{b.label}</span>
          </div>
        ))}

        {/* react logo center */}
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}>
          <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
            <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#22d3ee" strokeWidth="2.5"/>
            <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#22d3ee" strokeWidth="2.5" transform="rotate(60 50 50)"/>
            <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#22d3ee" strokeWidth="2.5" transform="rotate(120 50 50)"/>
            <circle cx="50" cy="50" r="7" fill="#22d3ee"/>
          </svg>
        </motion.div>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const router = useRouter();

  const [user, setUser]           = useState<User | null>(null);
  const [progress, setProgress]   = useState<ProgressData | null>(null);
  const [dbLessons, setDbLessons] = useState<LessonFromDB[]>([]);
  const [loading, setLoading]     = useState(true);

  /* ── auth guard + data fetch ── */
  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) { router.push('/home'); return; }
    setUser(JSON.parse(raw));

    const fetchData = async () => {
      try {
        const [progRes, lessRes] = await Promise.all([
          fetch('/api/progress'),
          fetch('/api/lessons'),
        ]);
        if (progRes.ok) {
          const d = await progRes.json();
          /* API returns flat object OR { progress, quizAttempts } shape */
          setProgress(d.lessonsCompleted ? d : d.progress ?? null);
        }
        if (lessRes.ok) {
          const d = await lessRes.json();
          setDbLessons(d.lessons ?? []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /* ── derived stats ── */
  const completedLessonIds = new Set(progress?.lessonsCompleted ?? []);

  // per-module completed count
  const moduleStats = MODULES.map((mod) => {
    const modLessons = dbLessons.filter(l => l.module === mod.dbModule);
    const total = modLessons.length || mod.total;
    const done  = modLessons.filter(l => completedLessonIds.has(Number(l._id))).length;
    return { ...mod, total, done };
  });

  const completedLessons  = progress?.lessonsCompleted?.length ?? 0;
  const completedProjects = progress?.projectsCompleted?.length ?? 0;
  const streak            = progress?.streak ?? 7;
  const totalMinutes      = progress?.totalMinutes ?? 0;
  const activityLog       = progress?.activityLog ?? [];

  // Overall: count lessons that appear as done across all modules
  const overallPct = TOTAL_LESSONS > 0 ? Math.round((completedLessons / TOTAL_LESSONS) * 100) : 0;
  const modCompleted = moduleStats.filter(m => m.done >= m.total && m.total > 0).length;

  /* ── loading ── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070e1e]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"/>
          <p className="text-slate-400 mt-4 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const quote = { text: 'The best way to learn is by building.', author: 'Kent C. Dodds' };

  return (
    <div className="min-h-screen bg-[#070e1e] text-white flex flex-col" style={{ fontFamily: "'Manrope','Inter',sans-serif" }}>

      {/* TOP BAR */}
      <TopBar user={user} streak={streak} onSearch={() => {}}/>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT NAV */}
        <LeftNav/>

        {/* MAIN SCROLL */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex gap-6 p-6 min-h-full">

            {/* ── CENTER COLUMN ── */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">

              {/* HERO */}
              <HeroBanner userName={user?.name ?? 'Learner'}/>

              {/* STAT CARDS */}
              <div className="grid grid-cols-4 gap-4">
                <StatCard
                  icon={<BookOpen size={18} className="text-indigo-400"/>}
                  label="Overall Progress" value={`${overallPct}%`}
                  sub="Keep it up! 🚀" subColor="text-slate-400"
                  accent="bg-indigo-600/20" bar={overallPct} barColor="bg-indigo-500"
                />
                <StatCard
                  icon={<Play size={18} className="text-emerald-400"/>}
                  label="Lessons Completed" value={`${completedLessons} / ${TOTAL_LESSONS}`}
                  sub={`${Math.round((completedLessons / TOTAL_LESSONS) * 100)}% Completed`} subColor="text-emerald-400"
                  accent="bg-emerald-500/20" bar={Math.round((completedLessons / TOTAL_LESSONS) * 100)} barColor="bg-emerald-500"
                />
                <StatCard
                  icon={<Folder size={18} className="text-purple-400"/>}
                  label="Modules Completed" value={`${modCompleted} / ${TOTAL_MODULES}`}
                  sub={`${Math.round((modCompleted / TOTAL_MODULES) * 100)}% Completed`} subColor="text-purple-400"
                  accent="bg-purple-500/20" bar={Math.round((modCompleted / TOTAL_MODULES) * 100)} barColor="bg-purple-500"
                />
                <StatCard
                  icon={<Code2 size={18} className="text-amber-400"/>}
                  label="Projects Completed" value={`${completedProjects} / ${TOTAL_PROJECTS}`}
                  sub={`${Math.round((completedProjects / TOTAL_PROJECTS) * 100)}% Completed`} subColor="text-amber-400"
                  accent="bg-amber-500/20" bar={Math.round((completedProjects / TOTAL_PROJECTS) * 100)} barColor="bg-amber-500"
                />
              </div>

              {/* CONTINUE LEARNING */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-white">Continue Learning</h2>
                  <button
                    onClick={() => router.push('/courses')}
                    className="flex items-center gap-1 text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition"
                  >
                    View All <ArrowRight size={14}/>
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {moduleStats.map((mod) => (
                    <motion.div
                      key={mod.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: mod.id * 0.05 }}
                    >
                      <ModuleRow
                        mod={mod}
                        done={mod.done}
                        total={mod.total}
                        onContinue={() => router.push('/courses')}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* QUOTE */}
              <div className="flex items-center gap-4 bg-[#0d1526] border border-[#1e2d4a] rounded-2xl px-6 py-4">
                <span className="text-indigo-400 text-3xl font-serif leading-none">"</span>
                <p className="text-slate-300 text-sm italic flex-1">{quote.text}</p>
                <span className="text-slate-500 text-sm font-semibold flex-shrink-0">— {quote.author}</span>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="w-[320px] flex-shrink-0 flex flex-col gap-5">

              {/* CURRENT STREAK */}
              <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-2xl p-5 relative overflow-hidden">
                {/* hex glow */}
                <div className="absolute right-4 top-4 w-20 h-20 opacity-20">
                  <svg viewBox="0 0 80 80" fill="none"><path d="M40 4 L72 22 L72 58 L40 76 L8 58 L8 22Z" stroke="#6366f1" strokeWidth="2"/></svg>
                </div>
                <div className="absolute right-6 top-6 w-14 h-14 flex items-center justify-center">
                  <span className="text-3xl">🔥</span>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-1">Current Streak</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-white">{streak}</span>
                  <span className="text-xl font-bold text-white">Days</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">Best Streak: 12 Days</p>
                {/* star dots */}
                {[{top:'10%',left:'60%'},{top:'25%',left:'75%'},{top:'60%',left:'55%'}].map((p,i)=>(
                  <div key={i} className="absolute w-1 h-1 bg-indigo-400/60 rounded-full" style={p}/>
                ))}
              </div>

              {/* ACTIVITY CALENDAR */}
              <ActivityCalendar activityLog={activityLog}/>

              {/* CONTINUE WHERE YOU LEFT OFF */}
              <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white">Continue Where You Left Off</h3>
                  <button
                    onClick={() => router.push('/courses')}
                    className="flex items-center gap-1 text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition"
                  >
                    View All <ArrowRight size={12}/>
                  </button>
                </div>

                {moduleStats.filter(m => m.done > 0 && m.done < m.total).slice(0, 2).map((mod) => {
                  const pct = Math.round((mod.done / mod.total) * 100);
                  return (
                    <div key={mod.id} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className="w-10 h-10 rounded-xl bg-[#0f1f3a] flex items-center justify-center flex-shrink-0">
                        <ModuleIcon mod={mod} size={22}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold truncate">{mod.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className={`h-full ${mod.barColor} rounded-full`} style={{ width: `${pct}%` }}/>
                          </div>
                          <span className="text-slate-400 text-[10px] flex-shrink-0">{pct}%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => router.push('/courses')}
                        className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition flex-shrink-0"
                      >
                        <Play size={12} fill="white" className="text-white ml-0.5"/>
                      </button>
                    </div>
                  );
                })}

                {/* fallback if nothing in-progress */}
                {moduleStats.filter(m => m.done > 0 && m.done < m.total).length === 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0f1f3a] flex items-center justify-center flex-shrink-0">
                      <ModuleIcon mod={MODULES[3]} size={22}/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-bold">Components in Depth</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: '60%' }}/>
                        </div>
                        <span className="text-slate-400 text-[10px]">60%</span>
                      </div>
                    </div>
                    <button onClick={() => router.push('/courses')}
                      className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition flex-shrink-0">
                      <Play size={12} fill="white" className="text-white ml-0.5"/>
                    </button>
                  </div>
                )}
              </div>

              {/* RECENT ACHIEVEMENTS */}
              <div className="bg-[#0d1526] border border-[#1e2d4a] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm text-white">Recent Achievements</h3>
                  <button className="flex items-center gap-1 text-indigo-400 text-xs font-semibold hover:text-indigo-300 transition">
                    View All <ArrowRight size={12}/>
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center border text-lg flex-shrink-0 ${a.color}`}>
                        {a.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-bold">{a.title}</p>
                        <p className="text-slate-500 text-[10px]">{a.sub}</p>
                      </div>
                      <span className="text-slate-600 text-[10px] flex-shrink-0">{a.time}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}