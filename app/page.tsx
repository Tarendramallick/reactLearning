'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';

export default function Home() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Master React in 1 Month
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Complete curriculum with lessons, practice questions, and progress tracking
          </p>
          {isAuthenticated && user ? (
            <Button size="lg" onClick={() => router.push('/courses')}>
              Continue Learning
            </Button>
          ) : (
            <Button size="lg" onClick={() => router.push('/signup')}>
              Get Started Free
            </Button>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition">
            <CardHeader>
              <CardTitle className="text-white">15+ Comprehensive Lessons</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Learn React fundamentals, hooks, state management, and advanced patterns
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition">
            <CardHeader>
              <CardTitle className="text-white">Practice Questions</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              3-5 questions per lesson to reinforce your knowledge
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition">
            <CardHeader>
              <CardTitle className="text-white">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              Track your progress and quiz scores to stay motivated
            </CardContent>
          </Card>
        </div>

        {/* Learning Modules */}
        {isAuthenticated && (
          <div>
            <h3 className="text-3xl font-bold text-white mb-8">Learning Modules</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:border-blue-500 transition cursor-pointer"
                onClick={() => router.push('/courses')}>
                <CardHeader>
                  <CardTitle className="text-white">React Fundamentals</CardTitle>
                  <CardDescription className="text-slate-400">Learn the core concepts</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">3 lessons covering JSX, components, and props</p>
                  <Button variant="outline" className="w-full">Start Learning</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-green-500 transition cursor-pointer"
                onClick={() => router.push('/courses')}>
                <CardHeader>
                  <CardTitle className="text-white">Component Mastery</CardTitle>
                  <CardDescription className="text-slate-400">Advanced component patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">3 lessons on rendering, composition, and lists</p>
                  <Button variant="outline" className="w-full">Start Learning</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-yellow-500 transition cursor-pointer"
                onClick={() => router.push('/courses')}>
                <CardHeader>
                  <CardTitle className="text-white">State & Props</CardTitle>
                  <CardDescription className="text-slate-400">Master state management</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">3 lessons on useState, events, and lifting state</p>
                  <Button variant="outline" className="w-full">Start Learning</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-pink-500 transition cursor-pointer"
                onClick={() => router.push('/courses')}>
                <CardHeader>
                  <CardTitle className="text-white">Advanced Hooks</CardTitle>
                  <CardDescription className="text-slate-400">Professional-level patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">4 lessons on useEffect, useContext, useReducer, and custom hooks</p>
                  <Button variant="outline" className="w-full">Start Learning</Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 hover:border-indigo-500 transition cursor-pointer"
                onClick={() => router.push('/courses')}>
                <CardHeader>
                  <CardTitle className="text-white">Styling & Performance</CardTitle>
                  <CardDescription className="text-slate-400">Polish your apps</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">2 lessons on styling approaches and optimization</p>
                  <Button variant="outline" className="w-full">Start Learning</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
