# React Learning Platform - Architecture Guide

## Overview

This React Learning Platform uses **Zustand** for state management, eliminating the need for sidebar navigation on every page. It features a clean, composable layout system with centralized state management.

## State Management (Zustand)

### AuthStore (`store/authStore.ts`)

Manages user authentication state globally.

**Features:**
- User login/logout
- Authentication persistence (localStorage)
- Automatic auth check on app initialization
- Loading states for UX

**Usage:**
```tsx
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuthStore();
  
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.name}!</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### ProgressStore (`store/progressStore.ts`)

Tracks user learning progress globally.

**Features:**
- Lesson completion tracking
- Quiz attempt recording
- Progress percentage calculation
- Real-time progress updates

**Usage:**
```tsx
import { useProgressStore } from '@/store/progressStore';

function LessonProgress() {
  const { 
    setLessonProgress, 
    getProgressPercentage,
    getCompletedLessonCount 
  } = useProgressStore();
  
  const percentage = getProgressPercentage();
  const completed = getCompletedLessonCount();
  
  return <ProgressBar value={percentage} />;
}
```

## Layout System

### AuthProvider Component

Wraps the entire app and handles initial authentication check.

**Location:** `components/providers/AuthProvider.tsx`

**Responsibilities:**
- Verifies user authentication on app load
- Shows loading state during auth check
- Initializes Zustand stores

### Navbar Component

Shared navigation used across all pages (no sidebar duplication).

**Location:** `components/Navbar.tsx`

**Features:**
- Responsive design (mobile menu + desktop nav)
- Auth status display
- Quick links to Home and Courses
- User logout functionality
- Dropdown menu for mobile

**Usage:**
```tsx
import { Navbar } from '@/components/Navbar';

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Page content */}
    </div>
  );
}
```

## Page Structure

All pages follow this pattern:

```tsx
'use client';

import { useAuthStore } from '@/store/authStore';
import { useProgressStore } from '@/store/progressStore';
import { Navbar } from '@/components/Navbar';

export default function Page() {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      {/* Page-specific content */}
    </div>
  );
}
```

## Pages

### Home (`app/page.tsx`)
- Landing page with course overview
- Hero section with CTA
- Feature highlights
- Learning modules preview (authenticated users only)

### Login (`app/login/page.tsx`)
- Email/password authentication
- Updates Zustand auth store on success
- Redirects to home on successful login

### Signup (`app/signup/page.tsx`)
- New user registration
- Password validation (min 6 chars)
- Stores auth state globally
- Redirects to home on success

### Courses (`app/courses/page.tsx`)
- Browse all lessons
- Filter by module
- View progress for each lesson
- Badge indicators for completion
- Module sidebar (no full-page sidebar)

### Lesson Detail (`app/lesson/[id]/page.tsx`)
- Lesson content display
- Learning resources (videos + docs)
- Key points overview
- Interactive quiz interface
- Real-time progress tracking

## API Routes

All routes are protected and require valid auth tokens in cookies.

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Clear auth state
- `GET /api/user` - Get authenticated user

### Learning Content
- `GET /api/lessons` - Fetch all lessons (auto-initializes on first request)
- `GET /api/quizzes` - Fetch quizzes
- `POST /api/quizzes` - Submit quiz answers

### Progress Tracking
- `GET /api/progress` - Fetch user progress
- `POST /api/progress` - Update lesson completion

## Database Models

### Users
```json
{
  "_id": ObjectId,
  "email": string,
  "password": string (hashed),
  "name": string,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Lessons
```json
{
  "_id": ObjectId,
  "title": string,
  "description": string,
  "module": string,
  "order": number,
  "content": string,
  "estimatedTime": number,
  "keyPoints": [string],
  "resources": [{
    "title": string,
    "url": string,
    "type": "video" | "documentation"
  }]
}
```

### User Progress
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "lessonId": ObjectId,
  "completed": boolean,
  "completedAt": Date,
  "attempts": number,
  "timeSpent": number,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Quiz Attempts
```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "quizId": ObjectId,
  "score": number,
  "totalQuestions": number,
  "passed": boolean,
  "attemptedAt": Date
}
```

## Benefits of This Architecture

1. **No Sidebar Duplication**: Navbar component used everywhere
2. **Global State**: Zustand provides easy access to auth/progress from any component
3. **Lightweight**: Zustand has minimal bundle size vs Redux
4. **Persistence**: Auth state persists across page reloads
5. **Clean Separation**: Business logic in stores, UI in components
6. **Easy to Extend**: Add new stores without modifying existing code

## Environment Setup

Required environment variable:
```
MONGODB_URI=your_mongodb_connection_string
```

The app auto-initializes the database with 15 lessons on first request.

## Running the App

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Visit http://localhost:3000
```

1. Create an account at `/signup`
2. Login at `/login`
3. Browse courses at `/courses`
4. Start learning with `/lesson/[id]`

## Development Tips

- **Auth debugging**: Check `AuthProvider` loading state
- **Progress issues**: Use `useProgressStore` hook directly in components
- **API errors**: Check browser Network tab in DevTools
- **State issues**: Use Zustand DevTools browser extension for debugging

## Future Enhancements

- Add certificates for course completion
- Implement community features (comments, discussions)
- Add code editor for interactive exercises
- Leaderboard for learning streaks
- Advanced quiz analytics
- Mobile app with React Native
