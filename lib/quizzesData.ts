// quizData.ts
// Full quiz bank — one quiz object per MODULE (18 total)
// Each quiz has 5 questions with 4 options, correctAnswer index, and explanation.
// Match moduleTitle to your lesson's `module` field from MongoDB.

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: number;
  moduleTitle: string;      // matches MongoDB lesson.module field exactly
  lessonTitle: string;      // keep for backward compat
  questions: QuizQuestion[];
  passingScore: number;
}

export const QUIZZES: Quiz[] = [
  // ══════════════════════════════════════════
  // MODULE 1 — JavaScript Fundamentals
  // ══════════════════════════════════════════
  {
    id: 1,
    moduleTitle: "JavaScript Fundamentals",
    lessonTitle: "Variables, Types & Operators",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Which keyword should you use by default when declaring a variable in modern JavaScript?",
        options: ["var", "let", "const", "def"],
        correctAnswer: 2,
        explanation: "`const` is the modern default — it prevents reassignment and makes intent clear. Use `let` only when you need to reassign.",
      },
      {
        id: "q2",
        question: "What does the nullish coalescing operator `??` do?",
        options: [
          "Returns the left side if it is falsy",
          "Returns the right side if the left is null or undefined",
          "Combines two booleans",
          "Checks strict equality",
        ],
        correctAnswer: 1,
        explanation: "`??` returns the right-hand value only when the left-hand value is `null` or `undefined`, unlike `||` which triggers on any falsy value (0, '', false).",
      },
      {
        id: "q3",
        question: "What is the result of `typeof null` in JavaScript?",
        options: ["'null'", "'undefined'", "'object'", "'boolean'"],
        correctAnswer: 2,
        explanation: "This is a long-standing JavaScript quirk. `typeof null` returns `'object'` even though null is a primitive — it was a bug in the original implementation that was never fixed.",
      },
      {
        id: "q4",
        question: "Which operator safely accesses a property that might not exist?",
        options: ["&&", "??", "?.", "||"],
        correctAnswer: 2,
        explanation: "Optional chaining `?.` short-circuits and returns `undefined` instead of throwing a TypeError when the object or property doesn't exist: `user?.address?.city`.",
      },
      {
        id: "q5",
        question: "What is `'5' === 5` in JavaScript?",
        options: ["true", "false", "TypeError", "NaN"],
        correctAnswer: 1,
        explanation: "Strict equality `===` checks both value AND type. `'5'` is a string and `5` is a number — different types, so the result is `false`.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 2 — React Fundamentals
  // ══════════════════════════════════════════
  {
    id: 2,
    moduleTitle: "React Fundamentals",
    lessonTitle: "What is React?",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is React?",
        options: [
          "A JavaScript library for building user interfaces",
          "A Python framework for web development",
          "A CSS framework",
          "A database management system",
        ],
        correctAnswer: 0,
        explanation: "React is a JavaScript library developed by Facebook (Meta) for building dynamic, interactive user interfaces using a component-based model and a virtual DOM.",
      },
      {
        id: "q2",
        question: "What does the Virtual DOM do in React?",
        options: [
          "Stores all data in memory",
          "Creates a virtual representation of the UI to optimize real DOM updates",
          "Manages CSS styling",
          "Handles HTTP requests",
        ],
        correctAnswer: 1,
        explanation: "The Virtual DOM is a lightweight in-memory copy of the real DOM. React diffs the virtual and real DOMs to calculate the minimal set of changes needed, improving performance.",
      },
      {
        id: "q3",
        question: "Which data-flow pattern does React use?",
        options: [
          "Bidirectional — child can push data to parent directly",
          "Unidirectional — data flows down via props, events flow up via callbacks",
          "Circular — components share a global ring buffer",
          "No pattern — components communicate freely",
        ],
        correctAnswer: 1,
        explanation: "React enforces unidirectional data flow. Data flows down through props; children communicate upward by calling callback functions passed as props.",
      },
      {
        id: "q4",
        question: "How do you embed a JavaScript expression in JSX?",
        options: ["{{ expression }}", "[ expression ]", "( expression )", "{ expression }"],
        correctAnswer: 3,
        explanation: "Single curly braces `{ }` embed any JavaScript expression inside JSX. Example: `<h1>{user.name}</h1>`. You cannot use statements (if, for) directly — only expressions.",
      },
      {
        id: "q5",
        question: "What attribute replaces `class` in JSX?",
        options: ["htmlClass", "styleClass", "className", "cssClass"],
        correctAnswer: 2,
        explanation: "`class` is a reserved keyword in JavaScript, so JSX uses `className` instead: `<div className='card'>`. The compiler converts it to the correct HTML attribute.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 3 — Component Mastery
  // ══════════════════════════════════════════
  {
    id: 3,
    moduleTitle: "Component Mastery",
    lessonTitle: "Functional Components & Hooks Intro",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is the rule about hooks and conditional statements?",
        options: [
          "You can call hooks inside if-statements",
          "Hooks must be called at the top level — never inside ifs, loops, or nested functions",
          "Hooks can only be called once per component",
          "Hooks must always return a value",
        ],
        correctAnswer: 1,
        explanation: "React depends on hook call order being stable between renders. Calling hooks inside conditionals or loops breaks that order, causing bugs. Always call at the top level.",
      },
      {
        id: "q2",
        question: "Which hook would you use to avoid passing props through many levels?",
        options: ["useState", "useRef", "useContext", "useReducer"],
        correctAnswer: 2,
        explanation: "`useContext` reads from a React context, letting you access shared data anywhere in the tree without threading props through every intermediate component.",
      },
      {
        id: "q3",
        question: "When does a functional component re-render?",
        options: [
          "Only when the page refreshes",
          "When its state or props change",
          "Every 100ms by default",
          "Only when the parent mounts",
        ],
        correctAnswer: 1,
        explanation: "React re-renders a component whenever its state changes (via a setter) or its props change. React 18 also batches multiple state updates for efficiency.",
      },
      {
        id: "q4",
        question: "What is conditional rendering in React?",
        options: [
          "Using CSS media queries to show/hide elements",
          "Displaying different JSX based on a condition using if/else, ternary, or &&",
          "Rendering components on a timer",
          "A special React API for A/B testing",
        ],
        correctAnswer: 1,
        explanation: "Conditional rendering means returning different JSX depending on state or props. Common patterns: ternary (`a ? <A/> : <B/>`), logical AND (`flag && <C/>`), or early return.",
      },
      {
        id: "q5",
        question: "Why must every item in a rendered list have a unique `key` prop?",
        options: [
          "It's a CSS selector hook",
          "Keys help React identify which items changed, were added, or removed during reconciliation",
          "Keys control rendering order alphabetically",
          "Keys are required by the browser DOM",
        ],
        correctAnswer: 1,
        explanation: "React uses keys to track list items across renders. Stable, unique keys (like database IDs) let React update only changed items rather than re-rendering the whole list.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 4 — State & Props
  // ══════════════════════════════════════════
  {
    id: 4,
    moduleTitle: "State & Props",
    lessonTitle: "Managing State with useState",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What does `useState` return?",
        options: [
          "Just the current state value",
          "An array: [currentValue, setterFunction]",
          "An object with get and set methods",
          "A Promise that resolves to the state",
        ],
        correctAnswer: 1,
        explanation: "`const [count, setCount] = useState(0)` — useState returns a two-element array. Destructuring gives you the current value and a setter that triggers a re-render.",
      },
      {
        id: "q2",
        question: "Which of these correctly updates an object stored in state?",
        options: [
          "state.name = 'Alice'",
          "setState({ name: 'Alice' })",
          "setState(prev => ({ ...prev, name: 'Alice' }))",
          "state = { ...state, name: 'Alice' }",
        ],
        correctAnswer: 2,
        explanation: "Always spread the previous state when updating objects: `setState(prev => ({ ...prev, name: 'Alice' }))`. Mutating state directly won't trigger a re-render.",
      },
      {
        id: "q3",
        question: "What is 'lifting state up'?",
        options: [
          "Moving state into a global Redux store",
          "Moving state to the nearest common parent so siblings can share it",
          "Converting class state to hooks",
          "Sending state to a server",
        ],
        correctAnswer: 1,
        explanation: "When two sibling components need the same data, move the state to their closest common ancestor and pass it down via props and callback props.",
      },
      {
        id: "q4",
        question: "What is the difference between props and state?",
        options: [
          "Props are mutable; state is read-only",
          "State is internal and mutable; props are external and immutable",
          "They are the same thing with different names",
          "Props exist only in class components",
        ],
        correctAnswer: 1,
        explanation: "State is data a component owns and can change. Props are data passed in from a parent — a child should never mutate them.",
      },
      {
        id: "q5",
        question: "Which syntax correctly handles a button click to update a counter?",
        options: [
          "onClick={setCount(count + 1)}",
          "onClick={setCount(count++)}",
          "onClick={() => setCount(count + 1)}",
          "onClick={count + 1}",
        ],
        correctAnswer: 2,
        explanation: "Pass a function reference, not a call. `onClick={setCount(count+1)}` runs immediately on render. `onClick={() => setCount(count+1)}` runs only on click.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 5 — Advanced Hooks
  // ══════════════════════════════════════════
  {
    id: 5,
    moduleTitle: "Advanced Hooks",
    lessonTitle: "useEffect: Side Effects",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What does an empty dependency array `[]` mean in useEffect?",
        options: [
          "The effect runs after every render",
          "The effect never runs",
          "The effect runs once after the initial render (mount)",
          "The effect runs only when the component unmounts",
        ],
        correctAnswer: 2,
        explanation: "An empty `[]` tells React there are no dependencies to watch, so the effect runs exactly once — after the first render (like componentDidMount in class components).",
      },
      {
        id: "q2",
        question: "What is the purpose of the cleanup function returned from useEffect?",
        options: [
          "To reset state to its initial value",
          "To cancel subscriptions, timers, or requests before the next effect runs or on unmount",
          "To clear the component's JSX",
          "To log performance metrics",
        ],
        correctAnswer: 1,
        explanation: "The cleanup function runs before the next effect execution and on unmount. It prevents memory leaks from timers, event listeners, WebSockets, and fetch requests.",
      },
      {
        id: "q3",
        question: "What does `useContext` do?",
        options: [
          "Creates a new context object",
          "Provides context to child components",
          "Reads the nearest matching context value in the component tree",
          "Subscribes to Redux store changes",
        ],
        correctAnswer: 2,
        explanation: "`useContext(MyContext)` reads the current value from the nearest `<MyContext.Provider>` above in the tree. It re-renders the component when the context value changes.",
      },
      {
        id: "q4",
        question: "When should you prefer `useReducer` over `useState`?",
        options: [
          "Always — useReducer is strictly better",
          "When state is a single boolean",
          "When state has multiple sub-values or complex update logic with many action types",
          "Only in TypeScript projects",
        ],
        correctAnswer: 2,
        explanation: "`useReducer` shines when you have related state fields, many update actions, or logic that's easier to test as a pure reducer function separate from the component.",
      },
      {
        id: "q5",
        question: "What naming rule must a custom hook follow?",
        options: [
          "It must start with 'hook'",
          "It must start with 'use'",
          "It must end with 'Hook'",
          "No naming rules — it's just a function",
        ],
        correctAnswer: 1,
        explanation: "Custom hooks MUST start with `use` (e.g. `useFetch`, `useDebounce`). This allows React's linter to enforce the Rules of Hooks and signal to developers that the function uses hooks internally.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 6 — Styling & Performance
  // ══════════════════════════════════════════
  {
    id: 6,
    moduleTitle: "Styling & Performance",
    lessonTitle: "Styling in React",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "How do you write inline styles in React JSX?",
        options: [
          `style="background-color: blue"`,
          `style={{ backgroundColor: 'blue' }}`,
          `css={{ background: blue }}`,
          `style={background-color: blue}`,
        ],
        correctAnswer: 1,
        explanation: "Inline styles in JSX are JavaScript objects with camelCase property names: `style={{ backgroundColor: 'blue', fontSize: 16 }}`. Note the double braces — outer for JSX expression, inner for the object.",
      },
      {
        id: "q2",
        question: "What is the main benefit of CSS Modules?",
        options: [
          "They make CSS load faster",
          "They scope class names locally to the component, preventing collisions",
          "They support Sass automatically",
          "They replace the need for a bundler",
        ],
        correctAnswer: 1,
        explanation: "CSS Modules generate unique class names at build time, so `.card` in one module doesn't clash with `.card` in another. You import them as an object: `import s from './Card.module.css'`.",
      },
      {
        id: "q3",
        question: "What does `React.memo` do?",
        options: [
          "Memoizes an expensive calculation",
          "Wraps a component and skips re-rendering if props haven't shallowly changed",
          "Creates a memoized event handler",
          "Caches API responses",
        ],
        correctAnswer: 1,
        explanation: "`React.memo` is a higher-order component. It does a shallow comparison of the previous and next props; if they're equal, it skips the re-render and reuses the last output.",
      },
      {
        id: "q4",
        question: "What is the difference between `useMemo` and `useCallback`?",
        options: [
          "There is no difference",
          "`useMemo` memoizes a value; `useCallback` memoizes a function reference",
          "`useCallback` memoizes a value; `useMemo` memoizes a function",
          "`useMemo` is for class components; `useCallback` is for functional",
        ],
        correctAnswer: 1,
        explanation: "`useMemo(() => compute(), [deps])` returns a cached value. `useCallback(() => fn(), [deps])` returns a cached function reference — useful when passing handlers to memoized children.",
      },
      {
        id: "q5",
        question: "When should you start optimizing with React.memo / useMemo?",
        options: [
          "From the very first component you write",
          "Only after measuring with React DevTools Profiler and identifying actual bottlenecks",
          "Only in production builds",
          "When the component has more than 10 props",
        ],
        correctAnswer: 1,
        explanation: "Premature optimization adds complexity and memoization itself has a cost. Profile first with React DevTools Profiler, identify which renders are actually expensive, then optimize those specific cases.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 7 — Event Handling
  // ══════════════════════════════════════════
  {
    id: 7,
    moduleTitle: "Event Handling",
    lessonTitle: "React Event System",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is a SyntheticEvent in React?",
        options: [
          "An artificial event fired on component mount",
          "A cross-browser wrapper around native DOM events for consistency",
          "An event that only exists in React DevTools",
          "An event triggered by state changes",
        ],
        correctAnswer: 1,
        explanation: "React wraps every native DOM event in a SyntheticEvent. This gives a consistent API across all browsers and lets React manage event delegation efficiently from the root element.",
      },
      {
        id: "q2",
        question: "Which is the correct way to pass an event handler with arguments?",
        options: [
          "onClick={handleItem(id)}",
          "onClick={handleItem}",
          "onClick={() => handleItem(id)}",
          "onClick='handleItem(id)'",
        ],
        correctAnswer: 2,
        explanation: "Wrap in an arrow function: `onClick={() => handleItem(id)}`. Writing `handleItem(id)` calls the function immediately during render. The arrow function defers the call to click time.",
      },
      {
        id: "q3",
        question: "How do you stop an event from bubbling up the DOM?",
        options: [
          "e.cancelBubble()",
          "e.stopPropagation()",
          "e.preventDefault()",
          "return false from the handler",
        ],
        correctAnswer: 1,
        explanation: "`e.stopPropagation()` prevents the event from bubbling to parent elements. Note: `e.preventDefault()` is different — it cancels the browser's default action (e.g. form submit, link navigation).",
      },
      {
        id: "q4",
        question: "What makes an input 'controlled' in React?",
        options: [
          "Styling it with a border",
          "Its value is driven by React state via `value` and `onChange`",
          "Wrapping it in a form tag",
          "Using a ref to access it",
        ],
        correctAnswer: 1,
        explanation: "A controlled input has its value set by React state (`value={state}`) and updates state on every keystroke (`onChange={e => setState(e.target.value)}`). React is always the single source of truth.",
      },
      {
        id: "q5",
        question: "Which keyboard events should you use (not deprecated)?",
        options: [
          "onKeyPress",
          "onKeyDown and onKeyUp",
          "onKeyStroke",
          "onKeyTap",
        ],
        correctAnswer: 1,
        explanation: "`onKeyPress` is deprecated and removed from modern browsers. Use `onKeyDown` (fires when key is pressed) and `onKeyUp` (fires when key is released) instead.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 8 — Conditional Rendering
  // ══════════════════════════════════════════
  {
    id: 8,
    moduleTitle: "Conditional Rendering",
    lessonTitle: "If/Else and Ternary Patterns",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Which pattern renders nothing when a condition is false?",
        options: [
          "condition ? <A /> : null",
          "condition && <A />",
          "Both A and B",
          "if (condition) return <A />",
        ],
        correctAnswer: 2,
        explanation: "Both work. `condition && <A />` short-circuits to render nothing when false. `condition ? <A /> : null` explicitly renders null. However, watch out for `0 && <A />` — it renders '0'!",
      },
      {
        id: "q2",
        question: "What is the danger of `count && <Badge />`?",
        options: [
          "It causes an infinite loop",
          "When count is 0, React renders '0' instead of nothing",
          "It's invalid JSX syntax",
          "It throws a runtime error",
        ],
        correctAnswer: 1,
        explanation: "When `count` is `0`, `&&` short-circuits and returns `0` (falsy but renderable). React renders the number '0' on screen. Fix: `count > 0 && <Badge />` or `!!count && <Badge />`.",
      },
      {
        id: "q3",
        question: "What is the best approach for handling loading and error states?",
        options: [
          "Render all states simultaneously and hide with CSS",
          "Use early returns: check loading, then error, then render the data",
          "Throw an error and let the error boundary handle it",
          "Use a switch statement on the render method",
        ],
        correctAnswer: 1,
        explanation: "Early returns are clean and readable: `if (loading) return <Spinner />; if (error) return <Error />; return <Data />;`. This avoids deeply nested ternaries.",
      },
      {
        id: "q4",
        question: "For role-based rendering, where must you ALSO enforce access control?",
        options: [
          "Only in the frontend React component",
          "Only in the browser's localStorage",
          "On the server — frontend checks are cosmetic only",
          "In the CSS with display:none",
        ],
        correctAnswer: 2,
        explanation: "Frontend conditional rendering is purely cosmetic. A user can bypass it with browser dev tools. Always enforce permissions on the server (API route guards) for real security.",
      },
      {
        id: "q5",
        question: "When should you extract a conditional into a helper function?",
        options: [
          "Always — conditions should never be inline",
          "When a ternary becomes nested or hard to read",
          "Only when using TypeScript",
          "When the condition has more than one &&",
        ],
        correctAnswer: 1,
        explanation: "When your ternary needs nesting or the logic becomes complex, extract it: `function renderContent() { ... }` and call `{renderContent()}` in JSX. This improves readability significantly.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 9 — Lists & Keys
  // ══════════════════════════════════════════
  {
    id: 9,
    moduleTitle: "Lists & Keys",
    lessonTitle: "Rendering Lists with map()",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Which array method is the standard way to render a list in React?",
        options: ["forEach()", "map()", "reduce()", "find()"],
        correctAnswer: 1,
        explanation: "`map()` returns a new array of JSX elements — perfect for rendering. `forEach()` returns `undefined`, so it cannot be used directly in JSX.",
      },
      {
        id: "q2",
        question: "What is the best value to use as a list item `key`?",
        options: [
          "Math.random()",
          "The array index",
          "A stable unique ID from your data (e.g. database ID)",
          "The item's display text",
        ],
        correctAnswer: 2,
        explanation: "Stable database IDs ensure React can correctly track items across renders. Array indices shift on insert/delete causing bugs. `Math.random()` creates a new key every render, forcing full re-mounts.",
      },
      {
        id: "q3",
        question: "What React problem does using array index as key cause?",
        options: [
          "Slower rendering on first load",
          "Loss of component state and wrong animations when items are added, removed, or reordered",
          "TypeScript compilation errors",
          "No problem — index keys are always safe",
        ],
        correctAnswer: 1,
        explanation: "When you insert or delete an item, indices shift. React then thinks a different element is at each position, causing mismatched state, lost input focus, and incorrect animations.",
      },
      {
        id: "q4",
        question: "How do you render a filtered and sorted list efficiently?",
        options: [
          "Use a for-loop and push to a new array",
          "Chain `.filter().sort().map()` before rendering",
          "Sort in the database only",
          "Use a useEffect to pre-compute it",
        ],
        correctAnswer: 1,
        explanation: "Chain array methods: `items.filter(i => i.active).sort((a,b) => a.name.localeCompare(b.name)).map(i => <Item key={i.id} {...i} />)`. Wrap in `useMemo` for large lists.",
      },
      {
        id: "q5",
        question: "Do keys need to be globally unique across the entire app?",
        options: [
          "Yes — they must be universally unique",
          "No — they only need to be unique among sibling elements in the same list",
          "Yes — use UUID v4 for every key",
          "No — they don't need to be unique at all",
        ],
        correctAnswer: 1,
        explanation: "Keys only need to be unique among siblings in the same `.map()` call. The same key value can be reused in different lists without any issue.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 10 — useEffect
  // ══════════════════════════════════════════
  {
    id: 10,
    moduleTitle: "useEffect",
    lessonTitle: "useEffect Basics",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "When does useEffect with no dependency array run?",
        options: [
          "Only on mount",
          "Only on unmount",
          "After every render",
          "Never — it requires a dependency array",
        ],
        correctAnswer: 2,
        explanation: "Without a dependency array, useEffect runs after every single render. This is rarely what you want — it usually leads to infinite loops or unnecessary work. Almost always pass `[]` or specific deps.",
      },
      {
        id: "q2",
        question: "How do you safely cancel a fetch request inside useEffect?",
        options: [
          "Set a `cancelled` boolean flag",
          "Use `clearFetch()`",
          "Use `AbortController` and call `abort()` in the cleanup function",
          "Wrap fetch in a try/finally",
        ],
        correctAnswer: 2,
        explanation: "`const ctrl = new AbortController(); fetch(url, { signal: ctrl.signal }); return () => ctrl.abort();` — the cleanup cancels the in-flight request before the next effect runs or on unmount.",
      },
      {
        id: "q3",
        question: "What is a stale closure in useEffect?",
        options: [
          "A memory leak from uncleared intervals",
          "An effect referencing an outdated variable from a previous render",
          "A closure that has been garbage collected",
          "An unused import in the component file",
        ],
        correctAnswer: 1,
        explanation: "When a variable is captured at effect creation time but later changes, the effect still sees the old value — a stale closure. Fix: add the variable to deps, or use a functional state update.",
      },
      {
        id: "q4",
        question: "Which scenario would cause an infinite useEffect loop?",
        options: [
          "useEffect(() => { setCount(c => c + 1); }, []);",
          "useEffect(() => { setData([]); }, [data]);",
          "useEffect(() => { document.title = count; }, [count]);",
          "useEffect(() => { console.log('mounted'); }, []);",
        ],
        correctAnswer: 1,
        explanation: "`setData([])` creates a new array reference every render, changing `data`, which triggers the effect again — infinite loop. Fix: ensure data stabilizes, or restructure the logic.",
      },
      {
        id: "q5",
        question: "When should you NOT use useEffect?",
        options: [
          "For data fetching",
          "To compute a derived value from existing state/props",
          "To set up event listeners",
          "To sync with an external system",
        ],
        correctAnswer: 1,
        explanation: "If you can compute a value directly from state or props, just do it inline: `const fullName = firstName + ' ' + lastName`. Using an effect to sync state from state adds an extra render and bugs.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 11 — Routing
  // ══════════════════════════════════════════
  {
    id: 11,
    moduleTitle: "Routing",
    lessonTitle: "React Router v6 Setup",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "Which component from React Router wraps your entire app to enable routing?",
        options: ["<Router>", "<Switch>", "<BrowserRouter>", "<RouterProvider>"],
        correctAnswer: 2,
        explanation: "`<BrowserRouter>` provides the routing context using the HTML5 History API. Wrap your root component (or `<App>`) with it to enable all other Router hooks and components.",
      },
      {
        id: "q2",
        question: "How do you read a dynamic URL segment like `/user/:id`?",
        options: [
          "useLocation()",
          "useParams()",
          "useSearchParams()",
          "useRouteMatch()",
        ],
        correctAnswer: 1,
        explanation: "`const { id } = useParams()` reads named segments from the URL. For `/user/42`, `id` will be the string `'42'`. Remember to parse with `Number(id)` if you need a number.",
      },
      {
        id: "q3",
        question: "What does `<Link>` do differently from a regular `<a>` tag?",
        options: [
          "It opens links in a new tab",
          "It navigates without a full page reload, keeping React state intact",
          "It adds rel='noopener' automatically",
          "It prefetches the linked page",
        ],
        correctAnswer: 1,
        explanation: "`<Link to='/about'>` uses the History API to update the URL and render the new route without a browser page reload, preserving the React app state and avoiding a full network round-trip.",
      },
      {
        id: "q4",
        question: "How do you redirect an unauthenticated user to `/login`?",
        options: [
          "window.location.href = '/login'",
          "return <Navigate to='/login' replace />",
          "router.push('/login')",
          "useRedirect('/login')",
        ],
        correctAnswer: 1,
        explanation: "`<Navigate to='/login' replace />` renders a redirect without adding to the browser history stack (`replace` prevents the user going back to the protected route). It's the declarative React Router v6 approach.",
      },
      {
        id: "q5",
        question: "How do you read and update query string parameters (?tab=settings)?",
        options: [
          "window.location.search",
          "useParams()",
          "useSearchParams()",
          "useLocation().query",
        ],
        correctAnswer: 2,
        explanation: "`const [params, setParams] = useSearchParams(); const tab = params.get('tab');` reads query params. `setParams({ tab: 'settings' })` updates the URL query string reactively without navigation.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 12 — Forms & Validation
  // ══════════════════════════════════════════
  {
    id: 12,
    moduleTitle: "Forms & Validation",
    lessonTitle: "Controlled Forms",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What makes a form 'controlled' in React?",
        options: [
          "Using a <form> element",
          "Input values are driven by React state via `value` and `onChange`",
          "Using React Hook Form library",
          "Having a submit button",
        ],
        correctAnswer: 1,
        explanation: "A controlled form keeps all input values in React state. Each `<input>` has `value={state.field}` and `onChange={e => setState(...)}`, making React the single source of truth.",
      },
      {
        id: "q2",
        question: "What is the cleanest way to handle multiple inputs with one handler?",
        options: [
          "Write a separate onChange handler for each input",
          "Use the `name` attribute and `e.target.name` as a computed property key",
          "Combine all inputs into a single text area",
          "Use ref for each input",
        ],
        correctAnswer: 1,
        explanation: "`const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))` — using `name` as a computed key lets one handler manage all fields.",
      },
      {
        id: "q3",
        question: "What is React Hook Form's performance advantage?",
        options: [
          "It batches API calls",
          "It uses uncontrolled inputs via refs, causing fewer re-renders than controlled inputs",
          "It compiles forms to native HTML",
          "It caches validation results in localStorage",
        ],
        correctAnswer: 1,
        explanation: "RHF uses uncontrolled inputs — refs track values without state updates on every keystroke. This drastically reduces re-renders, especially for large forms.",
      },
      {
        id: "q4",
        question: "What does Zod's `z.infer<typeof schema>` do?",
        options: [
          "Runs the validation",
          "Derives a TypeScript type from the Zod schema — no need to write the interface manually",
          "Generates mock form data",
          "Creates a React component from the schema",
        ],
        correctAnswer: 1,
        explanation: "`type FormData = z.infer<typeof schema>` extracts a TypeScript type from your Zod schema automatically. Change the schema and the type updates — zero duplication.",
      },
      {
        id: "q5",
        question: "In a multi-step form, how should you accumulate data across steps?",
        options: [
          "Save to localStorage after each step",
          "Keep a shared data object in the parent and merge each step's data on 'Next'",
          "Use a separate API call for each step",
          "Pass all data as URL query params",
        ],
        correctAnswer: 1,
        explanation: "Hold accumulated data in the parent: `const [data, setData] = useState({})`. Each step calls `onNext(stepData)` which merges: `setData(prev => ({ ...prev, ...stepData }))` and advances the step.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 13 — State Management
  // ══════════════════════════════════════════
  {
    id: 13,
    moduleTitle: "State Management",
    lessonTitle: "Context API Deep Dive",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What problem does Context API solve?",
        options: [
          "Slow API requests",
          "Prop drilling — passing data through many layers of components",
          "Large bundle sizes",
          "TypeScript errors in hooks",
        ],
        correctAnswer: 1,
        explanation: "Context lets any component in the tree read shared data without threading props through every intermediate layer. It's ideal for auth, theme, and locale.",
      },
      {
        id: "q2",
        question: "What is Zustand's key advantage over Context + useState?",
        options: [
          "It supports server-side rendering exclusively",
          "No Provider needed and components only re-render when their selected slice changes",
          "It automatically persists to a database",
          "It replaces useEffect",
        ],
        correctAnswer: 1,
        explanation: "Zustand stores need no Provider wrapper. Components subscribe to specific slices via selectors, so only components that use changed data re-render — unlike Context which re-renders all consumers.",
      },
      {
        id: "q3",
        question: "In Redux Toolkit, what handles immutability so you can write `state.value++`?",
        options: ["Reselect", "Redux Thunk", "Immer", "RTK Query"],
        correctAnswer: 2,
        explanation: "RTK uses Immer under the hood. Immer creates a draft state proxy — you write 'mutating' code and Immer produces a new immutable state behind the scenes.",
      },
      {
        id: "q4",
        question: "What type of state is best managed by TanStack Query or RTK Query?",
        options: [
          "Local UI state (modal open/closed)",
          "URL state (current filters)",
          "Server/async state (data fetched from APIs)",
          "Animation state",
        ],
        correctAnswer: 2,
        explanation: "Server state — data that lives on a backend — has unique needs: caching, background refresh, deduplication, loading/error states. TanStack Query and RTK Query are built specifically for this.",
      },
      {
        id: "q5",
        question: "What is the guiding rule for choosing where to put state?",
        options: [
          "Always use a global store for everything",
          "Keep state as local as possible; lift or globalize only when truly shared",
          "Always use Context for any shared data",
          "Put all state in the URL",
        ],
        correctAnswer: 1,
        explanation: "Start with local `useState`. Lift to a common parent if siblings need it. Use a global store only if unrelated parts of the tree need the same data. Each level adds complexity.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 14 — API Integration
  // ══════════════════════════════════════════
  {
    id: 14,
    moduleTitle: "API Integration",
    lessonTitle: "fetch & axios Basics",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What does the native `fetch` API NOT do automatically that axios does?",
        options: [
          "Send HTTP requests",
          "Throw an error on 4xx/5xx status codes",
          "Support async/await",
          "Accept JSON in the request body",
        ],
        correctAnswer: 1,
        explanation: "`fetch` only rejects on network errors — a 404 or 500 response resolves normally. You must check `res.ok` manually. Axios throws automatically on non-2xx responses.",
      },
      {
        id: "q2",
        question: "What does TanStack Query's `queryKey` do?",
        options: [
          "Acts as the API endpoint URL",
          "Uniquely identifies a query for caching, deduplication, and invalidation",
          "Sets the HTTP method",
          "Defines the polling interval",
        ],
        correctAnswer: 1,
        explanation: "The `queryKey` (e.g. `['users', userId]`) is the cache key. Queries with the same key share cached data. Calling `invalidateQueries({ queryKey: ['users'] })` refetches all matching queries.",
      },
      {
        id: "q3",
        question: "Where should you store a JWT token for best security?",
        options: [
          "localStorage",
          "sessionStorage",
          "A JavaScript variable (memory only)",
          "An httpOnly cookie set by the server",
        ],
        correctAnswer: 3,
        explanation: "An httpOnly cookie cannot be accessed by JavaScript, protecting against XSS attacks. localStorage and sessionStorage are vulnerable to XSS. Memory (variable) is lost on refresh.",
      },
      {
        id: "q4",
        question: "What is the main difference between REST and GraphQL?",
        options: [
          "GraphQL only works with MongoDB",
          "REST uses multiple endpoints with fixed data shapes; GraphQL uses one endpoint where clients request exactly the fields they need",
          "REST is faster than GraphQL in all cases",
          "GraphQL requires a specific frontend framework",
        ],
        correctAnswer: 1,
        explanation: "REST: `GET /users/1` returns the full user object (may over-fetch). GraphQL: `query { user(id:1) { name email } }` returns only the requested fields from a single endpoint.",
      },
      {
        id: "q5",
        question: "Why use WebSockets instead of repeated HTTP polling?",
        options: [
          "WebSockets are supported by more browsers",
          "WebSockets maintain a persistent full-duplex connection for real-time, low-latency bi-directional communication",
          "WebSockets are easier to set up",
          "HTTP polling was deprecated in 2020",
        ],
        correctAnswer: 1,
        explanation: "WebSockets keep a persistent connection open, allowing the server to push data instantly. HTTP polling repeatedly sends requests on a timer — wasteful and slower for real-time use cases.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 15 — Performance
  // ══════════════════════════════════════════
  {
    id: 15,
    moduleTitle: "Performance",
    lessonTitle: "React.memo & Preventing Re-renders",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What comparison does `React.memo` use to decide whether to skip re-rendering?",
        options: [
          "Deep equality of all nested objects",
          "Shallow equality — compares prop references one level deep",
          "JSON.stringify comparison",
          "Reference identity of the component function",
        ],
        correctAnswer: 1,
        explanation: "`React.memo` does a shallow comparison. Primitive props (strings, numbers, booleans) compare by value. Objects and arrays compare by reference — so new objects/arrays always cause a re-render.",
      },
      {
        id: "q2",
        question: "Why does `<List onSelect={item => handle(item)} />` break React.memo?",
        options: [
          "Arrow functions are not allowed as props",
          "A new function object is created on every render, so the reference always changes",
          "React.memo doesn't compare function props",
          "The arrow function must be named",
        ],
        correctAnswer: 1,
        explanation: "Each render creates a brand-new function object. Even though the logic is the same, `prevProp !== nextProp` by reference, so `React.memo` sees a changed prop and re-renders. Fix: `useCallback`.",
      },
      {
        id: "q3",
        question: "What does `React.lazy` paired with `<Suspense>` achieve?",
        options: [
          "Runs the component in a Web Worker",
          "Code-splits the component into a separate bundle chunk loaded on demand",
          "Delays the component render by 500ms for animation",
          "Caches the component output in memory",
        ],
        correctAnswer: 1,
        explanation: "`lazy(() => import('./Dashboard'))` creates a dynamic import. The Dashboard chunk is only downloaded when that route is rendered, reducing initial bundle size. `<Suspense>` shows a fallback while loading.",
      },
      {
        id: "q4",
        question: "What is virtualization (windowing) and when should you use it?",
        options: [
          "Running React in an iframe",
          "Rendering only visible list items in the DOM to handle very large datasets (thousands of rows)",
          "Memoizing the entire component tree",
          "Lazy-loading images",
        ],
        correctAnswer: 1,
        explanation: "Libraries like TanStack Virtual render only what's visible in the viewport, keeping the DOM lean. Essential for lists of thousands of items where full rendering would freeze the browser.",
      },
      {
        id: "q5",
        question: "What is the correct first step before optimizing a React component?",
        options: [
          "Add React.memo to every component",
          "Add useMemo to every calculation",
          "Profile with React DevTools Profiler to identify actual bottlenecks",
          "Rewrite in class components",
        ],
        correctAnswer: 2,
        explanation: "Profile first. Memoization has a cost — it uses memory and adds complexity. The React DevTools Profiler shows which components render, how often, and how long each render takes.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 16 — Custom Hooks
  // ══════════════════════════════════════════
  {
    id: 16,
    moduleTitle: "Custom Hooks",
    lessonTitle: "Building Custom Hooks",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is the primary purpose of a custom hook?",
        options: [
          "To create reusable UI components",
          "To extract and share stateful logic between components without duplicating code",
          "To replace Redux in all projects",
          "To communicate with the DOM directly",
        ],
        correctAnswer: 1,
        explanation: "Custom hooks extract stateful logic (useState, useEffect, etc.) into a reusable function. Multiple components can call the same custom hook and each gets its own isolated state.",
      },
      {
        id: "q2",
        question: "Why is the `use` prefix required for custom hooks?",
        options: [
          "It makes the function faster",
          "It's a JavaScript module convention",
          "It signals to React's linter to enforce the Rules of Hooks for that function",
          "It's required for TypeScript inference",
        ],
        correctAnswer: 2,
        explanation: "The `use` prefix tells the React ESLint plugin this function uses hooks internally. The linter then checks that you're not calling it conditionally and enforces all rules of hooks.",
      },
      {
        id: "q3",
        question: "In a `useFetch` hook, why should you use `AbortController`?",
        options: [
          "To speed up the network request",
          "To cancel the in-flight request when the component unmounts or the URL changes, preventing state updates on unmounted components",
          "To retry failed requests automatically",
          "To handle CORS errors",
        ],
        correctAnswer: 1,
        explanation: "If the component unmounts while a fetch is in-flight, the response callback would try to call `setState` on an unmounted component. `AbortController` cancels the request in the cleanup to prevent this.",
      },
      {
        id: "q4",
        question: "What does `useDebounce(value, delay)` return?",
        options: [
          "A function that delays setting state",
          "A debounced version of the value — only updates after `delay` ms of no changes",
          "A timer ID you must clear manually",
          "The original value with no changes",
        ],
        correctAnswer: 1,
        explanation: "The hook internally sets a timeout that resets on every value change. It returns a `debounced` state that only updates once `delay` ms has passed without a new change — ideal for search inputs.",
      },
      {
        id: "q5",
        question: "What makes `useLocalStorage` safer than using `localStorage` directly?",
        options: [
          "It encrypts the stored data",
          "It wraps access in try/catch and uses a lazy initializer, handling JSON parsing errors and SSR gracefully",
          "It synchronizes across browser tabs automatically",
          "It stores data in IndexedDB instead",
        ],
        correctAnswer: 1,
        explanation: "Direct `localStorage` access can throw on SSR (no window) or if JSON.parse fails. The custom hook wraps everything in try/catch and uses a lazy initializer to safely read from localStorage only once.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 17 — Project Structure
  // ══════════════════════════════════════════
  {
    id: 17,
    moduleTitle: "Project Structure",
    lessonTitle: "Folder Structure Best Practices",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What is the guiding principle of feature-based folder structure?",
        options: [
          "Group all components in one folder, all hooks in another",
          "Files that change together should live together — co-locate by feature",
          "One file per folder always",
          "Mirror the backend folder structure exactly",
        ],
        correctAnswer: 1,
        explanation: "Feature-based structure (e.g. `features/auth/` containing components, hooks, and slice) means related files are co-located. You don't have to jump across folders to work on one feature.",
      },
      {
        id: "q2",
        question: "What does a TypeScript interface for component props provide?",
        options: [
          "Runtime validation of props",
          "Compile-time type checking, autocompletion, and self-documentation",
          "Automatic prop default values",
          "Performance improvements at runtime",
        ],
        correctAnswer: 1,
        explanation: "TypeScript interfaces catch prop type errors at compile time before the code runs. IDEs also use them for autocompletion and inline documentation, making the component easier to use correctly.",
      },
      {
        id: "q3",
        question: "In React Testing Library, what query should you prefer for finding elements?",
        options: [
          "getByTestId",
          "getByClassName",
          "getByRole",
          "getByIndex",
        ],
        correctAnswer: 2,
        explanation: "`getByRole` is the highest-priority query because it mimics how users and assistive technologies interact with the page. It also enforces accessibility implicitly — if an element has a role, it's accessible.",
      },
      {
        id: "q4",
        question: "What is a barrel export (`index.ts`) used for?",
        options: [
          "Bundling JavaScript for production",
          "Re-exporting multiple modules from one file to simplify import paths",
          "Declaring global TypeScript types",
          "Configuring webpack entry points",
        ],
        correctAnswer: 1,
        explanation: "A barrel: `export { Button } from './Button'; export { Input } from './Input'`. Consumers import from the folder: `import { Button, Input } from '@/components'` — clean and refactor-friendly.",
      },
      {
        id: "q5",
        question: "What does MSW (Mock Service Worker) do in tests?",
        options: [
          "Renders components in a headless browser",
          "Intercepts network requests at the Service Worker level and returns mock responses",
          "Mocks React hooks",
          "Generates test data automatically",
        ],
        correctAnswer: 1,
        explanation: "MSW intercepts `fetch`/`axios` calls at the network level — no need to mock modules. Tests run against realistic responses without hitting a real API, making them fast and reliable.",
      },
    ],
  },

  // ══════════════════════════════════════════
  // MODULE 18 — Deployment
  // ══════════════════════════════════════════
  {
    id: 18,
    moduleTitle: "Deployment",
    lessonTitle: "Building for Production",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        question: "What does `npm run build` (or `next build`) produce?",
        options: [
          "A development server",
          "Minified, tree-shaken, content-hashed static files ready for deployment",
          "A Docker container",
          "TypeScript declaration files",
        ],
        correctAnswer: 1,
        explanation: "The build command bundles, minifies, and tree-shakes your code, strips dev warnings, and adds content hashes to filenames for long-term CDN caching. The output goes into `dist/` or `.next/`.",
      },
      {
        id: "q2",
        question: "What is a Vercel Preview Deployment?",
        options: [
          "A local dev server on port 3000",
          "A unique URL auto-deployed for every pull request, allowing review before merging",
          "A paid Vercel feature for load testing",
          "A backup of the production deployment",
        ],
        correctAnswer: 1,
        explanation: "When you push to a branch or open a PR, Vercel automatically builds and deploys to a unique preview URL. Teammates can review the real app — not just code — before merging to production.",
      },
      {
        id: "q3",
        question: "What does `replace` do in `<Navigate to='/login' replace />`?",
        options: [
          "Replaces the entire React app with a new one",
          "Replaces the current history entry so the user can't navigate back to the protected route",
          "Replaces the login form content",
          "Replaces the server-side session",
        ],
        correctAnswer: 1,
        explanation: "Without `replace`, pressing the browser back button returns to the protected page, which immediately redirects again — a confusing loop. `replace` removes that entry from history.",
      },
      {
        id: "q4",
        question: "In a Docker multi-stage build for React, what does the second stage (nginx) do?",
        options: [
          "Runs the Node.js build process",
          "Serves the static build output efficiently in production without shipping Node.js or node_modules",
          "Runs unit tests",
          "Compiles TypeScript",
        ],
        correctAnswer: 1,
        explanation: "Stage 1 (Node) builds the app. Stage 2 (nginx) copies only the `dist/` output. The final image is tiny — no build tools, no source code, no `node_modules` — just a fast static file server.",
      },
      {
        id: "q5",
        question: "What should you always do before deploying to production?",
        options: [
          "Delete all console.log statements and verify all environment variables are set",
          "Run the app in Internet Explorer to check compatibility",
          "Disable TypeScript strict mode",
          "Switch from axios to fetch",
        ],
        correctAnswer: 0,
        explanation: "Console logs can leak sensitive data. Missing env vars cause runtime errors. Always run through the pre-deploy checklist: remove logs, set env vars, enable error monitoring (Sentry), and test the production build locally with `npm run preview`.",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Helper: look up a quiz by MongoDB module field value
// Usage: getQuizByModule('JavaScript Fundamentals')
// ─────────────────────────────────────────────────────────────────
export function getQuizByModule(moduleTitle: string): Quiz | undefined {
  return QUIZZES.find(
    (q) => q.moduleTitle.toLowerCase() === moduleTitle.toLowerCase()
  );
}

// Legacy helper — look up by lessonTitle for backward compat
export function getQuizByLesson(lessonTitle: string): Quiz | undefined {
  return QUIZZES.find(
    (q) => q.lessonTitle.toLowerCase() === lessonTitle.toLowerCase()
  );
}

// ─────────────────────────────────────────────────────────────────
// QUIZ_DEFINITIONS — required by app/api/quizzes/route.ts
// ─────────────────────────────────────────────────────────────────
export const QUIZ_DEFINITIONS: Record<string, string> = {
  "React": "A JavaScript library for building user interfaces with reusable components and efficient rendering.",
  "Component": "A reusable piece of UI that encapsulates structure (JSX), behavior (logic), and styling.",
  "JSX": "JavaScript XML — a syntax extension allowing you to write HTML-like code in JavaScript files.",
  "Props": "Read-only data passed from parent to child components to customize behavior and appearance.",
  "State": "Mutable data owned by a component that triggers re-renders when updated via a setter function.",
  "Virtual DOM": "An in-memory representation of the real DOM used by React to calculate minimal updates.",
  "Hook": "A function starting with 'use' that lets you use React features like state and effects in functional components.",
  "useState": "A hook that adds local state to a functional component, returning [state, setState].",
  "useEffect": "A hook for running side effects (data fetching, subscriptions, timers) after render.",
  "useContext": "A hook that reads the nearest matching React context value, avoiding prop drilling.",
  "useReducer": "A hook for managing complex state with a reducer function and dispatch actions.",
  "useCallback": "A hook that returns a memoized function reference, stable across renders unless deps change.",
  "useMemo": "A hook that memoizes an expensive computed value, recomputing only when deps change.",
  "useRef": "A hook that returns a mutable ref object — useful for DOM access and mutable values without re-render.",
  "Custom Hook": "A function prefixed with 'use' that composes built-in hooks to share reusable stateful logic.",
  "Rendering": "The process of converting JSX and component data into HTML displayed on the screen.",
  "Re-rendering": "When React re-executes a component's function due to state or prop changes.",
  "Conditional Rendering": "Displaying different JSX based on conditions using if/else, ternary, or logical &&.",
  "Event Handler": "A function that runs in response to user interactions such as clicks or form submissions.",
  "Controlled Component": "An input whose value is fully driven by React state via value and onChange props.",
  "Uncontrolled Component": "An input that manages its own value in the DOM, accessed via a ref.",
  "Key": "A stable unique identifier on list items that helps React track changes during reconciliation.",
  "Reconciliation": "React's diffing algorithm that determines the minimal DOM changes needed after a re-render.",
  "Prop Drilling": "Passing props through many intermediate components just to reach a deeply nested child.",
  "Side Effect": "Any operation outside pure rendering: API calls, subscriptions, timers, or DOM mutations.",
  "Dependency Array": "The second argument to useEffect/useMemo/useCallback that controls when they re-run.",
  "Cleanup Function": "A function returned from useEffect that runs before the next effect or on unmount.",
  "Code Splitting": "Splitting the JS bundle into chunks loaded on demand, reducing initial load time.",
  "Lazy Loading": "Deferring component or module loading until it is actually needed using React.lazy.",
  "Memoization": "Caching the result of a computation so it is not recalculated unless its inputs change.",
  "Context API": "React's built-in system for sharing data across the component tree without prop drilling.",
  "Provider": "A Context component that supplies its value to all descendant consumers.",
  "Reducer": "A pure function (state, action) => newState that centralizes state transition logic.",
  "dispatch": "A function returned by useReducer used to send action objects to the reducer.",
  "Zustand": "A lightweight global state library that uses a hook-based API without requiring a Provider.",
  "Redux Toolkit": "The official opinionated Redux package that reduces boilerplate with createSlice and Immer.",
  "Immer": "A library used by Redux Toolkit that lets you write 'mutating' code that produces immutable state.",
  "RTK Query": "A data-fetching and caching layer built into Redux Toolkit for managing server state.",
  "TanStack Query": "A library for fetching, caching, and synchronizing server state in React applications.",
  "React Router": "The standard routing library for React, enabling navigation without full page reloads.",
  "BrowserRouter": "A React Router component that enables routing using the HTML5 History API.",
  "Link": "A React Router component that navigates to a route without reloading the page.",
  "useNavigate": "A React Router hook that returns a function for programmatic navigation.",
  "useParams": "A React Router hook that reads dynamic URL segments like :id from the current route.",
  "useSearchParams": "A React Router hook for reading and updating URL query string parameters.",
  "Protected Route": "A wrapper component that redirects unauthenticated users away from private pages.",
  "React Hook Form": "A performant form library that uses uncontrolled inputs via refs to minimize re-renders.",
  "Zod": "A TypeScript-first schema validation library that can infer TypeScript types from schemas.",
  "JWT": "JSON Web Token — a signed token used to authenticate users in stateless API requests.",
  "AbortController": "A Web API used to cancel in-flight fetch requests, typically in useEffect cleanup.",
  "Virtualization": "Rendering only visible list rows in the DOM to efficiently handle very large datasets.",
  "React.memo": "A higher-order component that skips re-rendering if props have not shallowly changed.",
  "Barrel Export": "An index.ts file that re-exports multiple modules to simplify import paths.",
  "CSS Modules": "Locally scoped CSS files that generate unique class names to prevent style collisions.",
  "Tailwind CSS": "A utility-first CSS framework where you compose styles using predefined class names.",
  "WebSocket": "A protocol providing persistent full-duplex communication between client and server.",
  "axios": "A popular HTTP client library with automatic JSON parsing and request/response interceptors.",
  "Suspense": "A React component that shows a fallback UI while a lazy-loaded component or data is loading.",
  "Error Boundary": "A class component that catches rendering errors in its subtree and shows a fallback UI.",
  "Stale Closure": "A bug where an effect captures an outdated variable value from a previous render.",
};