import { MongoClient, ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const MONGODB_URI = process.env.MONGODB_URI!;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET() {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  const authUser = await getAuthUser();
  if (!authUser) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const progressCollection = db.collection('user_progress');

      // Get user progress
      const progress = await progressCollection
        .find({ email: authUser.email })
        .toArray();

      return Response.json(
        { progress },
        { status: 200 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Progress fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  const authUser = await getAuthUser();
  if (!authUser) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { lessonId, completed, timeSpent } = await request.json();

    if (!lessonId) {
      return Response.json(
        { error: 'lessonId is required' },
        { status: 400 }
      );
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const progressCollection = db.collection('user_progress');

      // Update or create progress record
      const result = await progressCollection.updateOne(
        { email: authUser.email, lessonId },
        {
          $set: {
            completed: completed || false,
            completedAt: completed ? new Date() : null,
            timeSpent: timeSpent || 0,
            updatedAt: new Date(),
          },
          $inc: { attempts: 1 },
          $setOnInsert: {
            email: authUser.email,
            lessonId,
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );

      return Response.json(
        { success: true, result },
        { status: 200 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Progress update error:', error);
    return Response.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
