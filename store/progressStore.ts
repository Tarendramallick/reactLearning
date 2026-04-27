import { create } from 'zustand';

interface LessonProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: Date;
  attempts: number;
  timeSpent: number;
}

interface QuizAttempt {
  quizId: string;
  score: number;
  totalQuestions: number;
  passed: boolean;
  attemptedAt: Date;
}

interface ProgressStore {
  lessons: Record<string, LessonProgress>;
  quizzes: Record<string, QuizAttempt>;
  setLessonProgress: (lessonId: string, progress: LessonProgress) => void;
  setQuizAttempt: (quizId: string, attempt: QuizAttempt) => void;
  loadProgress: (lessons: LessonProgress[], quizzes: QuizAttempt[]) => void;
  getCompletedLessonCount: () => number;
  getTotalLessonCount: () => number;
  getProgressPercentage: () => number;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  lessons: {},
  quizzes: {},

  setLessonProgress: (lessonId: string, progress: LessonProgress) => {
    set((state) => ({
      lessons: {
        ...state.lessons,
        [lessonId]: progress,
      },
    }));
  },

  setQuizAttempt: (quizId: string, attempt: QuizAttempt) => {
    set((state) => ({
      quizzes: {
        ...state.quizzes,
        [quizId]: attempt,
      },
    }));
  },

  loadProgress: (lessons: LessonProgress[], quizzes: QuizAttempt[]) => {
    const lessonsMap: Record<string, LessonProgress> = {};
    const quizzesMap: Record<string, QuizAttempt> = {};

    lessons.forEach((lesson) => {
      lessonsMap[lesson.lessonId] = lesson;
    });

    quizzes.forEach((quiz) => {
      quizzesMap[quiz.quizId] = quiz;
    });

    set({
      lessons: lessonsMap,
      quizzes: quizzesMap,
    });
  },

  getCompletedLessonCount: () => {
    const state = get();
    return Object.values(state.lessons).filter((l) => l.completed).length;
  },

  getTotalLessonCount: () => {
    const state = get();
    return Object.keys(state.lessons).length;
  },

  getProgressPercentage: () => {
    const state = get();
    const total = Object.keys(state.lessons).length;
    if (total === 0) return 0;
    const completed = Object.values(state.lessons).filter((l) => l.completed).length;
    return Math.round((completed / total) * 100);
  },
}));
