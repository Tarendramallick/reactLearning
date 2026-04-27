'use client'

import { Sidebar } from '@/components/sidebar'
import { useState, useEffect } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const COURSES = [
  {
    id: 1,
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript ES6+ before diving into React',
    lessons: 12,
    duration: '4 weeks',
    level: 'Beginner',
    progress: 0,
    topics: ['Variables', 'Functions', 'Async/Await', 'ES6 Features'],
  },
  {
    id: 2,
    title: 'React Fundamentals',
    description: 'Learn the core concepts of React',
    lessons: 15,
    duration: '5 weeks',
    level: 'Beginner',
    progress: 20,
    topics: ['JSX', 'Components', 'Props', 'State'],
  },
  {
    id: 3,
    title: 'Hooks & State Management',
    description: 'Deep dive into React Hooks and state patterns',
    lessons: 18,
    duration: '6 weeks',
    level: 'Intermediate',
    progress: 0,
    topics: ['useState', 'useEffect', 'Custom Hooks', 'Context'],
  },
  {
    id: 4,
    title: 'Advanced React Patterns',
    description: 'Master advanced React patterns and optimization',
    lessons: 14,
    duration: '5 weeks',
    level: 'Advanced',
    progress: 0,
    topics: ['Performance', 'Code Splitting', 'Error Boundaries', 'Suspense'],
  },
  {
    id: 5,
    title: 'React Router & Navigation',
    description: 'Build multi-page applications with React Router',
    lessons: 10,
    duration: '3 weeks',
    level: 'Intermediate',
    progress: 0,
    topics: ['Routing', 'Dynamic Routes', 'Nested Routes', 'Navigation'],
  },
  {
    id: 6,
    title: 'Testing React Applications',
    description: 'Write comprehensive tests for React components',
    lessons: 12,
    duration: '4 weeks',
    level: 'Intermediate',
    progress: 0,
    topics: ['Unit Tests', 'Integration Tests', 'Jest', 'React Testing Library'],
  },
]

export default function CoursesPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      window.location.href = '/'
    }
  }, [])

  const filteredCourses = selectedLevel
    ? COURSES.filter(c => c.level === selectedLevel)
    : COURSES

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      
      <main className="flex-1 md:ml-64">
      {/* Header */}
      <header className="border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Courses</h1>
          <p className="text-xl text-slate-400 max-w-2xl">
            Choose your learning path and start mastering React today.
          </p>
        </div>
      </header>

      {/* Filter */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedLevel(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedLevel === null
                  ? 'bg-cyan-400 text-slate-950'
                  : 'border border-slate-700 hover:border-cyan-400'
              }`}
            >
              All Levels
            </button>
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedLevel === level
                    ? 'bg-cyan-400 text-slate-950'
                    : 'border border-slate-700 hover:border-cyan-400'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 hover:shadow-lg transition group"
              >
                {/* Course Header */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
                      <p className="text-slate-400 text-sm">{course.description}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Course Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{course.lessons} lessons</span>
                    <span className="text-slate-400">{course.duration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      course.level === 'Beginner'
                        ? 'bg-green-900/50 text-green-300'
                        : course.level === 'Intermediate'
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-purple-900/50 text-purple-300'
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  {/* Topics */}
                  <div className="space-y-2">
                    {course.topics.map(topic => (
                      <div key={topic} className="flex items-center gap-2 text-sm text-slate-400">
                        <CheckCircle size={14} className="text-cyan-400" />
                        {topic}
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition flex items-center justify-center gap-2 group-hover:gap-3">
                    {course.progress > 0 ? 'Continue Course' : 'Start Course'}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>
    </div>
  )
}
