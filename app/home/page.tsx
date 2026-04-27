'use client';

import { Sidebar } from '@/components/sidebar';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      window.location.href = '/';
    } else {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">Master React. Build Anything.</h1>
              <p className="text-slate-400 text-lg max-w-2xl">
                A complete roadmap to take you from beginner to advanced React developer with projects, real-world examples and hands-on practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <Link
                href="/roadmap"
                className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">🗺️</span>
                    <span className="text-sm font-semibold text-cyan-400">Get Started</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">View Roadmap</h2>
                  <p className="text-slate-400">Check your learning path and progress</p>
                </div>
              </Link>

              <Link
                href="/courses"
                className="group relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 p-6 hover:border-cyan-500/50 transition-all"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">📚</span>
                    <span className="text-sm font-semibold text-cyan-400">Learn</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Start Learning</h2>
                  <p className="text-slate-400">Access all React courses and lessons</p>
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">18+</div>
                <div className="text-sm text-slate-400">Modules</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">100+</div>
                <div className="text-sm text-slate-400">Lessons</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">20+</div>
                <div className="text-sm text-slate-400">Projects</div>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">10K+</div>
                <div className="text-sm text-slate-400">Learners</div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Why Learn With ReactMastery?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: '📖',
                    title: 'Structured Roadmap',
                    desc: 'Step-by-step path from basics to advanced concepts',
                  },
                  {
                    icon: '⚡',
                    title: 'Hands-on Projects',
                    desc: 'Build real-world projects and strengthen your portfolio',
                  },
                  {
                    icon: '📊',
                    title: 'Track Progress',
                    desc: 'Visualize your learning journey and stay consistent',
                  },
                  {
                    icon: '🏆',
                    title: 'Industry Relevant',
                    desc: 'Curriculum designed based on real-world industry needs',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
