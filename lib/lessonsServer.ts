import { ObjectId } from 'mongodb';
import { connectToDatabase } from '@/lib/mongodb';

export interface ServerLesson {
  _id: string;
  title: string;
  description: string;
  module: string;
  order: number;
  estimatedTime: number;
  content: string;
  videoUrl?: string;
  resources: Array<{ title: string; url: string; type: string }>;
  keyPoints: string[];
}

function serializeLesson(lesson: Record<string, unknown>): ServerLesson {
  return {
    _id: String(lesson._id),
    title: String(lesson.title ?? ''),
    description: String(lesson.description ?? ''),
    module: String(lesson.module ?? ''),
    order: Number(lesson.order ?? 0),
    estimatedTime: Number(lesson.estimatedTime ?? 0),
    content: String(lesson.content ?? ''),
    videoUrl: typeof lesson.videoUrl === 'string' ? lesson.videoUrl : undefined,
    resources: Array.isArray(lesson.resources) ? lesson.resources as ServerLesson['resources'] : [],
    keyPoints: Array.isArray(lesson.keyPoints) ? lesson.keyPoints as string[] : [],
  };
}

export async function getLessons(): Promise<ServerLesson[]> {
  const { db } = await connectToDatabase();
  const lessons = await db.collection('lessons').find({}).sort({ order: 1 }).toArray();
  return lessons.map((lesson) => serializeLesson(lesson as unknown as Record<string, unknown>));
}

export async function getLesson(id: string): Promise<ServerLesson | null> {
  if (!ObjectId.isValid(id)) return null;
  const { db } = await connectToDatabase();
  const lesson = await db.collection('lessons').findOne({ _id: new ObjectId(id) });
  return lesson ? serializeLesson(lesson as unknown as Record<string, unknown>) : null;
}
