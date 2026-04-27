# Quick Start Guide

## Prerequisites

- Node.js 18+ 
- MongoDB connection (Atlas or local)
- pnpm package manager

## Installation

```bash
# Clone/open the project
cd /vercel/share/v0-project

# Install dependencies
pnpm install

# Set environment variables
# Create a .env.local file in the root with:
MONGODB_URI=your_mongodb_connection_string
```

## MongoDB Setup

### Option 1: MongoDB Atlas (Recommended)

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free account
3. Create a cluster
4. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/reactlearning`
5. Update `.env.local` with your URI

### Option 2: Local MongoDB

```bash
# Install MongoDB locally
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Connection string
MONGODB_URI=mongodb://localhost:27017/reactlearning
```

## Running the App

```bash
# Start development server
pnpm dev

# Visit http://localhost:3000
```

## First Steps

1. **Create Account**
   - Go to `/signup`
   - Fill in name, email, password
   - Click "Sign Up"

2. **Login**
   - Go to `/login`
   - Enter credentials
   - Click "Login"

3. **Browse Courses**
   - You'll be redirected to home
   - Click "Continue Learning"
   - View all lessons organized by module

4. **Start Learning**
   - Click on any lesson
   - Read content and resources
   - Take the quiz
   - Track your progress

## Project Structure

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx              # Home page
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup page
│   ├── courses/page.tsx      # All lessons
│   ├── lesson/[id]/page.tsx  # Lesson detail
│   ├── layout.tsx            # Root layout
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication
│   │   ├── lessons/          # Lessons endpoint
│   │   ├── quizzes/          # Quizzes endpoint
│   │   ├── progress/         # Progress tracking
│   │   └── user/             # User profile
│   └── globals.css           # Global styles
├── store/
│   ├── authStore.ts          # Auth state (Zustand)
│   └── progressStore.ts      # Progress state (Zustand)
├── components/
│   ├── providers/
│   │   └── AuthProvider.tsx  # Auth initialization
│   ├── Navbar.tsx            # Shared navigation
│   ├── ui/                   # shadcn/ui components
├── lib/
│   ├── mongodb.ts            # MongoDB connection
│   ├── authUtils.ts          # Auth utilities
│   ├── lessonsData.ts        # Lesson curriculum
│   └── models.ts             # Data models
└── package.json
```

## Key Features

✅ **Authentication**
- Secure registration and login
- JWT token-based sessions
- Password hashing with bcryptjs
- HTTP-only cookies

✅ **Learning Management**
- 15 comprehensive React lessons
- 5 organized modules
- 3-5 practice questions per lesson
- YouTube videos + documentation links

✅ **Progress Tracking**
- Real-time lesson completion tracking
- Quiz scoring and results
- Overall progress percentage
- Attempt history

✅ **State Management**
- Zustand for global auth state
- Progress tracking across pages
- Persistent state with localStorage
- No Redux boilerplate

✅ **User Interface**
- Dark theme design
- Responsive mobile-first layout
- Smooth animations
- shadcn/ui components

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB service or check your URI in `.env.local`

### Port Already in Use
```
Error: EADDRINUSE: address already in use :::3000
```
**Solution:** Run on different port:
```bash
pnpm dev -- -p 3001
```

### Module Not Found Error
```
Error: Cannot find module '@/store/authStore'
```
**Solution:** 
1. Check file paths are correct
2. Ensure all files are in the right directories
3. Restart dev server

### Auth Token Expired
- Log out and log back in
- Tokens expire after 7 days
- Check browser DevTools > Cookies for `auth-token`

## Environment Variables

```env
# MongoDB connection string (required)
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/reactlearning

# Next.js automatically handles NODE_ENV
# No other env vars needed for local development
```

## API Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Lessons
```bash
curl http://localhost:3000/api/lessons
```

### Submit Quiz
```bash
curl -X POST http://localhost:3000/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "quizId": "quiz123",
    "answers": [
      {"questionId": "q1", "selectedAnswer": 0}
    ]
  }'
```

## Learning Path

**Week 1-2: Fundamentals**
- React basics
- JSX and components
- Props and data flow

**Week 2-3: State & Effects**
- useState hook
- useEffect for side effects
- Event handling

**Week 3-4: Advanced Patterns**
- useContext for state sharing
- useReducer for complex state
- Custom hooks
- Performance optimization

## Support

For issues or questions:
1. Check the ARCHITECTURE.md for detailed docs
2. Review error messages in browser DevTools
3. Check MongoDB Atlas dashboard for connection issues
4. See troubleshooting section above

## Next Steps

- ✅ Complete the curriculum
- 🎯 Build your own projects
- 📚 Explore React documentation
- 🚀 Deploy to Vercel
- 💼 Share your learning

Happy learning!
