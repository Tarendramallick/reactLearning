import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string; // hashed
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  _id?: ObjectId;
  title: string;
  description: string;
  content: string;
  module: string;
  order: number;
  estimatedTime: number; // in minutes
  videoUrl?: string; // YouTube or other
  resources: {
    title: string;
    url: string;
    type: 'youtube' | 'documentation' | 'article' | 'tutorial';
  }[];
  keyPoints: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  _id?: ObjectId;
  lessonId: ObjectId;
  title: string;
  questions: Question[];
  passingScore: number; // percentage
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  _id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UserProgress {
  _id?: ObjectId;
  userId: ObjectId;
  lessonId: ObjectId;
  completed: boolean;
  completedAt?: Date;
  score?: number;
  attempts: number;
  timeSpent: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface QuizAttempt {
  _id?: ObjectId;
  userId: ObjectId;
  quizId: ObjectId;
  lessonId: ObjectId;
  score: number;
  totalQuestions: number;
  answers: {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }[];
  passed: boolean;
  completedAt: Date;
  createdAt: Date;
}

export interface Module {
  _id?: ObjectId;
  name: string;
  description: string;
  order: number;
  lessons: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
