import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-in-production';

// In-memory user database (replace with real DB)
let users: { id: string; email: string; name: string; password: string; createdAt: Date }[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: bcryptjs.hashSync('password123', 10),
    createdAt: new Date(),
  },
];

let userProgress: {
  userId: string;
  lessonsCompleted: number[];
  projectsCompleted: number[];
  quizzesCompleted: number[];
  totalMinutes: number;
  streak: number;
  activityLog: { date: string; minutes: number }[];
}[] = [
  {
    userId: '1',
    lessonsCompleted: [1, 2, 3, 4, 5],
    projectsCompleted: [1, 2],
    quizzesCompleted: [1, 2, 3, 4, 5],
    totalMinutes: 450,
    streak: 7,
    activityLog: Array.from({ length: 20 }, (_, i) => ({
      date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      minutes: Math.floor(Math.random() * 120) + 20,
    })),
  },
];

export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return bcryptjs.compare(password, hash);
}

export function signToken(data: any) {
  return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function register(email: string, name: string, password: string) {
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await hashPassword(password);
  const newUser = {
    id: String(users.length + 1),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date(),
  };

  users.push(newUser);

  userProgress.push({
    userId: newUser.id,
    lessonsCompleted: [],
    projectsCompleted: [],
    quizzesCompleted: [],
    totalMinutes: 0,
    streak: 0,
    activityLog: [],
  });

  const token = signToken({ userId: newUser.id, email: newUser.email, name: newUser.name });
  return { user: { id: newUser.id, email, name }, token };
}

export async function login(email: string, password: string) {
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await verifyPassword(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  const token = signToken({ userId: user.id, email: user.email, name: user.name });
  return { user: { id: user.id, email: user.email, name: user.name }, token };
}

export function getUserProgress(userId: string) {
  return userProgress.find((p) => p.userId === userId);
}

export function updateUserProgress(userId: string, updates: any) {
  const progress = userProgress.find((p) => p.userId === userId);
  if (progress) {
    Object.assign(progress, updates);
  }
  return progress;
}

export function getUser(userId: string) {
  return users.find((u) => u.id === userId);
}
