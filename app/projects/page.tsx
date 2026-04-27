'use client'

import { useAuthStore } from '@/store/authStore'
import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import { Code2, GitBranch, Users } from 'lucide-react'

const PROJECTS = [
  {
    id: 1,
    title: 'Todo App',
    description: 'Build a fully functional todo application with React hooks',
    difficulty: 'Beginner',
    modules: ['React Basics', 'State Management', 'Local Storage'],
    image: '📝',
  },
  {
    id: 2,
    title: 'Weather App',
    description: 'Create a weather app using React and weather APIs',
    difficulty: 'Intermediate',
    modules: ['API Integration', 'useEffect Hook', 'Error Handling'],
    image: '🌤️',
  },
  {
    id: 3,
    title: 'E-commerce Store',
    description: 'Build a complete e-commerce store with cart functionality',
    difficulty: 'Intermediate',
    modules: ['Advanced State', 'Context API', 'Routing'],
    image: '🛒',
  },
  {
    id: 4,
    title: 'Social Media App',
    description: 'Create a social media platform with posts and comments',
    difficulty: 'Advanced',
    modules: ['Complex State', 'Real-time Updates', 'Authentication'],
    image: '📱',
  },
  {
    id: 5,
    title: 'Task Management Dashboard',
    description: 'Build a project management dashboard with drag-and-drop',
    difficulty: 'Advanced',
    modules: ['Advanced Patterns', 'Performance', 'Animations'],
    image: '📊',
  },
  {
    id: 6,
    title: 'Chat Application',
    description: 'Create a real-time chat app with WebSocket integration',
    difficulty: 'Advanced',
    modules: ['WebSockets', 'Real-time Data', 'Advanced Hooks'],
    image: '💬',
  },
]

export default function ProjectsPage() {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="border-b border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-slate-400">Build real-world projects and strengthen your portfolio</p>
        </div>
      </header>

      {/* Projects Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map(project => (
              <div key={project.id} className="border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 hover:bg-slate-900/50 transition group">
                {/* Project Header */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                  <div className="text-5xl mb-4">{project.image}</div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm">{project.description}</p>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  {/* Difficulty */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Difficulty</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      project.difficulty === 'Beginner'
                        ? 'bg-green-900/50 text-green-300'
                        : project.difficulty === 'Intermediate'
                        ? 'bg-blue-900/50 text-blue-300'
                        : 'bg-purple-900/50 text-purple-300'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Modules */}
                  <div>
                    <p className="text-sm text-slate-400 mb-2">Modules</p>
                    <div className="space-y-1">
                      {project.modules.map(module => (
                        <div key={module} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          {module}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-800">
                    <div className="text-center">
                      <div className="text-xs text-slate-400">Steps</div>
                      <div className="text-lg font-bold text-cyan-400">5</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-400">Hours</div>
                      <div className="text-lg font-bold text-cyan-400">8-12</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-slate-400">Points</div>
                      <div className="text-lg font-bold text-cyan-400">500</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition">
                    Start Project
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
