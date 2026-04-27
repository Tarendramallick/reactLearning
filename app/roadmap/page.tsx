'use client'

import { Sidebar } from '@/components/sidebar'
import { CheckCircle } from 'lucide-react'
import { useEffect } from 'react'

const ROADMAP = [
  {
    step: 1,
    title: 'JavaScript Fundamentals',
    icon: '📚',
    description: 'Master JavaScript basics before diving into React',
    topics: ['Variables & Types', 'Functions', 'Arrays & Objects', 'Promises & Async/Await', 'ES6 Features'],
    lessons: 12,
    completed: true,
  },
  {
    step: 2,
    title: 'React Fundamentals',
    icon: '⚛️',
    description: 'Learn the core concepts and building blocks of React',
    topics: ['JSX Syntax', 'Components', 'Props & State', 'Rendering', 'Virtual DOM'],
    lessons: 15,
    completed: false,
  },
  {
    step: 3,
    title: 'Components & Props',
    icon: '🧩',
    description: 'Master component composition and data passing patterns',
    topics: ['Functional Components', 'Class Components', 'Props Drilling', 'Composition', 'Reusability'],
    lessons: 10,
    completed: false,
  },
  {
    step: 4,
    title: 'State & Events',
    icon: '🔄',
    description: 'Control component state and handle user interactions',
    topics: ['useState Hook', 'Event Handling', 'Form Handling', 'State Updates', 'Controlled Components'],
    lessons: 12,
    completed: false,
  },
  {
    step: 5,
    title: 'Side Effects & APIs',
    icon: '📡',
    description: 'Fetch data and handle side effects in React',
    topics: ['useEffect Hook', 'Data Fetching', 'API Integration', 'Error Handling', 'Loading States'],
    lessons: 14,
    completed: false,
  },
  {
    step: 6,
    title: 'Advanced Hooks',
    icon: '🎣',
    description: 'Create custom hooks and master advanced hook patterns',
    topics: ['Custom Hooks', 'useContext', 'useReducer', 'useCallback', 'useMemo'],
    lessons: 16,
    completed: false,
  },
  {
    step: 7,
    title: 'Routing & Navigation',
    icon: '🧭',
    description: 'Build multi-page applications with React Router',
    topics: ['React Router', 'Dynamic Routes', 'Navigation', 'Route Guards', 'URL Parameters'],
    lessons: 10,
    completed: false,
  },
  {
    step: 8,
    title: 'State Management',
    icon: '🗂️',
    description: 'Manage complex application state efficiently',
    topics: ['Context API', 'Redux Basics', 'Zustand', 'State Patterns', 'Best Practices'],
    lessons: 18,
    completed: false,
  },
  {
    step: 9,
    title: 'Performance Optimization',
    icon: '⚡',
    description: 'Optimize React applications for better performance',
    topics: ['Code Splitting', 'Lazy Loading', 'Memoization', 'Bundle Analysis', 'Profiling'],
    lessons: 12,
    completed: false,
  },
  {
    step: 10,
    title: 'Testing & Quality',
    icon: '✅',
    description: 'Write tests and ensure code quality',
    topics: ['Unit Testing', 'Integration Tests', 'Jest & RTL', 'E2E Testing', 'CI/CD'],
    lessons: 14,
    completed: false,
  },
]

export default function RoadmapPage() {
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      window.location.href = '/'
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      
      <main className="flex-1 md:ml-64">
      {/* Header */}
      <header className="border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">React Roadmap</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            A comprehensive step-by-step guide to mastering React from fundamentals to advanced concepts.
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">10</div>
              <div className="text-sm text-slate-400">Total Stages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">1</div>
              <div className="text-sm text-slate-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">135</div>
              <div className="text-sm text-slate-400">Total Lessons</div>
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {ROADMAP.map((item, index) => (
              <div key={item.step} className="relative">
                {/* Connector Line */}
                {index < ROADMAP.length - 1 && (
                  <div className="absolute left-6 top-20 w-0.5 h-24 bg-gradient-to-b from-cyan-400/50 to-transparent" />
                )}

                {/* Content */}
                <div className="flex gap-6">
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      item.completed
                        ? 'bg-cyan-400 text-slate-950'
                        : 'border-2 border-slate-600 bg-slate-950'
                    }`}>
                      {item.completed ? (
                        <CheckCircle size={20} />
                      ) : (
                        <span>{item.icon}</span>
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 border border-slate-800 rounded-lg p-6 hover:border-slate-700 hover:bg-slate-900/50 transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="text-sm font-bold text-cyan-400 mb-1">STEP {item.step.toString().padStart(2, '0')}</div>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                      </div>
                      {item.completed && (
                        <span className="px-3 py-1 bg-green-900/50 text-green-300 text-xs font-semibold rounded-full">
                          Completed
                        </span>
                      )}
                    </div>

                    <p className="text-slate-400 mb-6">{item.description}</p>

                    {/* Topics Grid */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-300 mb-3">Key Topics</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {item.topics.map(topic => (
                          <div key={topic} className="flex items-center gap-2 text-sm text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <span className="text-sm text-slate-400">{item.lessons} lessons</span>
                      <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition">
                        {item.completed ? 'Review' : 'Start'} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/courses"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Start Your Journey 🚀
            </Link>
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}
