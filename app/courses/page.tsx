'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';

interface Lesson {
  _id: string;
  title: string;
  description: string;
  module: string;
  estimatedTime: number;
  content: string;
  resources: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  keyPoints: string[];
}

export default function CoursesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { lessons: progressLessons, loadProgress } = useProgressStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState<string>('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch lessons
        const lessonsRes = await fetch('/api/lessons');
        if (lessonsRes.ok) {
          const data = await lessonsRes.json();
          setLessons(data.lessons);
          if (data.lessons.length > 0) {
            setSelectedModule(data.lessons[0].module);
          }
        }

        // Fetch progress
        const progressRes = await fetch('/api/progress');
        if (progressRes.ok) {
          const progressData = await progressRes.json();
          loadProgress(progressData.progress, progressData.quizAttempts);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, router, loadProgress]);

  const modules = [...new Set(lessons.map(l => l.module))];
  const filteredLessons = selectedModule
    ? lessons.filter(l => l.module === selectedModule)
    : lessons;

  const completedLessons = Object.values(progressLessons).filter(p => p.completed).length;
  const totalLessons = lessons.length;
  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-slate-300">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle className="text-white">Your Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-white font-semibold">
                {completedLessons}/{totalLessons} Lessons ({progressPercentage}%)
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Modules */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {modules.map((module) => (
                  <button
                    key={module}
                    onClick={() => setSelectedModule(module)}
                    className={`w-full text-left px-3 py-2 rounded transition ${
                      selectedModule === module
                        ? 'bg-purple-500/30 border border-purple-500 text-purple-300'
                        : 'text-slate-300 hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="font-medium">{module}</div>
                    <div className="text-xs text-slate-400">
                      {lessons.filter(l => l.module === module).length} lessons
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Lessons */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-3xl font-bold text-white mb-6">{selectedModule}</h2>

            {filteredLessons.map((lesson) => {
              const lessonProgress = progressLessons[lesson._id];
              const isCompleted = lessonProgress?.completed;

              return (
                <Card
                  key={lesson._id}
                  className="bg-slate-800/50 border-slate-700 hover:border-purple-500 transition cursor-pointer"
                  onClick={() => router.push(`/lesson/${lesson._id}`)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white">{lesson.title}</CardTitle>
                        <CardDescription className="text-slate-400">
                          {lesson.description}
                        </CardDescription>
                      </div>
                      {isCompleted && (
                        <Badge className="bg-green-500/30 text-green-300">Completed</Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-slate-400 text-sm">Duration</p>
                        <p className="text-white font-semibold">{lesson.estimatedTime} min</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Resources</p>
                        <p className="text-white font-semibold">{lesson.resources?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Key Points</p>
                        <p className="text-white font-semibold">{lesson.keyPoints?.length || 0}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Quiz</p>
                        <p className="text-white font-semibold">Available</p>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap mb-4">
                      {lesson.keyPoints?.slice(0, 2).map((point, idx) => (
                        <Badge key={idx} variant="outline" className="border-slate-600">
                          {point}
                        </Badge>
                      ))}
                      {lesson.keyPoints?.length > 2 && (
                        <Badge variant="outline" className="border-slate-600">
                          +{lesson.keyPoints.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <Button className="w-full">
                      {isCompleted ? 'Review Lesson' : 'Start Learning'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
