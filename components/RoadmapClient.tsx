'use client';

import type { ReactElement } from "react";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/progressStore';
import { Navbar } from '@/components/Navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen, Puzzle, Share2, Layers, Zap,
  GitBranch, List, LayoutList, Rocket, Route,
  FileText, Database, Globe, Gauge,
  FolderOpen, ChevronDown, ChevronUp, Check,
  ArrowRight, Clock, Play,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface Lesson {
  _id: string;
  title: string;
  description: string;
  module: string;       // e.g. "JavaScript Fundamentals"
  order: number;
  estimatedTime: number;
  content: string;
  resources: Array<{ title: string; url: string; type: string }>;
  keyPoints: string[];
}

interface ModuleDef {
  id: number;
  title: string;
  dbModule: string;
  desc: string;
  total: number;
  defaultStatus: string;
  icon: string | null;
  color: string;
  iconLabel?: string;
  iconBg?: string;
  iconText?: string;
}

/* ─────────────────────────────────────────────
   MODULE DEFINITIONS
───────────────────────────────────────────── */
const modules: ModuleDef[] = [
  { id: 1,  title: "JavaScript Fundamentals", dbModule: "JavaScript Fundamentals", desc: "Learn the essential JavaScript concepts before diving into React.", total: 5,  defaultStatus: "available", icon: null,     iconLabel: "JS", iconBg: "#d97706", iconText: "#000", color: "#f59e0b" },
  { id: 2,  title: "React Basics",            dbModule: "React Fundamentals",       desc: "Understand what React is, how it works and set up your environment.", total: 3,  defaultStatus: "available", icon: "react",  color: "#22d3ee" },
  { id: 3,  title: "Components",              dbModule: "Component Mastery",        desc: "Build reusable UI using functional components and composition.", total: 3,  defaultStatus: "available", icon: "puzzle", color: "#818cf8" },
  { id: 4,  title: "State & Props",           dbModule: "State & Props",            desc: "Manage dynamic data using useState and pass data via props.", total: 3,  defaultStatus: "available", icon: "state",  color: "#f97316" },
  { id: 5,  title: "Advanced Hooks",          dbModule: "Advanced Hooks",           desc: "Deep dive into useEffect, useContext, useReducer and custom hooks.", total: 4,  defaultStatus: "available", icon: "zap2",   color: "#6366f1" },
  { id: 6,  title: "Styling & Performance",   dbModule: "Styling & Performance",    desc: "Style React apps and optimize for speed.", total: 2,  defaultStatus: "available", icon: "gauge",  color: "#34d399" },
  { id: 7,  title: "Event Handling",          dbModule: "Event Handling",           desc: "Handle user interactions like clicks, changes and form events.", total: 3,  defaultStatus: "available",    icon: "zap",    color: "#94a3b8" },
  { id: 8,  title: "Conditional Rendering",   dbModule: "Conditional Rendering",    desc: "Render components conditionally based on different states.", total: 3,  defaultStatus: "available",    icon: "branch", color: "#94a3b8" },
  { id: 9,  title: "Lists & Keys",            dbModule: "Lists & Keys",             desc: "Render lists in React and understand the importance of keys.", total: 3,  defaultStatus: "available",    icon: "list",   color: "#94a3b8" },
  { id: 10, title: "useEffect",               dbModule: "useEffect",                desc: "Handle side effects, API calls and component lifecycle.", total: 4,  defaultStatus: "available",    icon: "zap2",   color: "#94a3b8" },
  { id: 11, title: "Routing",                 dbModule: "Routing",                  desc: "Navigate between pages using React Router.", total: 4,  defaultStatus: "available",    icon: "route",  color: "#94a3b8" },
  { id: 12, title: "Forms & Validation",      dbModule: "Forms & Validation",       desc: "Build forms and validate user inputs.", total: 5,  defaultStatus: "available",    icon: "form",   color: "#94a3b8" },
  { id: 13, title: "State Management",        dbModule: "State Management",         desc: "Use Context API and external state libraries.", total: 6,  defaultStatus: "available",    icon: "db",     color: "#94a3b8" },
  { id: 14, title: "API Integration",         dbModule: "API Integration",          desc: "Fetch data from REST APIs and handle async operations.", total: 5,  defaultStatus: "available",    icon: "globe",  color: "#94a3b8" },
  { id: 15, title: "Performance",             dbModule: "Performance",              desc: "Optimize React apps with useMemo, useCallback and lazy loading.", total: 4,  defaultStatus: "available",    icon: "gauge",  color: "#94a3b8" },
  { id: 16, title: "Custom Hooks",            dbModule: "Custom Hooks",             desc: "Create reusable logic with custom React hooks.", total: 3,  defaultStatus: "available",    icon: "hook",   color: "#94a3b8" },
  { id: 17, title: "Project Structure",       dbModule: "Project Structure",        desc: "Organize large React projects with best practices.", total: 3,  defaultStatus: "available",    icon: "folder", color: "#94a3b8" },
  { id: 18, title: "Deployment",              dbModule: "Deployment",               desc: "Deploy React apps to Vercel, Netlify and other platforms.", total: 3,  defaultStatus: "available",    icon: "rocket", color: "#94a3b8" },
];

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const bigIcons: Record<string, ReactElement> = {
  react:  <svg width="36" height="36" viewBox="0 0 100 100" fill="none"><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5"/><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="44" ry="17" stroke="#22d3ee" strokeWidth="5" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="7" fill="#22d3ee"/></svg>,
  puzzle: <Puzzle size={36} color="#818cf8"/>,
  props:  <Share2 size={36} color="#34d399"/>,
  state:  <Layers size={36} color="#f97316"/>,
  zap:    <Zap size={36} color="#64748b"/>,
  zap2:   <Zap size={36} color="#6366f1"/>,
  branch: <GitBranch size={36} color="#64748b"/>,
  list:   <List size={36} color="#64748b"/>,
  route:  <Route size={36} color="#64748b"/>,
  form:   <FileText size={36} color="#64748b"/>,
  db:     <Database size={36} color="#64748b"/>,
  globe:  <Globe size={36} color="#64748b"/>,
  gauge:  <Gauge size={36} color="#34d399"/>,
  hook:   <LayoutList size={36} color="#64748b"/>,
  folder: <FolderOpen size={36} color="#64748b"/>,
  rocket: <Rocket size={36} color="#64748b"/>,
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function LessonCard({
  lesson,
  isCompleted,
  onStart,
}: {
  lesson: Lesson;
  isCompleted: boolean;
  onStart: () => void;
}) {
  return (
    <div
      className="bg-slate-800/50 border border-slate-700 hover:border-purple-500 transition cursor-pointer rounded-xl p-5"
      onClick={onStart}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="text-white font-bold text-base">{lesson.title}</h4>
          <p className="text-slate-400 text-sm mt-0.5">{lesson.description}</p>
        </div>
        {isCompleted && (
          <Badge className="bg-green-500/30 text-green-300 ml-3 flex-shrink-0">Completed</Badge>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3 my-3">
        {[
          { label: "Duration",   val: `${lesson.estimatedTime} min` },
          { label: "Resources",  val: lesson.resources?.length || 0 },
          { label: "Key Points", val: lesson.keyPoints?.length || 0 },
          { label: "Quiz",       val: "Available" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-slate-400 text-xs">{s.label}</p>
            <p className="text-white font-semibold text-sm">{s.val}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap mb-3">
        {lesson.keyPoints?.slice(0, 2).map((pt, i) => (
          <Badge key={i} variant="outline" className="border bg-white text-xs">{pt}</Badge>
        ))}
        {lesson.keyPoints?.length > 2 && (
          <Badge variant="outline" className="border bg-white/30 text-xs">+{lesson.keyPoints.length - 2} more</Badge>
        )}
      </div>

      <Button className="w-full" onClick={(e) => { e.stopPropagation(); onStart(); }}>
        {isCompleted ? 'Review Lesson' : 'Start Learning'}
      </Button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function RoadmapClient({ initialLessons }: { initialLessons: Lesson[] }) {
  const router = useRouter();
  const { lessons: progressLessons, loadProgress } = useProgressStore();

  const lessonsByModule = initialLessons.reduce<Record<string, Lesson[]>>((grouped, lesson) => {
    (grouped[lesson.module] ??= []).push(lesson);
    return grouped;
  }, {});
  Object.values(lessonsByModule).forEach((lessons) => lessons.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('/api/progress')
      .then((response) => response.ok ? response.json() : null)
      .then((data) => data && loadProgress(data.progress || [], data.quizAttempts || []))
      .catch(() => undefined);
  }, [loadProgress]);

  const toggle = useCallback((id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  /* ── Build per-module view model ── */
  const modulesWithProgress = modules.map((mod) => {
    // lessonsByModule[mod.dbModule] gives ONLY this module's lessons
    // e.g. mod.dbModule = "JavaScript Fundamentals" → 5 lessons, not all 66
    const lessons = lessonsByModule[mod.dbModule] || [];
    const total   = lessons.length > 0 ? lessons.length : mod.total;
    const done    = lessons.filter(l => progressLessons[l._id]?.completed).length;

    let status: string;
    if (done >= total && done > 0) status = 'completed';
    else if (done > 0)             status = 'progress';
    else                           status = 'available';

    return { ...mod, lessons, total, done, status };
  });

  const totalDone    = modulesWithProgress.reduce((a, m) => a + m.done, 0);
  const totalLessons = modulesWithProgress.reduce((a, m) => a + m.total, 0);
  const pct          = totalLessons > 0 ? Math.round((totalDone / totalLessons) * 100) : 0;

  const visibleModules = showAll ? modulesWithProgress : modulesWithProgress.slice(0, 10);
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <Navbar />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        ::-webkit-scrollbar { width: 4px; background: #0b1120; }
        ::-webkit-scrollbar-thumb { background: #1e3a5f; border-radius: 4px; }
      `}</style>

      <div className="flex flex-1 overflow-hidden" style={{ minHeight: "calc(100vh - 65px)" }}>
        <main className="flex-1 overflow-y-auto px-8 py-8 w-full">

          {/* ── HEADER ── */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-extrabold mb-2">React Roadmap</h1>
              <p className="text-gray-400 text-base">Your step-by-step guide to becoming a React expert.</p>
            </div>
            <div className="hidden lg:block relative w-48 h-24 flex-shrink-0">
              <svg viewBox="0 0 200 90" width="200" height="90" fill="none">
                <path d="M10 80 Q60 60 100 50 Q140 40 180 20" stroke="#1e3a5f" strokeWidth="12" strokeLinecap="round"/>
                <path d="M10 80 Q60 60 100 50 Q140 40 180 20" stroke="#2a4a6f" strokeWidth="6" strokeLinecap="round" strokeDasharray="8 6"/>
                <line x1="178" y1="20" x2="178" y2="5" stroke="#f97316" strokeWidth="2"/>
                <path d="M178 5 L190 10 L178 15Z" fill="#f97316"/>
                <ellipse cx="155" cy="32" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1.5" fill="none"/>
                <ellipse cx="155" cy="32" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1.5" fill="none" transform="rotate(60 155 32)"/>
                <ellipse cx="155" cy="32" rx="12" ry="5" stroke="#22d3ee" strokeWidth="1.5" fill="none" transform="rotate(120 155 32)"/>
                <circle cx="155" cy="32" r="2.5" fill="#22d3ee"/>
                <rect x="60" y="44" width="26" height="20" rx="5" fill="#1a2a4a" stroke="#3b82f6" strokeWidth="1"/>
                <text x="73" y="58" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="700" fontFamily="monospace">&lt;/&gt;</text>
                <circle cx="40" cy="68" r="3" fill="#3b82f6" opacity="0.6"/>
                <circle cx="75" cy="56" r="3" fill="#22d3ee" opacity="0.6"/>
                <circle cx="125" cy="44" r="3" fill="#a78bfa" opacity="0.6"/>
              </svg>
            </div>
          </div>

          {/* ── STATS BAR ── */}
          <div className="grid grid-cols-4 gap-0 bg-[#0b1120] border border-white/10 rounded-2xl mb-6 divide-x divide-white/10">
            {[
              { icon: <BookOpen size={22} className="text-violet-400"/>, val: "18",              label: "Modules" },
              { icon: <Play size={22} className="text-emerald-400"/>,    val: `${totalLessons}`, label: "Lessons" },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/></svg>, val: "20+", label: "Projects" },
              { icon: <Clock size={22} className="text-purple-400"/>,    val: "120+",            label: "Hours" },
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

          {/* ── PROGRESS BAR ── */}
          <div className="bg-[#0b1120] border border-white/10 rounded-2xl px-6 py-4 mb-6 flex items-center gap-5">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Overall Progress</span>
                <span className="text-white font-bold">{totalDone} / {totalLessons} lessons</span>
              </div>
              <div className="h-2.5 bg-[#1e2d4a] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #3b82f6, #22d3ee)' }}
                />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white">{pct}%</div>
          </div>

          {/* ── MODULE LIST ── */}
          <div className="relative">
            <div
              className="absolute left-[27px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500 via-blue-500 to-gray-700/30 rounded-full"
              style={{ zIndex: 0 }}
            />

            <div className="flex flex-col gap-3">
              {visibleModules.map((m, idx) => {
                const isExpanded  = expandedId === m.id;
                const isDone      = m.status === 'completed';
                const inProgress  = m.status === 'progress';
                const isAvailable = m.status === 'available';

                return (
                  <div
                    key={m.id}
                    className="flex items-stretch gap-4 relative"
                    style={{ zIndex: 1 }}
                  >
                    {/* TIMELINE NODE */}
                    <div className="flex flex-col items-center flex-shrink-0 w-[55px]">
                      <div className={`w-[55px] h-[55px] rounded-full flex items-center justify-center flex-shrink-0 border-2 font-bold text-sm z-10
                        ${isDone      ? "bg-emerald-500 border-emerald-400 text-white"
                        : inProgress  ? "bg-[#1a2a4a] border-blue-500 text-blue-300"
                        : isAvailable ? "bg-[#1a2a4a] border-violet-500/60 text-violet-300"
                        :               "bg-[#0f1b2e] border-gray-700 text-gray-500"}`}
                      >
                        {isDone
                          ? <Check size={22} strokeWidth={3}/>
                          : <span className="text-[13px] font-extrabold">{m.id}</span>
                        }
                      </div>
                    </div>

                    {/* ACCORDION */}
                    <div className="flex-1 flex flex-col">

                      {/* HEADER */}
                      <button
                        onClick={() => toggle(m.id)}
                        className={`flex-1 flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all
                          ${isExpanded
                            ? "bg-[#0f1f3a] border-blue-500/60 shadow-lg shadow-blue-900/20 rounded-b-none border-b-0"
                            : "bg-[#0b1120] border-white/10 hover:border-white/20 cursor-pointer"
                          }`}
                      >
                        <div className="w-[56px] h-[56px] rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0f1f3a]">
                          {m.icon
                            ? bigIcons[m.icon]
                            : (
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: m.iconBg }}>
                                <span style={{ fontSize: 14, fontWeight: 900, color: m.iconText }}>{m.iconLabel}</span>
                              </div>
                            )
                          }
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base mb-0.5 text-white">
                            {m.id}.&nbsp;{m.title}
                          </h3>
                          <p className="text-gray-500 text-[13px] leading-snug line-clamp-2">{m.desc}</p>
                        </div>

                        <div className="flex flex-col items-end gap-1.5 flex-shrink-0 ml-2">
                          <p className={`text-sm font-bold ${isDone ? "text-emerald-400" : inProgress ? "text-blue-400" : "text-violet-400"}`}>
                            {m.done} / {m.total}
                          </p>
                          <p className={`text-xs font-semibold ${isDone ? "text-emerald-400" : inProgress ? "text-blue-400" : "text-violet-400"}`}>
                            {isDone ? "Completed" : inProgress ? "In Progress" : "Start Now"}
                          </p>
                          <div className="mt-1">
                            {isExpanded
                              ? <ChevronUp size={18} className={isDone ? "text-gray-400" : inProgress ? "text-blue-400" : "text-violet-400"}/>
                              : <ChevronDown size={18} className={isDone ? "text-gray-400" : "text-violet-400"}/>
                            }
                          </div>
                        </div>
                      </button>

                      {/* LESSON LIST — only shows THIS module's lessons from the grouped map */}
                      {isExpanded && (
                          <div className="overflow-hidden">
                            <div className="bg-[#0b1828] border border-blue-500/60 border-t-0 rounded-b-2xl px-5 py-5">
                              {m.lessons.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                  {m.lessons.map((lesson) => (
                                    <LessonCard
                                      key={lesson._id}
                                      lesson={lesson}
                                      isCompleted={!!progressLessons[lesson._id]?.completed}
                                      onStart={() => router.push(`/lesson/${lesson._id}`)}
                                    />
                                  ))}
                                </div>
                              ) : (
                                <p className="text-slate-500 text-sm text-center py-4">
                                  No lessons found for this module.
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                    </div>
                  </div>
                );
              })}
            </div>

            {!showAll ? (
              <button
                onClick={() => setShowAll(true)}
                className="w-full mt-4 py-4 rounded-2xl border border-white/10 bg-[#0b1120] text-blue-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#0f1f3a] transition"
              >
                <ChevronDown size={16}/> Show Remaining Modules (11–18)
              </button>
            ) : (
              <button
                onClick={() => setShowAll(false)}
                className="w-full mt-4 py-4 rounded-2xl border border-white/10 bg-[#0b1120] text-blue-400 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#0f1f3a] transition"
              >
                <ChevronUp size={16}/> Show Less
              </button>
            )}
          </div>

          {/* ── BOTTOM CTA ── */}
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

          <div className="h-10"/>
        </main>
      </div>
    </div>
  );
}
