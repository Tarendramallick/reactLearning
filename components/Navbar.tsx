'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    logout();
    router.push('/login');
  };

  return (
    <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
          <h1 className="text-xl font-bold text-white hidden sm:block">React Learning</h1>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  href="/"
                  className="text-slate-300 hover:text-white transition"
                >
                  Home
                </Link>
                <Link
                  href="/courses"
                  className="text-slate-300 hover:text-white transition"
                >
                  Courses
                </Link>
                <span className="text-slate-400 text-sm">{user.name}</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="sm:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                  <DropdownMenuItem
                    onClick={() => router.push('/')}
                    className="text-slate-300 hover:text-white cursor-pointer"
                  >
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push('/courses')}
                    className="text-slate-300 hover:text-white cursor-pointer"
                  >
                    Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={handleLogout}
                variant="outline"
                className="hidden sm:block"
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
              <Button onClick={() => router.push('/signup')} className="hidden sm:block">
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
