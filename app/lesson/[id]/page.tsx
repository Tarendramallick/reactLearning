'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  content: string;
  estimatedTime: number;
  videoUrl?: string;
  resources: Array<{ title: string; url: string; type: string }>;
  keyPoints: string[];
}

interface Question {
  _id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  _id: string;
  lessonId: string;
  title: string;
  questions: Question[];
  passingScore: number;
}

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const { isAuthenticated } = useAuthStore();
  const { setLessonProgress, setQuizAttempt } = useProgressStore();

  const [lesson, setLesson]           = useState<Lesson | null>(null);
  const [quiz, setQuiz]               = useState<Quiz | null>(null);
  const [lessonLoading, setLessonLoading] = useState(true);
  const [quizLoading, setQuizLoading] = useState(false);  // quiz loads on tab click
  const [quizFetched, setQuizFetched] = useState(false);

  const [activeTab, setActiveTab]     = useState<'content' | 'resources' | 'quiz'>('content');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore]     = useState(0);

  /* ── CRITICAL FIX: fetch only this lesson by ID, not ALL lessons ── */
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchLesson = async () => {
      try {
        // Pass lessonId so the server returns only the one lesson
        const res = await fetch(`/api/lessons/${lessonId}`);
        if (res.ok) {
          const data = await res.json();
          setLesson(data.lesson);
        } else {
          // Fallback: if the API doesn't support /api/lessons/:id yet,
          // fall back to the list endpoint and filter client-side
          const fallback = await fetch('/api/lessons');
          if (fallback.ok) {
            const data = await fallback.json();
            const found = data.lessons?.find((l: any) => l._id === lessonId);
            if (found) setLesson(found);
          }
        }
      } catch (error) {
        console.error('Error fetching lesson:', error);
      } finally {
        setLessonLoading(false);
      }
    };

    fetchLesson();
  }, [router, lessonId, isAuthenticated]);

  /* ── Fetch quiz ONLY when the quiz tab is opened ── */
  const handleTabChange = async (tab: 'content' | 'resources' | 'quiz') => {
    setActiveTab(tab);

    if (tab === 'quiz' && !quizFetched) {
      setQuizLoading(true);
      setQuizFetched(true);
      try {
        const res = await fetch(`/api/quizzes?lessonId=${encodeURIComponent(lessonId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.quizzes?.length > 0) setQuiz(data.quizzes[0]);
        }
      } catch (error) {
        console.error('Error fetching quiz:', error);
      } finally {
        setQuizLoading(false);
      }
    }
  };

  const handleQuizSubmit = async () => {
    if (!quiz || !lesson) return;

    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz._id,
          answers: quiz.questions.map((question, qIdx) => ({
            questionId: question._id,
            selectedAnswer: quizAnswers[qIdx],
          })),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setQuizScore(result.percentage);
        setQuizSubmitted(true);

        setQuizAttempt(quiz._id, {
          quizId: quiz._id,
          score: result.percentage,
          totalQuestions: quiz.questions.length,
          passed: result.passed,
          attemptedAt: new Date(),
        });

        // Fire-and-forget progress update (don't block the UI)
        fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lessonId,
            completed: result.passed,
            timeSpent: Math.round(Math.random() * 30) + 10,
          }),
        }).catch(console.error);

        setLessonProgress(lessonId, {
          lessonId,
          completed: result.passed,
          completedAt: new Date(),
          attempts: 1,
          timeSpent: 10,
        });
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (lessonLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-slate-300">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <p className="text-slate-300 text-lg">Lesson not found.</p>
          <Button className="mt-4" onClick={() => router.push('/courses')}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Lesson Header */}
        <Card className="bg-slate-800/50 border-slate-700 mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-white text-3xl mb-2">{lesson.title}</CardTitle>
                <CardDescription className="text-slate-300 text-lg">
                  {lesson.description}
                </CardDescription>
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <Badge variant="outline" className="border-slate-600">⏱ {lesson.estimatedTime} minutes</Badge>
              <Badge variant="outline" className="border-slate-600">📚 {lesson.keyPoints?.length || 0} Key Points</Badge>
              <Badge variant="outline" className="border-slate-600">🔗 {lesson.resources?.length || 0} Resources</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-700">
          {(['content', 'resources', 'quiz'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-300'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {lesson.videoUrl && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Video Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      width="100%" height="100%"
                      src={lesson.videoUrl}
                      title="Video lesson"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader><CardTitle className="text-white">Lesson Content</CardTitle></CardHeader>
              <CardContent>
                <div className="text-slate-300 prose prose-invert max-w-none">
                  {lesson.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader><CardTitle className="text-white">Key Points</CardTitle></CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {lesson.keyPoints?.map((point, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-300">
                      <span className="text-purple-400 font-bold">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader><CardTitle className="text-white">Learning Resources</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lesson.resources?.map((resource, idx) => (
                  <a
                    key={idx}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition border border-slate-600"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{resource.title}</p>
                        <Badge className="mt-2">{resource.type}</Badge>
                      </div>
                      <span className="text-purple-400">↗</span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <>
            {quizLoading && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6 flex justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"/>
                    <p className="mt-3 text-slate-400 text-sm">Loading quiz...</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {!quizLoading && !quiz && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="pt-6">
                  <p className="text-slate-300">No quiz available for this lesson yet.</p>
                </CardContent>
              </Card>
            )}

            {!quizLoading && quiz && !quizSubmitted && (
              <div className="space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">{quiz.title}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {quiz.questions.length} questions • {quiz.passingScore}% passing score
                    </CardDescription>
                  </CardHeader>
                </Card>

                {quiz.questions.map((question, qIdx) => (
                  <Card key={`question-${qIdx}`} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="pt-6">
                      <p className="text-white font-semibold mb-4">
                        {qIdx + 1}. {question.question}
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, oIdx) => (
                          <label
                            key={`q${qIdx}-o${oIdx}`}
                            className={`flex items-center p-3 rounded-lg cursor-pointer transition ${
                              quizAnswers[qIdx] === oIdx
                                ? 'bg-purple-500/30 border border-purple-500'
                                : 'bg-slate-700/30 border border-slate-600 hover:bg-slate-700/50'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`question-group-${qIdx}`}
                              checked={quizAnswers[qIdx] === oIdx}
                              onChange={() => setQuizAnswers({ ...quizAnswers, [qIdx]: oIdx })}
                              className="mr-3"
                            />
                            <span className="text-slate-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length !== quiz.questions.length}
                >
                  Submit Quiz
                </Button>
              </div>
            )}

            {!quizLoading && quiz && quizSubmitted && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader><CardTitle className="text-white">Quiz Results</CardTitle></CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-6xl font-bold text-purple-400 mb-4">{quizScore}%</div>
                    <p className="text-white text-xl mb-6">
                      {quizScore >= quiz.passingScore
                        ? 'Congratulations! You passed!'
                        : 'Try again to improve your score.'}
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}>
                        Retake Quiz
                      </Button>
                      <Button variant="outline" onClick={() => router.push('/courses')}>
                        Back to Courses
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}