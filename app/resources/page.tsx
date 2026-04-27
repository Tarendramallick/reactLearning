'use client'

import { Sidebar } from '@/components/sidebar'
import { useEffect } from 'react'
import { ExternalLink } from 'lucide-react'

const RESOURCES = [
  {
    category: 'Documentation',
    items: [
      { title: 'React Official Docs', url: 'https://react.dev', description: 'The official React documentation' },
      { title: 'React Router Docs', url: 'https://reactrouter.com', description: 'Complete guide to React Router' },
      { title: 'Next.js Docs', url: 'https://nextjs.org/docs', description: 'Full-stack React framework documentation' },
    ]
  },
  {
    category: 'Tools & Libraries',
    items: [
      { title: 'Create React App', url: 'https://create-react-app.dev', description: 'Setup React apps with zero config' },
      { title: 'Vite', url: 'https://vitejs.dev', description: 'Next generation frontend tooling' },
      { title: 'Redux', url: 'https://redux.js.org', description: 'Predictable state management' },
    ]
  },
  {
    category: 'Learning Platforms',
    items: [
      { title: 'Frontend Masters', url: 'https://frontendmasters.com', description: 'Expert-level courses' },
      { title: 'egghead.io', url: 'https://egghead.io', description: 'Bite-sized coding tutorials' },
      { title: 'Scrimba', url: 'https://scrimba.com', description: 'Interactive coding courses' },
    ]
  },
  {
    category: 'Community',
    items: [
      { title: 'React Discord', url: 'https://discord.gg/react', description: 'Official React community' },
      { title: 'Dev.to', url: 'https://dev.to', description: 'Community for developers' },
      { title: 'Stack Overflow', url: 'https://stackoverflow.com/questions/tagged/reactjs', description: 'Q&A for developers' },
    ]
  },
]

export default function ResourcesPage() {
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
          <h1 className="text-4xl font-bold mb-2">Resources</h1>
          <p className="text-slate-400">Curated learning resources and tools for React development</p>
        </div>
      </header>

      {/* Resources */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {RESOURCES.map(section => (
            <div key={section.category}>
              <h2 className="text-2xl font-bold mb-6">{section.category}</h2>
              <div className="grid gap-4">
                {section.items.map(item => (
                  <a
                    key={item.title}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 hover:bg-slate-900/50 transition"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition">
                          {item.title}
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                      </div>
                      <ExternalLink size={20} className="text-slate-400 group-hover:text-cyan-400 transition flex-shrink-0 mt-1" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      </main>
    </div>
  )
}
