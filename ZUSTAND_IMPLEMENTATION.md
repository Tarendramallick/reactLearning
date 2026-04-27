# Zustand State Management Implementation

## Why Zustand Over Redux?

We chose **Zustand** for this project because:

1. **Lightweight** - ~2KB minified, no Redux boilerplate
2. **Simple API** - Minimal setup, no actions/reducers/dispatch
3. **Perfect for Auth** - Ideal for global state like authentication
4. **Built-in Persistence** - Easy localStorage integration
5. **Typescript Friendly** - Full type safety without extra config
6. **Less Opinionated** - Freedom in how you structure state

## Zustand Store Structure

### AuthStore

```typescript
// store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      
      setUser: (user) => {
        set({
          user,
          isAuthenticated: user !== null,
          isLoading: false,
        });
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      checkAuth: async () => {
        const response = await fetch('/api/user');
        if (response.ok) {
          const data = await response.json();
          set({
            user: data.user,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### Usage in Components

```typescript
// Simple usage - just import and call the hook
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  // Access state and methods
  const { user, isAuthenticated, logout } = useAuthStore();
  
  return (
    <>
      {isAuthenticated && <p>Hello, {user?.name}</p>}
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

## ProgressStore

Tracks learning progress globally without prop drilling:

```typescript
interface ProgressStore {
  lessons: Record<string, LessonProgress>;
  quizzes: Record<string, QuizAttempt>;
  setLessonProgress: (lessonId: string, progress: LessonProgress) => void;
  setQuizAttempt: (quizId: string, attempt: QuizAttempt) => void;
  loadProgress: (lessons: LessonProgress[], quizzes: QuizAttempt[]) => void;
  getCompletedLessonCount: () => number;
  getTotalLessonCount: () => number;
  getProgressPercentage: () => number;
}
```

### Usage Pattern

```typescript
// In lesson page after quiz submission
const { setLessonProgress, setQuizAttempt } = useProgressStore();

const handleQuizSubmit = async () => {
  const result = await submitQuiz();
  
  // Update stores immediately
  setQuizAttempt(quizId, {
    quizId,
    score: result.percentage,
    totalQuestions: result.total,
    passed: result.passed,
    attemptedAt: new Date(),
  });
  
  setLessonProgress(lessonId, {
    lessonId,
    completed: result.passed,
    completedAt: new Date(),
    attempts: 1,
    timeSpent: 10,
  });
};

// In courses page to show progress
const { lessons: progressLessons } = useProgressStore();

const completedCount = Object.values(progressLessons)
  .filter(p => p.completed).length;
```

## Middleware

### Persist Middleware

Automatically saves state to localStorage:

```typescript
persist(
  (set) => ({ /* store logic */ }),
  {
    name: 'storage-key', // localStorage key name
    // Optional: only persist certain fields
    partialize: (state) => ({
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    }),
  }
)
```

## Comparison: Zustand vs Redux

### Zustand Example
```typescript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  return <button onClick={increment}>{count}</button>;
}
```

### Redux Example (for comparison)
```typescript
// Actions
const INCREMENT = 'INCREMENT';
const increment = () => ({ type: INCREMENT });

// Reducer
const countReducer = (state = 0, action) => {
  if (action.type === INCREMENT) return state + 1;
  return state;
};

// Store setup
const store = createStore(countReducer);

// Component
function Counter() {
  const count = useSelector(state => state);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(increment())}>{count}</button>;
}
```

**Zustand wins on simplicity and bundle size!**

## Integration with AuthProvider

The `AuthProvider` wraps the entire app and initializes auth on load:

```typescript
// components/providers/AuthProvider.tsx
'use client';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoading = useAuthStore((state) => state.isLoading);

  useEffect(() => {
    checkAuth(); // Verify auth on app load
  }, [checkAuth]);

  if (isLoading) return <LoadingScreen />;
  
  return <>{children}</>;
}

// app/layout.tsx
import { AuthProvider } from '@/components/providers/AuthProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

## Common Patterns

### Conditional Rendering Based on Auth
```typescript
const { isAuthenticated, user } = useAuthStore();

{isAuthenticated && user && (
  <div>Welcome, {user.name}!</div>
)}
```

### Redirect Unauthenticated Users
```typescript
const router = useRouter();
const { isAuthenticated } = useAuthStore();

useEffect(() => {
  if (!isAuthenticated) {
    router.push('/login');
  }
}, [isAuthenticated]);
```

### Update Store After API Call
```typescript
const setUser = useAuthStore((state) => state.setUser);

const handleLogin = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  setUser(data.user); // Update global state
  router.push('/');
};
```

### Selector Optimization
```typescript
// ❌ Inefficient - re-renders on ANY state change
const { user, count, posts } = useAuthStore();

// ✅ Better - only re-renders if user changes
const user = useAuthStore((state) => state.user);
const count = useStore((state) => state.count);
```

## Devtools Integration

Install Zustand DevTools browser extension for debugging:

```typescript
// Optional: add devtools middleware (not in this project)
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useStore = create(
  devtools((set) => ({
    // store logic
  }))
);
```

## Performance Considerations

1. **Selector Functions**: Use specific selectors to avoid unnecessary re-renders
```typescript
// Instead of this
const { user } = useAuthStore();

// Prefer this
const user = useAuthStore((state) => state.user);
```

2. **Memoization**: Wrap components with memo if needed
```typescript
const UserProfile = memo(function UserProfile() {
  const user = useAuthStore((state) => state.user);
  return <div>{user?.name}</div>;
});
```

## Scaling Beyond Auth

If you need more global state later, just create new stores:

```typescript
// store/notificationStore.ts
export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (message) => set(state => ({
    notifications: [...state.notifications, message]
  })),
  removeNotification: (id) => set(state => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
}));

// store/filterStore.ts
export const useFilterStore = create((set) => ({
  filters: { difficulty: 'all', module: 'all' },
  setFilter: (key, value) => set(state => ({
    filters: { ...state.filters, [key]: value }
  })),
}));
```

## Best Practices

1. ✅ Keep stores focused on a single domain (auth, progress, filters)
2. ✅ Use TypeScript interfaces for type safety
3. ✅ Memoize derived state with helper functions
4. ✅ Use persist middleware for important state
5. ✅ Keep API calls separate from stores
6. ❌ Don't call stores in effects without dependencies
7. ❌ Don't create new objects in selectors (causes re-renders)
8. ❌ Don't overuse Zustand for local component state

## Resources

- [Zustand Docs](https://github.com/pmndrs/zustand)
- [Zustand Examples](https://github.com/pmndrs/zustand/tree/main/examples)
- [State Management Guide](https://github.com/pmndrs/zustand/discussions)

## Summary

Zustand provides a lightweight, approachable way to manage global state without Redux complexity. This project uses it for:

- **Auth Management**: User login/logout, persistence
- **Progress Tracking**: Lesson completion, quiz scores
- **Navbar Integration**: Show user info across all pages
- **Protected Routes**: Check authentication before rendering

The result is a clean, maintainable architecture with minimal boilerplate!
