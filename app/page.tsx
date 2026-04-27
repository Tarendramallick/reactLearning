'use client'

import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-sm font-bold">
                ⚛
              </div>
              <span className="font-bold text-lg">React<span className="text-cyan-400">Mastery</span></span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium hover:text-cyan-400 transition border-b-2 border-cyan-400">
                Home
              </a>
              <a href="#roadmap" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition">
                Roadmap
              </a>
              <a href="#courses" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition">
                Courses
              </a>
              <a href="#projects" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition">
                Projects
              </a>
              <a href="#resources" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition">
                Resources
              </a>
              <a href="#about" className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition">
                About
              </a>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg hover:bg-slate-800 transition"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="px-4 py-2 text-sm font-medium border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-slate-950 transition">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                  Master React.
                  <br />
                  Build <span className="text-cyan-400">Anything</span>.
                </h1>
                <p className="text-lg text-slate-400 max-w-md">
                  Learn React from zero to advanced with hands-on projects, real-world examples, and a structured roadmap designed for success.
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href="/courses"
                  className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center gap-2"
                >
                  Start Learning
                  <span className="text-xl">🚀</span>
                </Link>
                <Link
                  href="/roadmap"
                  className="px-6 py-3 border-2 border-slate-700 text-white font-semibold rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition flex items-center gap-2"
                >
                  View Roadmap
                  <span>📖</span>
                </Link>
              </div>

              {/* Reviews */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 border-2 border-slate-950"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  <span className="text-sm text-slate-400 ml-2">4.9/5 · Loved by 10,000+ learners</span>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative h-96 hidden md:flex items-center justify-center">
              {/* React Logo */}
              <div className="absolute w-64 h-64 rounded-full border border-cyan-400/20 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full border border-cyan-400/30 flex items-center justify-center">
                  <svg className="w-32 h-32 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                    <path d="M12 3C5 8 2 12 12 21" strokeWidth="1.5" />
                    <path d="M12 3C19 8 22 12 12 21" strokeWidth="1.5" />
                    <circle cx="12" cy="3" r="1.5" fill="currentColor" />
                    <circle cx="18" cy="18" r="1.5" fill="currentColor" />
                    <circle cx="6" cy="18" r="1.5" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute top-0 right-0 w-32 h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
                <div className="space-y-1">
                  <div className="h-2 bg-cyan-400 rounded w-2/3" />
                  <div className="h-2 bg-slate-600 rounded w-full" />
                  <div className="h-2 bg-slate-600 rounded w-1/2" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-32 h-20 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-lg">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded bg-cyan-400" />
                    <div className="flex-1 h-3 bg-cyan-400 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded bg-cyan-400" />
                    <div className="flex-1 h-3 bg-cyan-400 rounded" />
                  </div>
                </div>
              </div>

              {/* Code Icon */}
              <div className="absolute bottom-16 right-8 w-16 h-16 border-2 border-slate-700 rounded-lg flex items-center justify-center text-2xl">
                {'</>'}
              </div>

              {/* Bracket Icon */}
              <div className="absolute top-20 left-0 w-16 h-16 border-2 border-slate-700 rounded-lg flex items-center justify-center text-2xl">
                {'{}'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: '📚', label: 'Modules', value: '18+' },
              { icon: '</>', label: 'Lessons', value: '100+' },
              { icon: '📦', label: 'Projects', value: '20+' },
              { icon: '👥', label: 'Happy Learners', value: '10K+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold text-cyan-400">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Learn With Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why <span className="text-cyan-400">Learn</span> With Us?
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Our curriculum is designed by industry experts to teach you React the right way.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: '📖',
                title: 'Structured Roadmap',
                description: 'Step-by-step path from basics to advanced concepts.',
              },
              {
                icon: '⚡',
                title: 'Hands-on Projects',
                description: 'Build real-world projects and strengthen your portfolio.',
              },
              {
                icon: '</>', 
                title: 'Practical Learning',
                description: 'Learn by doing with interactive examples and exercises.',
              },
              {
                icon: '⭐',
                title: 'Industry Relevant',
                description: 'Curriculum designed based on real-world industry needs.',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <div>
              <div className="text-sm font-bold text-cyan-400 mb-2 uppercase tracking-wider">LEARNING PATH</div>
              <h2 className="text-4xl font-bold mb-4">
                Your Complete React Roadmap
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl">
                From JavaScript fundamentals to advanced state management. We&apos;ve got you covered at every step.
              </p>
            </div>

            {/* Roadmap Steps */}
            <div className="grid md:grid-cols-5 gap-4 mt-12">
              {[
                { step: '01', icon: '📚', title: 'JavaScript Fundamentals', tags: ['Variables', 'Functions', 'ES6+'] },
                { step: '02', icon: '⚛️', title: 'React Fundamentals', tags: ['JSX', 'Components', 'Hooks'] },
                { step: '03', icon: '🎨', title: 'Components & Props', tags: ['Composition', 'Reusability'] },
                { step: '04', icon: '🔄', title: 'State & Events', tags: ['useState', 'useEffect'] },
                { step: '05', icon: '🚀', title: 'Advanced Topics', tags: ['Context', 'Custom Hooks'] },
              ].map((item) => (
                <div
                  key={item.step}
                  className="border border-slate-800 rounded-lg p-6 hover:border-cyan-400/50 transition"
                >
                  <div className="text-sm font-bold text-slate-400 mb-3">{item.step}</div>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold mb-3">{item.title}</h3>
                  <div className="space-y-1">
                    {item.tags.map((tag) => (
                      <div key={tag} className="text-xs text-slate-400">
                        • {tag}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Link
                href="/roadmap"
                className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-slate-950 transition"
              >
                Explore Roadmap →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-10" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to start your React journey?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Join thousands of developers and build the future with React.
          </p>
          <Link
            href="/courses"
            className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
          >
            Start Learning Now 🚀
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm">
          <p>© 2026 ReactMastery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
