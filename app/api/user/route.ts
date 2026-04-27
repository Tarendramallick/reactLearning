import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const MONGODB_URI = process.env.MONGODB_URI!;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function GET() {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Verify token
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return Response.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const usersCollection = db.collection('users');
      const progressCollection = db.collection('user_progress');

      // Get user data
      const user = await usersCollection.findOne({ email: decoded.email });
      if (!user) {
        return Response.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      // Get user progress stats
      const completedLessons = await progressCollection.countDocuments({
        email: decoded.email,
        completed: true,
      });

      const totalAttempts = await progressCollection.countDocuments({
        email: decoded.email,
      });

      return Response.json(
        {
          user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
          },
          stats: {
            completedLessons,
            totalAttempts,
          },
        },
        { status: 200 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('User fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
