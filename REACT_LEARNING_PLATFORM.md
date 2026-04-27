# React Learning Platform - Complete Guide

A fully functional, production-ready React learning platform with MongoDB integration, progress tracking, and comprehensive curriculum.

## Features

✅ **Complete React Curriculum**
- 15+ comprehensive lessons covering React fundamentals to advanced patterns
- 5 learning modules covering all essential topics
- 3-5 practice questions per lesson
- Mix of YouTube videos and written tutorials/documentation

✅ **User Authentication**
- Secure registration and login with bcryptjs password hashing
- JWT-based session management
- HTTP-only cookies for security
- MongoDB user storage

✅ **Progress Tracking**
- Real-time lesson completion tracking
- Quiz attempt history and scores
- Progress dashboard showing completion percentage
- Persistent storage in MongoDB

✅ **Learning Resources**
- YouTube video links integrated in lessons
- Documentation links to official resources
- 3-5 quality learning resources per lesson
- Mixed resource types (videos, docs, tutorials)

✅ **Practice Quizzes**
- 3-5 questions per lesson
- Multiple choice format
- Instant feedback with explanations
- Score tracking and history
- 70% passing threshold

✅ **Clean, Modern UI**
- Dark theme optimized for learning
- Responsive design (mobile, tablet, desktop)
- Intuitive navigation
- Progress visualizations

## Tech Stack

- **Frontend**: Next.js 15 with TypeScript, React 19
- **Backend**: Next.js API Routes
- **Database**: MongoDB (serverless ready)
- **Authentication**: JWT + bcryptjs
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites
- Node.js 18+ (pnpm preferred)
- MongoDB URI (local or cloud - MongoDB Atlas recommended)

### Installation

1. **Set up MongoDB URI**
   - Go to project settings → Vars
   - Add `MONGODB_URI` environment variable with your MongoDB connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/react-learning?retryWrites=true&w=majority`

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run development server**
   ```bash
   pnpm dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`

## Usage Guide

### Sign Up
1. Click "Sign Up" on the home page
2. Enter full name, email, and password (min 6 characters)
3. Account created automatically with MongoDB
4. Redirected to home page

### Login
1. Click "Login" on the home page
2. Enter email and password
3. Secure JWT token generated and stored in HTTP-only cookie

### Browse Lessons
1. Click "Continue Learning" or "Courses"
2. Select module from sidebar (React Fundamentals, etc.)
3. View lessons in the module
4. See progress indicators and completed badges

### Complete a Lesson
1. Click on any lesson card
2. Read lesson content and key points
3. Watch embedded YouTube video (if available)
4. Browse learning resources with external links
5. Complete quiz with 3-5 questions
6. View instant results and feedback
7. Lesson marked as completed in database

### Track Progress
1. Dashboard shows overall completion percentage
2. Progress bar updates in real-time
3. View completed lessons with green badges
4. Track quiz scores and attempts

## Curriculum Overview

### Module 1: React Fundamentals (3 lessons)
- What is React?
- JSX and Components
- Props: Passing Data to Components

### Module 2: Component Mastery (3 lessons)
- Functional Components & Hooks
- Conditional Rendering
- Lists and Keys

### Module 3: State & Props (3 lessons)
- Managing State with useState
- Handling Events
- Lifting State Up

### Module 4: Advanced Hooks (4 lessons)
- useEffect: Side Effects
- useContext: Global State
- useReducer: Complex State
- Custom Hooks

### Module 5: Styling & Performance (2 lessons)
- Styling in React
- Performance Optimization

## Database Schema

### Users Collection
```typescript
{
  _id: ObjectId,
  email: string,
  password: string (hashed),
  name: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Lessons Collection
```typescript
{
  _id: ObjectId,
  title: string,
  description: string,
  content: string,
  module: string,
  order: number,
  estimatedTime: number,
  videoUrl?: string,
  resources: [{
    title: string,
    url: string,
    type: 'youtube' | 'documentation' | 'article' | 'tutorial'
  }],
  keyPoints: string[],
  createdAt: Date,
  updatedAt: Date
}
```

### User Progress Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  lessonId: ObjectId,
  completed: boolean,
  completedAt?: Date,
  attempts: number,
  timeSpent: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Quizzes Collection
```typescript
{
  _id: ObjectId,
  lessonId: ObjectId,
  title: string,
  questions: [{
    _id: string,
    question: string,
    options: string[],
    correctAnswer: number,
    explanation: string
  }],
  passingScore: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Quiz Attempts Collection
```typescript
{
  _id: ObjectId,
  userId: ObjectId,
  quizId: ObjectId,
  lessonId: ObjectId,
  score: number,
  totalQuestions: number,
  answers: [{
    questionId: string,
    selectedAnswer: number,
    isCorrect: boolean
  }],
  passed: boolean,
  completedAt: Date,
  createdAt: Date
}
```

## API Routes

### Authentication
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Lessons
- `GET /api/lessons` - Fetch all lessons (auto-initializes on first request)
- `POST /api/lessons` - Create new lesson

### Quizzes
- `GET /api/quizzes?lessonTitle=...` - Get quizzes for lesson
- `POST /api/quizzes` - Submit quiz answers

### Progress
- `GET /api/progress` - Get user progress (requires auth)
- `POST /api/progress` - Update lesson progress (requires auth)

### User
- `GET /api/user` - Get user profile with stats (requires auth)

## Pages

- `/` - Home page with overview and modules
- `/login` - Login form
- `/signup` - Registration form
- `/courses` - All lessons with module filter
- `/lesson/[id]` - Individual lesson with content, resources, and quiz

## Key Features Explained

### No Video Lectures Stored
- All videos are embedded YouTube links
- External links to official documentation
- Reduces server storage requirements
- Supports open-source approach

### Progress Tracking
- Every lesson completion tracked in MongoDB
- Quiz scores stored with answers
- Real-time dashboard updates
- No localStorage (all server-side)

### Security
- Passwords hashed with bcryptjs
- JWT tokens expire after 7 days
- HTTP-only cookies prevent XSS attacks
- Server-side validation on all APIs
- User must authenticate for protected routes

### Scalability
- MongoDB supports unlimited users
- API routes scale horizontally
- No client-side state issues
- Clean separation of concerns

## Environment Variables

```bash
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/react-learning
JWT_SECRET=your-secret-key-here (optional, uses default in dev)
NODE_ENV=development|production
```

## Learning Path (1 Month)

**Week 1**: React Fundamentals & JSX
- Day 1-3: Learn React basics, JSX, components
- Day 4-5: Props and data flow
- Day 6-7: Review and practice quizzes

**Week 2**: Components & Conditional Rendering
- Day 1-3: Functional components and hooks
- Day 4-5: Conditional rendering and lists
- Day 6-7: Practice and quiz completion

**Week 3**: State Management
- Day 1-3: useState and event handling
- Day 4-5: Lifting state up
- Day 6-7: Practice quizzes and review

**Week 4**: Advanced Concepts
- Day 1-2: useEffect and side effects
- Day 3-4: useContext and useReducer
- Day 5-6: Custom hooks and optimization
- Day 7: Final review and certification quiz

## Troubleshooting

### MongoDB Connection Issues
- Verify `MONGODB_URI` is set in environment variables
- Check IP whitelist in MongoDB Atlas
- Ensure database name matches URI

### Authentication Problems
- Clear cookies and login again
- Check `auth-token` cookie in browser
- Verify user exists in MongoDB

### Lessons Not Loading
- Check browser console for API errors
- Ensure `/api/lessons` initializes data on first request
- Verify MongoDB connection

### Quiz Not Submitting
- Ensure all questions are answered
- Check network tab for API response
- Verify user is authenticated

## Future Enhancements

- [ ] Code sandbox for hands-on practice
- [ ] Peer-to-peer code review
- [ ] Community discussion forums
- [ ] Certificate of completion
- [ ] Streaks and gamification
- [ ] Difficulty levels (beginner/intermediate/advanced)
- [ ] Dark mode toggle
- [ ] Search functionality
- [ ] Mobile app
- [ ] Advanced analytics dashboard

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review MongoDB connection settings
3. Check browser console for errors
4. Verify all environment variables are set

## License

Open source and free for educational use.

---

**Happy Learning! Master React in 1 month with our comprehensive platform.** 🚀
