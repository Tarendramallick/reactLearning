import { getLessons } from '@/lib/lessonsServer';

export async function GET() {
  try {
    const lessons = await getLessons();
    if (lessons.length === 0) {
      return Response.json({ error: 'No lessons found.' }, { status: 404 });
    }
    return Response.json({ lessons }, { status: 200 });
  } catch (error) {
    console.error('Lessons fetch error:', error);
    return Response.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}
