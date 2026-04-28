// app/api/lessons/route.ts
// Pure DB read — no seed data lives here.
// Run `npx tsx scripts/seed.ts` once to populate the database.

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

// ── Cached connection (shared across requests) ──
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;
if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise!;

// ── GET /api/lessons ──────────────────────────
export async function GET() {
  if (!MONGODB_URI) {
    return Response.json({ error: 'MongoDB URI not configured' }, { status: 500 });
  }

  try {
    const client = await clientPromise;
    const db     = client.db('react-learning');

    const lessons = await db
      .collection('lessons')
      .find({})
      .sort({ order: 1 })
      .project({            // only send fields the UI actually needs
        title:         1,
        description:   1,
        module:        1,
        order:         1,
        estimatedTime: 1,
        keyPoints:     1,
        resources:     1,
        content:       1,
      })
      .toArray();

    if (lessons.length === 0) {
      return Response.json(
        { error: 'No lessons found. Run `npx tsx scripts/seed.ts` to seed the database.' },
        { status: 404 }
      );
    }

    return Response.json({ lessons }, { status: 200 });
  } catch (error) {
    console.error('Lessons fetch error:', error);
    return Response.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}