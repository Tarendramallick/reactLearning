## Complete Testing Guide for React Learning Platform

This guide covers 100% testing of all features.

### Prerequisites
- MongoDB URI configured in environment variables
- Node.js and pnpm installed
- Development server running: `pnpm dev`

---

## 1. Authentication Tests

### Test 1.1: Sign Up
**Steps:**
1. Go to `http://localhost:3000/signup`
2. Fill in:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
   - Confirm Password: "password123"
3. Click "Sign Up"

**Expected:**
- User created in MongoDB
- Redirected to home page
- User name visible in navbar

**Verification:**
- Check MongoDB `users` collection contains new user
- Auth token set in cookies
- User state in Zustand store

---

### Test 1.2: Login
**Steps:**
1. Go to `http://localhost:3000/login`
2. Enter email: "test@example.com"
3. Enter password: "password123"
4. Click "Login"

**Expected:**
- Redirected to home page
- User name in navbar
- Can access protected routes

**Verification:**
- Auth token in cookies
- User object in Zustand store

---

### Test 1.3: Invalid Credentials
**Steps:**
1. Go to `http://localhost:3000/login`
2. Enter email: "wrong@email.com"
3. Enter password: "wrongpass"
4. Click "Login"

**Expected:**
- Error message: "Invalid email or password"
- Stay on login page
- No token created

---

### Test 1.4: Logout
**Steps:**
1. Login first
2. Click "Logout" in navbar
3. Confirm redirected to login page

**Expected:**
- Token cleared from cookies
- User state cleared in Zustand
- Cannot access /courses without logging back in

---

## 2. Lesson Content Tests

### Test 2.1: Load Lessons
**Steps:**
1. Login
2. Go to `/courses`

**Expected:**
- All 15 lessons loaded and displayed
- Organized by 5 modules
- Progress bar shows 0% for new user
- Each lesson shows: title, description, duration, key points

**Verification:**
- Check MongoDB `lessons` collection populated (auto-seeds on first request)
- 15 lessons visible with correct data
- Estimated time shown for each lesson

---

### Test 2.2: Filter by Module
**Steps:**
1. On `/courses`, click on "React Fundamentals" module
2. Then click "State Management"
3. Then click "Advanced Hooks"

**Expected:**
- Lessons filter by selected module
- Only lessons from that module displayed
- Module button highlighted

**Verification:**
- Correct number of lessons per module
- No lessons from other modules shown

---

### Test 2.3: View Lesson Details
**Steps:**
1. On `/courses`, click "Start Learning" on first lesson
2. Go to `/lesson/[id]`

**Expected:**
- Lesson content displayed with:
  - Title and description
  - Full lesson content text
  - Key points list
  - Important terms (definitions)
  - Resource links (YouTube + Documentation)
- Quiz section below content

---

### Test 2.4: View Resources
**Steps:**
1. On lesson page, scroll to "Learning Resources"
2. Click on a YouTube link

**Expected:**
- New tab opens to correct URL
- YouTube icon displayed for video resources
- External link icon displayed

---

## 3. Quiz Tests

### Test 3.1: Complete Quiz
**Steps:**
1. On lesson page, scroll to quiz
2. Select answer for each of 5 questions
3. Click "Submit Quiz"

**Expected:**
- Quiz submitted successfully
- Results page shows:
  - Percentage score
  - Pass/Fail message
  - Detailed results for each question
  - Correct answer highlighted in green
  - User answer highlighted appropriately
  - Explanation for each question

**Verification:**
- Check MongoDB `quiz_attempts` collection for new record
- Score calculated correctly
- Results match question data

---

### Test 3.2: Quiz Passing Score
**Steps:**
1. Answer at least 70% of questions correctly (4/5)
2. Submit quiz

**Expected:**
- "Congratulations! You passed!" message
- Percentage >= 70%

---

### Test 3.3: Quiz Failing Score
**Steps:**
1. Answer only 1-2 questions correctly out of 5
2. Submit quiz

**Expected:**
- "Keep practicing!" message
- Percentage < 70%
- Can retake quiz

---

### Test 3.4: View Detailed Results
**Steps:**
1. After submitting quiz, review detailed results

**Expected:**
- Each question shows:
  - Question text
  - All 4 options (A, B, C, D)
  - Correct answer (green)
  - User's answer (red if wrong)
  - Explanation text
- Question numbers displayed (1, 2, 3, 4, 5)

---

### Test 3.5: Retake Quiz
**Steps:**
1. After submitting quiz, reload page or navigate away and back
2. Go to lesson again
3. Attempt quiz again with different answers

**Expected:**
- Can retake quiz
- New attempt recorded in MongoDB
- Previous attempt still visible in history

---

## 4. Progress Tracking Tests

### Test 4.1: Progress Bar Updates
**Steps:**
1. Start on home page, progress shows 0%
2. Go to `/courses`
3. Complete first lesson and pass quiz
4. Check progress bar

**Expected:**
- Progress bar updates (1/15 = 7%)
- Lesson marked as "Completed"
- Green badge shown

---

### Test 4.2: Lesson Completion Tracking
**Steps:**
1. Go to `/lesson/[id]` for first lesson
2. Pass the quiz (70%+)
3. Return to `/courses`

**Expected:**
- Lesson shows "Completed" badge
- Progress bar updated
- Zustand store updated with lesson progress

**Verification:**
- Check MongoDB `user_progress` collection
- New entry with lessonId and userId
- completed: true

---

### Test 4.3: Multiple Lessons Progress
**Steps:**
1. Complete quizzes for 3 different lessons
2. Check overall progress

**Expected:**
- Progress bar shows 3/15 = 20%
- All completed lessons marked

---

## 5. State Management Tests

### Test 5.1: Auth State Persistence
**Steps:**
1. Login
2. Hard refresh page (Ctrl+Shift+R)
3. Check if still logged in

**Expected:**
- User still logged in (auth state persisted)
- User name visible in navbar

---

### Test 5.2: Progress State Sync
**Steps:**
1. Complete a lesson quiz
2. Navigate to different pages
3. Go back to courses

**Expected:**
- Progress data syncs across pages
- Zustand store reflects same data

---

### Test 5.3: Logout State Clear
**Steps:**
1. Login
2. Logout
3. Check localStorage/cookies

**Expected:**
- All auth tokens cleared
- User state cleared
- Cannot access /courses

---

## 6. UI/UX Tests

### Test 6.1: Responsive Design
**Steps:**
1. Open app on desktop (1920px+)
2. Resize browser to tablet (768px)
3. Resize to mobile (375px)

**Expected:**
- Layout adapts properly on all sizes
- Navigation menu works on mobile
- All content readable
- No horizontal scroll

---

### Test 6.2: Dark Theme
**Steps:**
1. Open any page
2. Check colors match design

**Expected:**
- Dark background (slate-900)
- Good contrast on text
- Purple accents visible
- All text readable

---

### Test 6.3: Navigation
**Steps:**
1. Test all navigation links:
   - Logo → Home
   - Home link in navbar → Home
   - Courses link in navbar → Courses
   - Course card → Lesson
   - Back button → Previous page

**Expected:**
- All links work correctly
- Proper redirects
- No broken navigation

---

## 7. Data Integrity Tests

### Test 7.1: Quiz Data Completeness
**Steps:**
1. Fetch quizzes via API: `GET /api/quizzes`
2. Verify all data fields

**Expected:**
```json
{
  "quizzes": [
    {
      "id": 1,
      "lessonTitle": "What is React?",
      "questions": [
        {
          "id": "q1",
          "question": "...",
          "options": ["...", "...", "...", "..."],
          "correctAnswer": 0,
          "explanation": "..."
        }
      ],
      "passingScore": 70
    }
  ],
  "definitions": { ... }
}
```

---

### Test 7.2: Lesson Data Completeness
**Steps:**
1. Fetch lessons via API: `GET /api/lessons`
2. Verify all fields present

**Expected:**
- All 15 lessons loaded
- Each lesson has:
  - _id, title, description
  - content (full text)
  - module, estimatedTime
  - keyPoints array (3-5 items)
  - resources array with YouTube and docs

---

### Test 7.3: Score Calculation
**Steps:**
1. Submit quiz with known answers
2. Verify score calculation

**Example:**
- 4 correct out of 5 = 80%
- 3 correct out of 5 = 60% (fails)
- 5 correct out of 5 = 100% (passes)

---

## 8. Error Handling Tests

### Test 8.1: Network Error
**Steps:**
1. In DevTools, disable internet
2. Try to login

**Expected:**
- Error message displayed
- Graceful fallback
- No white screen

---

### Test 8.2: Invalid Data
**Steps:**
1. Try signup with empty fields
2. Try signup with invalid email

**Expected:**
- Validation errors shown
- Form prevents submission

---

### Test 8.3: Not Authenticated
**Steps:**
1. Clear cookies/auth token
2. Try to access /courses directly

**Expected:**
- Redirected to /login
- Cannot access protected routes

---

## 9. Database Tests

### Test 9.1: Auto-Initialization
**Steps:**
1. Start app with empty MongoDB
2. Access `/api/lessons`

**Expected:**
- Lessons auto-created in MongoDB
- Check collections:
  - users (empty)
  - lessons (15 items)
  - modules (5 items)
  - quizzes (auto-created from code)

---

### Test 9.2: Data Persistence
**Steps:**
1. Create user account
2. Complete a lesson quiz
3. Restart server
4. Login again

**Expected:**
- User data still exists
- Progress still saved
- Quiz attempt still recorded

---

## 10. Complete User Journey Test

**Full Flow:**
1. ✅ Go to home page (/ )
2. ✅ Click "Get Started"
3. ✅ Sign up with new account
4. ✅ Redirected to home, see modules
5. ✅ Click "Continue Learning"
6. ✅ See all 15 lessons
7. ✅ Click on "What is React?" lesson
8. ✅ Read lesson content and definitions
9. ✅ Click "Start Quiz"
10. ✅ Answer all 5 questions
11. ✅ Submit quiz
12. ✅ See detailed results
13. ✅ Progress bar updated
14. ✅ Return to courses
15. ✅ Lesson marked as completed
16. ✅ Complete 3 more lessons
17. ✅ Progress shows 4/15 = 27%
18. ✅ Logout
19. ✅ Login again
20. ✅ Progress still shows 27%

**Expected:**
- All 20 steps complete without errors
- Data persists across sessions
- All features work correctly

---

## Checklist

- [ ] All 10 quiz questions have answers
- [ ] All 5 quiz questions have explanations  
- [ ] Definitions section has 15+ terms
- [ ] 15 lessons in database
- [ ] 5 modules properly organized
- [ ] All resources have valid URLs
- [ ] Auth tokens work correctly
- [ ] Progress tracking functional
- [ ] UI responsive on all devices
- [ ] Error handling graceful
- [ ] Data persists in MongoDB
- [ ] Zustand state management working
- [ ] All navigation links functional
- [ ] Quiz scoring correct
- [ ] Lessons auto-seed on first request

---

## Notes

- MongoDB must be connected for all tests
- Tests should be performed in order
- Clear browser cache between tests if needed
- Use real email format for signup
- Passwords must be 6+ characters
- Passing score for all quizzes is 70%
