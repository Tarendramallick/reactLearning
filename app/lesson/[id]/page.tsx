import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/authUtils';
import { getLesson } from '@/lib/lessonsServer';
import LessonClient from '@/components/LessonClient';

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const { id } = await params;
  const lesson = await getLesson(id);
  if (!lesson) notFound();

  return <LessonClient lesson={lesson} lessonId={id} />;
}
