import jwt from 'jsonwebtoken'
import { connectToDatabase } from '@/lib/mongodb'
import { cookies } from 'next/headers'

// ─────────────────────────────────────────────
// ENV
// ─────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI!
const JWT_SECRET =
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'

const getClient = async () => (await connectToDatabase()).client;

// ─────────────────────────────────────────────
// ✅ AUTH HELPER
// ─────────────────────────────────────────────
async function getAuthUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')?.value

  if (!token) return null

  try {
    return jwt.verify(token, JWT_SECRET) as {
      email: string
      userId?: string
    }
  } catch {
    return null
  }
}

// ─────────────────────────────────────────────
// GET: FETCH PROGRESS + QUIZ
// ─────────────────────────────────────────────
export async function GET() {
  try {
    if (!MONGODB_URI) {
      return Response.json(
        { error: 'MongoDB URI not configured' },
        { status: 500 }
      )
    }

    const authUser = await getAuthUser()

    if (!authUser) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const client = await getClient()
    const db = client.db('react-learning')

    const progressCollection = db.collection('user_progress')
    const quizCollection = db.collection('quiz_attempts')

    // ✅ Fetch in parallel (faster)
    const [progress, quizAttempts] = await Promise.all([
      progressCollection
        .find({ email: authUser.email })
        .toArray(),

      quizCollection
        .find({ email: authUser.email })
        .toArray(),
    ])

    // ✅ Normalize data (VERY IMPORTANT)
    const safeProgress = (progress || []).map((p) => ({
      lessonId: p.lessonId,
      completed: p.completed ?? false,
      completedAt: p.completedAt ?? null,
      attempts: p.attempts ?? 0,
      timeSpent: p.timeSpent ?? 0,
    }))

    const safeQuizAttempts = (quizAttempts || []).map((q) => ({
      quizId: q.quizId,
      score: q.score ?? 0,
      totalQuestions: q.totalQuestions ?? 0,
      passed: q.passed ?? false,
      attemptedAt: q.attemptedAt ?? null,
    }))

    return Response.json(
      {
        progress: safeProgress,
        quizAttempts: safeQuizAttempts,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET progress error:', error)

    return Response.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────────
// POST: UPDATE LESSON PROGRESS
// ─────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    if (!MONGODB_URI) {
      return Response.json(
        { error: 'MongoDB URI not configured' },
        { status: 500 }
      )
    }

    const authUser = await getAuthUser()

    if (!authUser) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const lessonId: string = body.lessonId
    const completed: boolean = body.completed ?? false
    const timeSpent: number = body.timeSpent ?? 0

    if (!lessonId) {
      return Response.json(
        { error: 'lessonId is required' },
        { status: 400 }
      )
    }

    const client = await getClient()
    const db = client.db('react-learning')

    const progressCollection = db.collection('user_progress')

    const result = await progressCollection.updateOne(
      { email: authUser.email, lessonId },
      {
        $set: {
          completed,
          completedAt: completed ? new Date() : null,
          timeSpent,
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
    )

    return Response.json(
      {
        success: true,
        result,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('POST progress error:', error)

    return Response.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

// ─────────────────────────────────────────────
// OPTIONAL: POST QUIZ ATTEMPT
// (future-ready)
// ─────────────────────────────────────────────
export async function PUT(request: Request) {
  try {
    const authUser = await getAuthUser()

    if (!authUser) {
      return Response.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    const { quizId, score, totalQuestions, passed } = body

    if (!quizId) {
      return Response.json(
        { error: 'quizId is required' },
        { status: 400 }
      )
    }

    const client = await getClient()
    const db = client.db('react-learning')

    const quizCollection = db.collection('quiz_attempts')

    await quizCollection.insertOne({
      email: authUser.email,
      quizId,
      score: score ?? 0,
      totalQuestions: totalQuestions ?? 0,
      passed: passed ?? false,
      attemptedAt: new Date(),
    })

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('PUT quiz error:', error)

    return Response.json(
      { error: 'Failed to save quiz attempt' },
      { status: 500 }
    )
  }
}
