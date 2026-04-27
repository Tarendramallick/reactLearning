import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const MONGODB_URI = process.env.MONGODB_URI!
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// ─────────────────────────────────────────────
// ✅ Reuse Mongo Client (IMPORTANT)
// ─────────────────────────────────────────────
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!(global as any)._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI)
  ;(global as any)._mongoClientPromise = client.connect()
}
clientPromise = (global as any)._mongoClientPromise

// ─────────────────────────────────────────────
// ✅ Auth Helper (FINAL FIXED)
// ─────────────────────────────────────────────
async function getAuthUser() {
  const cookieStore = await cookies() // ✅ NO await here
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
// Utils
// ─────────────────────────────────────────────
function getDateKey(date: Date) {
  return date.toISOString().split('T')[0]
}

// ✅ Better streak logic
function calculateStreak(days: string[]) {
  if (!days.length) return { current: 0, best: 0 }

  const sorted = [...new Set(days)].sort()

  let best = 1
  let current = 0
  let streak = 1

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1])
    const curr = new Date(sorted[i])

    const diff =
      (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)

    if (diff === 1) {
      streak++
    } else {
      streak = 1
    }

    best = Math.max(best, streak)
  }

  // ✅ current streak (from today)
  const today = new Date()
  let temp = 0

  for (let i = sorted.length - 1; i >= 0; i--) {
    const d = new Date(sorted[i])

    const diff =
      (new Date(today.setHours(0, 0, 0, 0)).getTime() -
        new Date(d.setHours(0, 0, 0, 0)).getTime()) /
      (1000 * 60 * 60 * 24)

    if (diff === temp) {
      temp++
      current++
    } else {
      break
    }
  }

  return { current, best }
}

// ─────────────────────────────────────────────
// GET API
// ─────────────────────────────────────────────
export async function GET() {
  try {
    if (!MONGODB_URI) {
      return Response.json(
        {
          stats: { totalLessons: 0, completedLessons: 0, overallProgress: 0, totalTime: 0 },
          streak: { current: 0, best: 0 },
          heatmap: [],
          recentActivity: [],
        },
        { status: 500 }
      )
    }

    const user = await getAuthUser()

    if (!user) {
      return Response.json(
        {
          stats: { totalLessons: 0, completedLessons: 0, overallProgress: 0, totalTime: 0 },
          streak: { current: 0, best: 0 },
          heatmap: [],
          recentActivity: [],
        },
        { status: 401 }
      )
    }

    const client = await clientPromise
    const db = client.db('react-learning')

    const progressCol = db.collection('user_progress')
    const attemptsCol = db.collection('quiz_attempts')

    const [progress, attempts] = await Promise.all([
      progressCol.find({ email: user.email }).toArray(),
      attemptsCol
        .find({ email: user.email })
        .sort({ completedAt: -1 })
        .limit(20)
        .toArray(),
    ])

    // ─────────────────────────
    // Stats
    // ─────────────────────────
    const totalLessons = 108
    const completedLessons = progress.filter(p => p.completed).length

    const totalTime = progress.reduce(
      (acc, p) => acc + (p.timeSpent || 0),
      0
    )

    const overallProgress =
      totalLessons > 0
        ? Math.round((completedLessons / totalLessons) * 100)
        : 0

    // ─────────────────────────
    // Heatmap
    // ─────────────────────────
    const activityMap: Record<string, number> = {}

    progress.forEach(p => {
      if (p.completedAt) {
        const key = getDateKey(new Date(p.completedAt))
        activityMap[key] = (activityMap[key] || 0) + 1
      }
    })

    attempts.forEach(a => {
      if (a.completedAt) {
        const key = getDateKey(new Date(a.completedAt))
        activityMap[key] = (activityMap[key] || 0) + 1
      }
    })

    const heatmap = Object.entries(activityMap)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))

    // ─────────────────────────
    // Streak
    // ─────────────────────────
    const activeDays = Object.keys(activityMap)
    const streak = calculateStreak(activeDays)

    // ─────────────────────────
    // Recent Activity
    // ─────────────────────────
    const recentActivity = [
      ...progress
        .filter(p => p.completed)
        .map(p => ({
          type: 'lesson',
          label: `Completed Lesson ${p.lessonId}`,
          time: p.completedAt,
        })),
      ...attempts.map(a => ({
        type: 'quiz',
        label: `Quiz Score: ${a.score}/${a.totalQuestions}`,
        time: a.completedAt,
      })),
    ]
      .filter(a => a.time)
      .sort(
        (a, b) =>
          new Date(b.time).getTime() -
          new Date(a.time).getTime()
      )
      .slice(0, 10)

    // ─────────────────────────
    // ✅ ALWAYS SAFE RESPONSE
    // ─────────────────────────
    return Response.json({
      stats: {
        totalLessons,
        completedLessons,
        overallProgress,
        totalTime,
      },
      streak,
      heatmap,
      recentActivity,
    })
  } catch (error) {
    console.error('Analytics error:', error)

    // ✅ NEVER return undefined structure
    return Response.json({
      stats: { totalLessons: 0, completedLessons: 0, overallProgress: 0, totalTime: 0 },
      streak: { current: 0, best: 0 },
      heatmap: [],
      recentActivity: [],
    })
  }
}