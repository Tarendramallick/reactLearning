import { MongoClient } from 'mongodb';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const MONGODB_URI = process.env.MONGODB_URI!;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: Request) {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return Response.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const usersCollection = db.collection('users');

      // Check if user exists
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return Response.json(
          { error: 'Email already in use' },
          { status: 409 }
        );
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Create user
      const result = await usersCollection.insertOne({
        email,
        password: hashedPassword,
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const userId = result.insertedId.toString();

      // Generate JWT token
      const token = jwt.sign(
        { userId, email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Set cookie
      const cookieStore = await cookies();
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return Response.json(
        {
          success: true,
          user: {
            id: userId,
            email,
            name,
          },
          token,
        },
        { status: 201 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Registration error:', error);
    return Response.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}
