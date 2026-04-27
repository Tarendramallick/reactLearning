"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Code2, Puzzle, Share2, Layers, Zap,
  GitBranch, List, LayoutList, Rocket, Route,
  FileText, Database, Globe, Gauge, Hook,
  FolderOpen, ChevronDown, ChevronUp, Lock, Check,
  Trophy, ArrowRight, Clock, Play,
} from "lucide-react";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const modules = [
  {
    id: 1, title: "JavaScript Fundamentals",
    desc: "Learn the essential JavaScript concepts before diving into React.",
    total: 5, done: 5, status: "completed",
    icon: null, iconLabel: "JS", iconBg: "#d97706", iconText: "#000",
    color: "#f59e0b",
  },
  {
    id: 2, title: "React Basics",
    desc: "Understand what React is, how it works and set up your environment.",
    total: 4, done: 4, status: "completed",
    icon: "react", color: "#22d3ee",
  },
  {
    id: 3, title: "JSX",
    desc: "Learn JSX syntax and how to render elements in React.",
    total: 3, done: 3, status: "completed",
    icon: "jsx", color: "#a78bfa",
  },
  {
    id: 4, title: "Components",
    desc: "Build reusable UI using functional components and composition.",
    total: 6, done: 5, status: "progress",
    icon: "puzzle", color: "#818cf8",
  },
  {
    id: 5, title: "Props",
    desc: "Pass data between components using props.",
    total: 3, done: 2, status: "progress",
    icon: "props", color: "#34d399",
  },
  {
    id: 6, title: "State",
    desc: "Manage dynamic data using useState and understand re-renders.",
    total: 4, done: 1, status: "progress",
    icon: "state", color: "#f97316",
  },
  {
    id: 7, title: "Event Handling",
    desc: "Handle user interactions like clicks, changes and form events.",
    total: 3, done: 0, status: "locked",
    icon: "zap", color: "#94a3b8",
  },
  {
    id: 8, title: "Conditional Rendering",
    desc: "Render components conditionally based on different states.",
    total: 3, done: 0, status: "locked",
    icon: "branch", color: "#94a3b8",
  },
  {
    id: 9, title: "Lists & Keys",
    desc: "Render lists in React and understand the importance of keys.",
    total: 3, done: 0, status: "locked",
    icon: "list", color: "#94a3b8",
  },
  {
    id: 10, title: "useEffect",
    desc: "Handle side effects, API calls and component lifecycle.",
    total: 4, done: 0, status: "locked",
    icon: "zap2", color: "#94a3b8",
  },
  {
    id: 11, title: "Routing",
    desc: "Navigate between pages using React Router.",
    total: 4, done: 0, status: "locked",
    icon: "route", color: "#94a3b8",
  },
  {
    id: 12, title: "Forms & Validation",
    desc: "Build forms and validate user inputs.",
    total: 5, done: 0, status: "locked",
    icon: "form", color: "#94a3b8",
  },
  {
    id: 13, title: "State Management",
    desc: "Use Context API and external state libraries.",
    total: 6, done: 0, status: "locked",
    icon: "db", color: "#94a3b8",
  },
  {
    id: 14, title: "API Integration",
    desc: "Fetch data from REST APIs and handle async operations.",
    total: 5, done: 0, status: "locked",
    icon: "globe", color: "#94a3b8",
  },
  {
    id: 15, title: "Performance",
    desc: "Optimize React apps with useMemo, useCallback and lazy loading.",
    total: 4, done: 0, status: "locked",
    icon: "gauge", color: "#94a3b8",
  },
  {
    id: 16, title: "Custom Hooks",
    desc: "Create reusable logic with custom React hooks.",
    total: 3, done: 0, status: "locked",
    icon: "hook", color: "#94a3b8",
  },
  {
    id: 17, title: "Project Structure",
    desc: "Organize large React projects with best practices.",
    total: 3, done: 0, status: "locked",
    icon: "folder", color: "#94a3b8",
  },
  {
    id: 18, title: "Deployment",
    desc: "Deploy React apps to Vercel, Netlify and other platforms.",
    total: 3, done: 0, status: "locked",
    icon: "rocket", color: "#94a3b8",
  },
];

const sidebarIcons: Record<string, JSX.Element> = {
  react: <svg width="18" height="18" viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="6"/><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="6" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="6" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="7" fill="#22d3ee"/></svg>,
  jsx: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>,
  puzzle: <Puzzle size={18} color="#818cf8"/>,
  props: <Share2 size={18} color="#34d399"/>,
  state: <Layers size={18} color="#f97316"/>,
  zap: <Zap size={18} color="#94a3b8"/>,
  zap2: <Zap size={18} color="#94a3b8"/>,
  branch: <GitBranch size={18} color="#94a3b8"/>,
  list: <List size={18} color="#94a3b8"/>,
  route: <Route size={18} color="#94a3b8"/>,
  form: <FileText size={18} color="#94a3b8"/>,
  db: <Database size={18} color="#94a3b8"/>,
  globe: <Globe size={18} color="#94a3b8"/>,
  gauge: <Gauge size={18} color="#94a3b8"/>,
  hook: <LayoutList size={18} color="#94a3b8"/>,
  folder: <FolderOpen size={18} color="#94a3b8"/>,
  rocket: <Rocket size={18} color="#94a3b8"/>,
};

const bigIcons: Record<string, JSX.Element> = {
  react: <svg width="36" height="36" viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5"/><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="7" fill="#22d3ee"/></svg>,
  jsx: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>,
  puzzle: <Puzzle size={36} color="#818cf8"/>,
  props: <Share2 size={36} color="#34d399"/>,
  state: <Layers size={36} color="#f97316"/>,
  zap: <Zap size={36} color="#64748b"/>,
  zap2: <Zap size={36} color="#6366f1"/>,
  branch: <GitBranch size={36} color="#64748b"/>,
  list: <List size={36} color="#64748b"/>,
  route: <Route size={36} color="#64748b"/>,
  form: <FileText size={36} color="#64748b"/>,
  db: <Database size={36} color="#64748b"/>,
  globe: <Globe size={36} color="#64748b"/>,
  gauge: <Gauge size={36} color="#64748b"/>,
  hook: <LayoutList size={36} color="#64748b"/>,
  folder: <FolderOpen size={36} color="#64748b"/>,
  rocket: <Rocket size={36} color="#64748b"/>,
};

/* ─── Progress Ring ─── */
function ProgressRing({ pct }: { pct: number }) {
  const r = 54, circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width="140" height="140" viewBox="0 0 140 140">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#1e2d4a" strokeWidth="10"/>
      <circle
        cx="70" cy="70" r={r} fill="none"
        stroke="url(#prog)" strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ * 0.25}
        transform="rotate(-90 70 70)"
      />
      <defs>
        <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#22d3ee"/>
        </linearGradient>
      </defs>
      <text x="70" y="76" textAnchor="middle" fill="white" fontSize="26" fontWeight="800" fontFamily="sans-serif">{pct}%</text>
    </svg>
  );
}

/* ─── Spinner for "in progress" ─── */
function Spinner({ color }: { color: string }) {
  const r = 10, circ = 2 * Math.PI * r;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" style={{ animation: "spin 1.4s linear infinite" }}>
      <circle cx="14" cy="14" r={r} fill="none" stroke="#1e2d4a" strokeWidth="3"/>
      <circle cx="14" cy="14" r={r} fill="none" stroke={color} strokeWidth="3"
        strokeLinecap="round" strokeDasharray={`${circ * 0.6} ${circ * 0.4}`}
        strokeDashoffset={circ * 0.25}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function RoadmapPage() {
  const [activeId, setActiveId] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const visibleModules = showAll ? modules : modules.slice(0, 10);

  const totalDone = modules.reduce((a, m) => a + m.done, 0);
  const totalLessons = modules.reduce((a, m) => a + m.total, 0);
  const pct = Math.round((totalDone / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-[#050a18] text-white flex flex-col" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; background: #0b1120; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 4px; }
      `}</style>

      <div className="flex flex-1 overflow-hidden" style={{ height: "100vh" }}>

        {/* ══ SIDEBAR ══════════════════════════════════════════ */}
        <aside className="w-[230px] flex-shrink-0 bg-[#080f1e] border-r border-white/[0.07] flex flex-col overflow-y-auto">

          {/* Progress Ring */}
          <div className="p-5 border-b border-white/[0.07]">
            <p className="text-gray-400 text-[11px] font-bold tracking-widest uppercase mb-4">Your Progress</p>
            <div className="flex flex-col items-center">
              <ProgressRing pct={pct} />
              <p className="text-gray-400 text-sm mt-2">Overall Progress</p>
            </div>
          </div>

          {/* Sections list */}
          <div className="p-4 flex-1">
            <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase mb-3">Sections</p>
            <div className="flex flex-col gap-0.5">
              {modules.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left transition-all text-[13px] font-semibold w-full
                    ${activeId === m.id
                      ? "bg-[#1a2a4a] text-white border border-blue-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                    {m.icon
                      ? sidebarIcons[m.icon]
                      : <span style={{ fontSize: 11, fontWeight: 800, color: m.iconText ?? "#000", background: m.iconBg, borderRadius: 4, padding: "1px 3px" }}>{m.iconLabel}</span>
                    }
                  </span>
                  <span className="truncate">{m.id}. {m.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Streak */}
          <div className="p-4 border-t border-white/[0.07]">
            <div className="bg-[#120f05] border border-amber-500/20 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">🔥</span>
                <p className="text-amber-400 font-bold text-sm">7 Day Streak</p>
              </div>
              <p className="text-gray-400 text-xs">Keep it up! Consistency is the key.</p>
              <div className="flex gap-1.5 mt-2">
                {["✓","✓","W","T","F","S","S"].map((d, i) => (
                  <div key={i} className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold
                    ${i < 2 ? "bg-blue-600 text-white" : i === 2 ? "bg-amber-500 text-black" : "bg-[#1e2a3a] text-gray-500"}`}>
                    {i < 2 ? "✓" : d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* ══ MAIN ═════════════════════════════════════════════ */}
        <main className="flex-1 overflow-y-auto px-8 py-8">

          {/* HEADER */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">React Roadmap</h1>
              <p className="text-gray-400 text-base">Your step-by-step guide to becoming a React expert.</p>
            </div>
            {/* Decorative road illustration */}
            <div className="hidden lg:block relative w-48 h-24 flex-shrink-0">
              <svg viewBox="0 0 200 90" width="200" height="90" fill="none">
                {/* road */}
                <path d="M10 80 Q60 60 100 50 Q140 40 180 20" stroke="#1e3a5f" strokeWidth="12" strokeLinecap="round"/>
                <path d="M10 80 Q60 60 100 50 Q140 40 180 20" stroke="#2a4a6f" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 6"/>
                {/* flag */}
                <line x1="178" y1="20" x2="178" y2="5" stroke="#f97316" strokeWidth="2"/>
                <path d="M178 5 L190 10 L178 15Z" fill="#f97316"/>
                {/* react icon */}
                <ellipse cx="155" cy="32" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1.5" fill="none"/>
                <ellipse cx="155" cy="32" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1.5" fill="none" transform="rotate(60 155 32)"/>
                <ellipse cx="155" cy="32" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1.5" fill="none" transform="rotate(120 155 32)"/>
                <circle cx="155" cy="32" r="2.5" fill="#22d3ee"/>
                {/* code badge */}
                <rect x="60" y="44" width="26" height="20" rx="5" fill="#1a2a4a" stroke="#3b82f6" strokeWidth="1"/>
                <text x="73" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="700" fontFamily="monospace">&lt;/&gt;</text>
                {/* dots on road */}
                <circle cx="40" cy="68" r="3" fill="#3b82f6" opacity="0.6"/>
                <circle cx="75" cy="56" r="3" fill="#22d3ee" opacity="0.6"/>
                <circle cx="125" cy="44" r="3" fill="#a78bfa" opacity="0.6"/>
              </svg>
            </div>
          </div>

          {/* STATS BAR */}
          <div className="grid grid-cols-4 gap-0 bg-[#0b1120] border border-white/10 rounded-2xl mb-6 divide-x divide-white/10">
            {[
              { icon: <BookOpen size={22} className="text-violet-400"/>, val: "18", label: "Modules" },
              { icon: <Play size={22} className="text-emerald-400"/>, val: "108", label: "Lessons" },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>, val: "20+", label: "Projects" },
              { icon: <Clock size={22} className="text-purple-400"/>, val: "120+", label: "Hours" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-4">
                {s.icon}
                <div>
                  <p className="text-2xl font-extrabold leading-none">{s.val}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MODULE LIST WITH TIMELINE */}
          <div className="relative">
            {/* vertical timeline line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-blue-500 to-gray-700/30 rounded-full" style={{ zIndex: 0 }} />

            <div className="flex flex-col gap-3">
              {visibleModules.map((m, idx) => {
                const isActive = activeId === m.id;
                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-stretch gap-4 relative"
                    style={{ zIndex: 1 }}
                  >
                    {/* TIMELINE NODE */}
                    <div className="flex flex-col items-center flex-shrink-0 w-[55px]">
                      <div className={`w-[55px] h-[55px] rounded-full flex items-center justify-center flex-shrink-0 border-2 font-bold text-sm z-10
                        ${m.status === "completed"
                          ? "bg-emerald-500 border-emerald-400 text-white"
                          : m.status === "progress"
                          ? "bg-[#1a2a4a] border-blue-500 text-blue-300"
                          : "bg-[#0f1b2e] border-gray-700 text-gray-500"
                        }`}
                      >
                        {m.status === "completed"
                          ? <Check size={22} strokeWidth={3}/>
                          : <span className="text-[13px] font-extrabold">{m.id}</span>
                        }
                      </div>
                    </div>

                    {/* MODULE CARD */}
                    <button
                      onClick={() => setActiveId(m.id)}
                      className={`flex-1 flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all
                        ${isActive
                          ? "bg-[#0f1f3a] border-blue-500/40 shadow-lg shadow-blue-900/20"
                          : m.status === "locked"
                          ? "bg-[#0a1020] border-white/[0.06] opacity-70 hover:opacity-90"
                          : "bg-[#0b1120] border-white/10 hover:border-white/20"
                        }`}
                    >
                      {/* BIG ICON */}
                      <div className={`w-[56px] h-[56px] rounded-xl flex items-center justify-center flex-shrink-0
                        ${m.status === "locked" ? "bg-[#131c2e]" : "bg-[#0f1f3a]"}`}>
                        {m.icon
                          ? bigIcons[m.icon]
                          : (
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: m.iconBg }}>
                              <span style={{ fontSize: 14, fontWeight: 900, color: m.iconText }}>{m.iconLabel}</span>
                            </div>
                          )
                        }
                      </div>

                      {/* TEXT */}
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold text-base mb-0.5 ${m.status === "locked" ? "text-gray-400" : "text-white"}`}>
                          {m.id}.&nbsp; {m.title}
                        </h3>
                        <p className="text-gray-500 text-[13px] leading-snug line-clamp-2">{m.desc}</p>
                      </div>

                      {/* RIGHT STATUS */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-2">
                        <p className={`text-sm font-bold ${m.status === "locked" ? "text-gray-500" : m.status === "completed" ? "text-emerald-400" : "text-blue-400"}`}>
                          {m.done} / {m.total}
                        </p>
                        <p className={`text-xs font-semibold ${m.status === "locked" ? "text-gray-500" : m.status === "completed" ? "text-emerald-400" : "text-blue-400"}`}>
                          {m.status === "completed" ? "Completed" : m.status === "progress" ? "In Progress" : "Locked"}
                        </p>
                        <div className="mt-1">
                          {m.status === "completed"
                            ? <ChevronDown size={18} className="text-gray-500"/>
                            : m.status === "progress"
                            ? <Spinner color="#3b82f6"/>
                            : <Lock size={16} className="text-gray-600"/>
                          }
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* SHOW MORE */}
            {!showAll && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setShowAll(true)}
                className="w-full mt-4 py-4 rounded-2xl border border-white/10 bg-[#0b1120] text-blue-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#0f1f3a] transition"
              >
                <ChevronDown size={16}/> Show Remaining Modules (11–18)
              </motion.button>
            )}
            {showAll && (
              <button
                onClick={() => setShowAll(false)}
                className="w-full mt-4 py-4 rounded-2xl border border-white/10 bg-[#0b1120] text-blue-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#0f1f3a] transition"
              >
                <ChevronUp size={16}/> Show Less
              </button>
            )}
          </div>

          {/* BOTTOM CTA */}
          <div className="mt-6 flex items-center justify-between bg-[#0b1120] border border-white/10 rounded-2xl px-6 py-5 gap-4">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🏆</span>
              <div>
                <p className="font-extrabold text-base">Stay consistent and complete your roadmap.</p>
                <p className="text-gray-400 text-sm mt-0.5">You're on your way to becoming a React expert! 🚀</p>
              </div>
            </div>
            <button className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90 transition font-bold text-sm whitespace-nowrap">
              Go to Tracker <ArrowRight size={16}/>
            </button>
          </div>

          <div className="h-10" />
        </main>
      </div>
    </div>
  );
}