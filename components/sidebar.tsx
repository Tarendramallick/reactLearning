'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, Settings } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/home', icon: '🏠' },
  { label: 'Roadmap', href: '/roadmap', icon: '🗺️' },
  { label: 'Courses', href: '/courses', icon: '📚' },
  { label: 'Projects', href: '/projects', icon: '🎯' },
  { label: 'Tracker', href: '/tracker', icon: '📊' },
  { label: 'Resources', href: '/resources', icon: '💡' },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-slate-900 border border-cyan-500/30 rounded-lg p-2"
      >
        {isOpen ? <X size={20} className="text-cyan-400" /> : <Menu size={20} className="text-cyan-400" />}
      </button>

      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-300 z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-lg font-bold text-white">ReactMastery</span>
          </Link>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900/50 transition-colors"
            >
              <Settings size={18} />
              Settings
            </Link>

            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            )}
          </div>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
