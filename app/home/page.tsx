'use client';

import { Navbar } from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Award, Users, Zap, Target } from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Master React in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">30 Days</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Complete curriculum with 108 lessons, 35 interactive quizzes, and real-world projects. Go from zero to React expert.
          </p>
          {isAuthenticated ? (
            <Button size="lg" onClick={() => router.push('/courses')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              Continue Learning
            </Button>
          ) : (
            <div className="flex gap-4 justify-center">
              <Button size="lg" onClick={() => router.push('/signup')} className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/login')}>
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: '108 Lessons',
              description: 'Comprehensive lessons covering every aspect of React from basics to advanced patterns.'
            },
            {
              icon: <Code className="w-8 h-8" />,
              title: '35 Quizzes',
              description: 'Interactive quizzes with instant feedback to reinforce your learning and track progress.'
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: 'Certificates',
              description: 'Earn certificates after completing each module to showcase your React expertise.'
            },
          ].map((feature, idx) => (
            <Card key={idx} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition">
              <CardHeader>
                <div className="text-purple-400 mb-3">{feature.icon}</div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Active Learners', value: '10,000+' },
            { label: 'Course Completion', value: '95%' },
            { label: 'Average Rating', value: '4.9/5' },
            { label: 'Time to Complete', value: '30 Days' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center hover:border-purple-500/50 transition">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Learning Path */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Learning Path</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Fundamentals', subtitle: 'JavaScript & React Basics' },
              { step: '2', title: 'Components', subtitle: 'JSX & Composition' },
              { step: '3', title: 'State & Props', subtitle: 'Data Management' },
              { step: '4', title: 'Hooks', subtitle: 'Advanced Patterns' },
              { step: '5', title: 'Projects', subtitle: 'Build Real Apps' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-white font-semibold text-center">{item.title}</h3>
                <p className="text-slate-400 text-sm text-center mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {!isAuthenticated && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to master React?</h2>
            <p className="text-blue-100 mb-8 text-lg">Join thousands of developers learning React with our comprehensive curriculum.</p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-slate-100">
              Start Learning Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
