# User Flow & Architecture Diagram

## 🔄 Complete User Journey

```
START
  ↓
[Landing Page - /]
  ├─ Not Authenticated
  │  ├─ View Hero Section
  │  ├─ See Features
  │  ├─ CTA Button
  │  │  ├─ "Sign Up" → /signup
  │  │  └─ "Login" → /login
  │  └─ Not Logged In
  │
  └─ Authenticated
     ├─ View Learning Modules
     ├─ See Progress Overview
     └─ CTA Button → /courses

[Authentication Pages]
  
  /signup - Create Account
  ├─ Enter Name
  ├─ Enter Email
  ├─ Create Password
  ├─ Confirm Password
  └─ Submit
     ├─ ✗ Validation Error
     │  └─ Show Error Message
     └─ ✓ Success
        ├─ Hash Password
        ├─ Create User in DB
        ├─ Update AuthStore
        └─ Redirect to Home

  /login - Sign In
  ├─ Enter Email
  ├─ Enter Password
  └─ Submit
     ├─ ✗ Invalid Credentials
     │  └─ Show Error Message
     └─ ✓ Success
        ├─ Verify Password
        ├─ Generate JWT Token
        ├─ Set HTTP-only Cookie
        ├─ Update AuthStore
        └─ Redirect to Home

[Main Learning Flow]

  /courses - Browse Lessons
  ├─ Check Authentication (AuthProvider)
  ├─ Redirect if not authenticated → /login
  ├─ Load lessons from DB
  ├─ Show Progress Overview
  │  └─ X/15 Lessons Complete (Y%)
  ├─ Display Module List
  │  ├─ React Fundamentals
  │  ├─ Component Mastery
  │  ├─ State & Props
  │  ├─ Advanced Hooks
  │  └─ Polish & Performance
  ├─ Filter by Selected Module
  ├─ List Lessons
  │  ├─ Lesson Title
  │  ├─ Description
  │  ├─ Duration
  │  ├─ Resources Count
  │  └─ Key Points Count
  └─ Click "Start Learning" → /lesson/[id]

  /lesson/[id] - Learn & Quiz
  ├─ Load Lesson Content
  │  ├─ Title & Description
  │  ├─ Duration & Meta Info
  │  ├─ Key Points List
  │  ├─ Lesson Content
  │  ├─ Resources
  │  │  ├─ YouTube Videos
  │  │  └─ Documentation Links
  │  └─ Tabs: Content | Resources | Quiz
  │
  ├─ Take Quiz
  │  ├─ Display Questions (3-5)
  │  ├─ For Each Question:
  │  │  ├─ Show Question
  │  │  ├─ Show 4 Options
  │  │  └─ Select Answer
  │  │
  │  ├─ Submit Quiz
  │  │  ├─ Calculate Score
  │  │  ├─ Check if Passed (70%+)
  │  │  └─ Show Results
  │  │     ├─ Score: X/Y
  │  │     ├─ Result: Pass/Fail
  │  │     ├─ Explanation
  │  │     └─ Update Progress Store
  │  │
  │  └─ Update Database
  │     ├─ Record Quiz Attempt
  │     ├─ Update User Progress
  │     └─ Mark Lesson Complete (if passed)
  │
  └─ Back to Courses
     ├─ Progress Updated
     └─ See Completion Badge

[Navigation]

Navbar - Available on All Pages
├─ Logo/Brand
├─ Navigation Links
│  ├─ Home
│  └─ Courses (if authenticated)
├─ User Info (if authenticated)
│  ├─ Welcome Message with Name
│  └─ Logout Button
└─ Mobile Menu (hamburger)
   ├─ Home
   ├─ Courses
   └─ Logout

[Logout Flow]

Click Logout
  ├─ Clear HTTP-only Cookie
  ├─ Update AuthStore
  ├─ Clear Progress Store
  └─ Redirect to Login

[Protected Routes]

Every page checks:
  ├─ AuthProvider initializes
  │  └─ Calls checkAuth()
  │     └─ Fetches /api/user
  ├─ If authenticated
  │  └─ Show page content
  └─ If not authenticated
     └─ Redirect to /login
```

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────┐
│          NEXT.JS 16 APPLICATION                 │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │  Root Layout (app/layout.tsx)             │  │
│  │  └─ AuthProvider                          │  │
│  │     └─ Checks Auth on App Load            │  │
│  └───────────────────────────────────────────┘  │
│                     ↓                           │
│  ┌───────────────────────────────────────────┐  │
│  │  Page Routes                              │  │
│  │  ├─ / (Home)                              │  │
│  │  ├─ /login (Protected)                    │  │
│  │  ├─ /signup (Protected)                   │  │
│  │  ├─ /courses (Protected)                  │  │
│  │  └─ /lesson/[id] (Protected)              │  │
│  └───────────────────────────────────────────┘  │
│           ↓              ↓                      │
│  ┌─────────────────────────────────────────┐    │
│  │  Navbar Component (All Pages)           │    │
│  │  └─ Uses useAuthStore() for state       │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
│  ┌─────────────────────────────────────────┐    │
│  │  API Routes (/api)                      │    │
│  │  ├─ /auth/register                      │    │
│  │  ├─ /auth/login                         │    │
│  │  ├─ /auth/logout                        │    │
│  │  ├─ /lessons (Auto-init on first call)  │    │
│  │  ├─ /quizzes (Submit & fetch)           │    │
│  │  ├─ /progress (Fetch & update)          │    │
│  │  └─ /user (Auth verification)           │    │
│  └─────────────────────────────────────────┘    │
│           ↓                                     │
│  ┌─────────────────────────────────────────┐    │
│  │  State Management (Zustand)             │    │
│  │  ├─ authStore                           │    │
│  │  │  ├─ user state                       │    │
│  │  │  ├─ isAuthenticated                  │    │
│  │  │  ├─ isLoading                        │    │
│  │  │  └─ actions (setUser, logout, etc)   │    │
│  │  └─ progressStore                       │    │
│  │     ├─ lessons progress map             │    │
│  │     ├─ quizzes attempts map             │    │
│  │     └─ actions (setProgress, etc)       │    │
│  └─────────────────────────────────────────┘    │
│           ↓                                     │
│  ┌─────────────────────────────────────────┐    │
│  │  Database (MongoDB)                     │    │
│  │  ├─ users collection                    │    │
│  │  ├─ lessons collection (15 lessons)     │    │
│  │  ├─ quizzes collection                  │    │
│  │  ├─ user_progress collection            │    │
│  │  └─ quiz_attempts collection            │    │
│  └─────────────────────────────────────────┘    │
│                                                 │
└─────────────────────────────────────────────────┘
```

## 📊 Data Flow

```
User Action (Sign In)
  ↓
UI Component (login/page.tsx)
  ↓
API Request (/api/auth/login)
  ↓
Backend Processing
  ├─ Hash password comparison
  ├─ JWT token generation
  ├─ Set HTTP-only cookie
  └─ Return user data
  ↓
Update AuthStore (Zustand)
  ├─ Set user
  ├─ Set isAuthenticated = true
  ├─ Persist to localStorage
  └─ Trigger re-render
  ↓
Navbar Updates (auto-re-render)
  ├─ Show user name
  ├─ Show logout button
  └─ Show "Courses" link
  ↓
Redirect to Home (/page.tsx)
  ├─ Navbar updates
  ├─ Show learning modules
  └─ Ready for user input
```

## 🔐 Authentication Flow

```
1. Registration
   ├─ User enters: name, email, password
   ├─ Validation checks
   ├─ Hash password with bcryptjs
   ├─ Create user in MongoDB
   ├─ Generate JWT token
   ├─ Set secure HTTP-only cookie
   └─ Redirect to home

2. Login
   ├─ User enters: email, password
   ├─ Fetch user from MongoDB
   ├─ Verify password with bcryptjs
   ├─ Generate JWT token
   ├─ Set secure HTTP-only cookie
   └─ Redirect to home

3. Auth Check (on app load)
   ├─ AuthProvider calls checkAuth()
   ├─ Fetch /api/user
   ├─ Verify JWT token
   ├─ Get user data
   ├─ Update AuthStore
   └─ Show page content

4. Protected Routes
   ├─ Each page checks isAuthenticated
   ├─ If false → Redirect to /login
   └─ If true → Show page

5. Logout
   ├─ Clear HTTP-only cookie
   ├─ Update AuthStore
   ├─ Clear localStorage
   └─ Redirect to /login
```

## 📚 Learning Progress Flow

```
User Opens Lesson (/lesson/[id])
  ↓
1. Load Lesson
   ├─ Fetch from /api/lessons
   ├─ Get lesson content
   ├─ Display resources
   └─ Load quiz questions

2. Read Content
   ├─ View lesson title & description
   ├─ Read key points
   ├─ Click resource links
   └─ Time spent tracked

3. Take Quiz
   ├─ Display questions
   ├─ User selects answers
   ├─ Submit answers
   │
   ├─ POST /api/quizzes
   │  ├─ Validate answers
   │  ├─ Calculate score
   │  ├─ Check if passed (70%+)
   │  └─ Return results

4. Update Progress
   ├─ Record quiz attempt
   ├─ Update lesson progress
   ├─ Update progressStore (Zustand)
   │  ├─ Set lesson as completed
   │  ├─ Save quiz score
   │  └─ Recalculate overall progress
   └─ Show completion badge

5. Return to Courses
   ├─ Lesson shows "Completed" badge
   ├─ Progress bar updated
   ├─ Overall progress increased
   └─ Ready for next lesson
```

## 🎯 Component Hierarchy

```
RootLayout
├─ AuthProvider
│  ├─ Home Page (/)
│  │  └─ Navbar
│  │
│  ├─ Login Page (/login)
│  │  └─ Navbar (hidden)
│  │
│  ├─ Signup Page (/signup)
│  │  └─ Navbar (hidden)
│  │
│  ├─ Courses Page (/courses)
│  │  ├─ Navbar
│  │  └─ CoursesContent
│  │     ├─ ProgressOverview
│  │     ├─ ModuleFilter
│  │     └─ LessonsList
│  │        └─ LessonCard (x15)
│  │
│  └─ Lesson Page (/lesson/[id])
│     ├─ Navbar
│     └─ LessonContent
│        ├─ LessonHeader
│        ├─ TabsContainer
│        │  ├─ ContentTab
│        │  ├─ ResourcesTab
│        │  └─ QuizTab
│        │     ├─ QuestionCard (x3-5)
│        │     └─ SubmitButton
│        └─ QuizResults (after submit)

Global State:
├─ AuthStore (Zustand)
│  └─ Accessible from any component
│
└─ ProgressStore (Zustand)
   └─ Accessible from any component
```

## 🔄 State Updates Timeline

```
T0: App Loads
    └─ AuthProvider checks auth
       └─ isLoading = true

T1: Auth Check Complete
    ├─ AuthProvider calls checkAuth()
    ├─ /api/user returns user data
    └─ AuthStore updated
       ├─ user = { id, name, email }
       ├─ isAuthenticated = true
       ├─ isLoading = false
       └─ Navbar re-renders

T2: User Navigates to /courses
    ├─ Load lessons from /api/lessons
    └─ Load progress from /api/progress
       └─ ProgressStore updated

T3: User Opens Lesson
    ├─ Fetch lesson details
    ├─ Load quiz questions
    └─ Ready for interaction

T4: User Submits Quiz
    ├─ POST /api/quizzes
    ├─ GET results
    └─ ProgressStore updated
       ├─ setLessonProgress
       ├─ setQuizAttempt
       └─ Progress bar re-renders

T5: User Logs Out
    ├─ Clear cookie
    ├─ AuthStore cleared
    ├─ ProgressStore cleared
    └─ Redirect to /login
```

## 📱 Responsive Behavior

```
Mobile (<768px)
├─ Navbar
│  ├─ Logo only (small)
│  ├─ Hamburger menu
│  └─ Dropdown on click
├─ Single column layout
├─ Large touch targets
└─ Vertical tabs

Tablet (768px-1024px)
├─ Navbar
│  ├─ Logo + text
│  ├─ Navigation visible
│  └─ Hamburger for mobile
├─ Single or 2-column layout
├─ Optimized spacing
└─ Adjusted font sizes

Desktop (>1024px)
├─ Navbar
│  ├─ Full logo + title
│  ├─ All navigation links
│  └─ No hamburger
├─ 2-3 column layouts
├─ Module sidebar
└─ Full feature display
```

---

This visual guide shows:
- **User Journey**: Complete flow from signup to learning
- **System Architecture**: How components connect
- **Data Flow**: How data moves through the app
- **Auth Flow**: Security implementation
- **Progress Flow**: Learning experience
- **Component Hierarchy**: UI structure
- **State Updates**: Timeline of changes
- **Responsive Design**: Layout changes by device

All working together to create a seamless learning experience!
