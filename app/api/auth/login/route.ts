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
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return Response.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const usersCollection = db.collection('users');

      // Find user
      const user = await usersCollection.findOne({ email });
      if (!user) {
        return Response.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Check password
      const passwordMatch = await bcryptjs.compare(password, user.password);
      if (!passwordMatch) {
        return Response.json(
          { error: 'Invalid email or password' },
          { status: 401 }
        );
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id.toString(), email: user.email },
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
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          },
          token,
        },
        { status: 200 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Login error:', error);
    return Response.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
