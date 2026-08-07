import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/authUtils';
import { getLessons } from '@/lib/lessonsServer';
import RoadmapClient from '@/components/RoadmapClient';

export default async function RoadmapPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const lessons = await getLessons();
  return <RoadmapClient initialLessons={lessons} />;
}
