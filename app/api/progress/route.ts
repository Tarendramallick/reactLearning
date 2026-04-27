import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { checkRateLimit } from '@/lib/rateLimiter';

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// ✅ Reuse Mongo client (important)
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI!);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

// ✅ Auth helper
async function getAuthUser() {
  const cookieStore = await cookies(); // ❌ no await
  const token = cookieStore.get('auth-token')?.value;

  if (!token) return null;

  try {
    return jwt.verify(token, JWT_SECRET) as {
      email: string;
      userId?: string;
    };
  } catch {
    return null;
  }
}

// ✅ GET USER PROGRESS
export async function GET() {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  const authUser = await getAuthUser();

  if (!authUser) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('react-learning');

    const progress = await db
      .collection('user_progress')
      .find({ email: authUser.email })
      .toArray();

    return Response.json({ progress }, { status: 200 });
  } catch (error) {
    console.error('GET progress error:', error);
    return Response.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// ✅ UPDATE PROGRESS (WITH RATE LIMIT)
export async function POST(request: Request) {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  const authUser = await getAuthUser();

  if (!authUser) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 🚦 RATE LIMIT
  const ip =
    request.headers.get('x-forwarded-for') ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const rateKey = authUser.userId || authUser.email || ip;
  const rateLimit = checkRateLimit(rateKey);

  if (!rateLimit.allowed) {
    return Response.json(
      {
        error: 'Too many requests. Try again later.',
        retryAfter: Math.ceil((rateLimit.remainingTime ?? 0) / 1000),
      },
      { status: 429 }
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

    const client = await clientPromise;
    const db = client.db('react-learning');

    const result = await db.collection('user_progress').updateOne(
      { email: authUser.email, lessonId },
      {
        $set: {
          completed: completed ?? false,
          completedAt: completed ? new Date() : null,
          timeSpent: timeSpent ?? 0,
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
  } catch (error) {
    console.error('POST progress error:', error);
    return Response.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}