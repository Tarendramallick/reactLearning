// scripts/seed.ts
// Run once to populate MongoDB with all lesson data:
//   npx tsx scripts/seed.ts
//
// Prerequisites: npm install -D tsx
// Make sure MONGODB_URI is set in your .env.local

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

// ✅ manually load env for Node script
dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not found in environment variables");
}

console.log("✅ ENV LOADED:", MONGODB_URI);

const LESSONS_DATA = [

    // ══ MODULE 1: JavaScript Fundamentals (5 lessons) ══
    {
        title: 'Variables, Types & Operators',
        description: 'Core JS data types, var/let/const and operators',
        module: 'JavaScript Fundamentals', order: 1, estimatedTime: 20,
        content: `JavaScript has three variable declarations: var (avoid), let (reassignable), const (default).

Primitive types: string, number, boolean, null, undefined, symbol, bigint
Reference types: object, array, function

Key operators:
- Strict equality: === / !==
- Logical: && || ! ??
- Optional chaining: user?.address?.city
- Nullish coalescing: name ?? 'Anonymous'`,
        resources: [
            { title: 'MDN: JavaScript Data Types', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures', type: 'documentation' },
            { title: 'JavaScript.info: Variables', url: 'https://javascript.info/variables', type: 'tutorial' },
            { title: 'MDN: Expressions and Operators', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators', type: 'documentation' },
        ],
        keyPoints: ['var vs let vs const', 'Primitive types', 'Type coercion', 'Optional chaining', 'Nullish coalescing'],
    },
    {
        title: 'Functions & Scope',
        description: 'Declarations, arrow functions, closures and scope',
        module: 'JavaScript Fundamentals', order: 2, estimatedTime: 22,
        content: `Three ways to write functions:
function greet(name) { return 'Hi ' + name; }        // declaration
const greet = function(name) { return 'Hi ' + name; } // expression
const greet = (name) => 'Hi ' + name;                 // arrow

Scope:
- Global → accessible everywhere
- Function → accessible inside the function
- Block → let/const inside {}

Closures let inner functions remember outer variables even after the outer function returns.`,
        resources: [
            { title: 'MDN: Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', type: 'documentation' },
            { title: 'JavaScript.info: Closures', url: 'https://javascript.info/closure', type: 'tutorial' },
            { title: 'Arrow Functions', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions', type: 'documentation' },
        ],
        keyPoints: ['Function declarations', 'Arrow functions', 'Closures', 'Scope chain', 'Hoisting'],
    },
    {
        title: 'Arrays & Array Methods',
        description: 'Essential array methods for React development',
        module: 'JavaScript Fundamentals', order: 3, estimatedTime: 20,
        content: `Arrays are ordered lists. The most important methods for React:

map()    → transform every element, returns new array
filter() → keep elements that pass a test, returns new array
reduce() → accumulate values into a single result
find()   → return first matching element
some() / every() → boolean checks
flat() / flatMap() → flatten nested arrays

Critical: map, filter, reduce return NEW arrays — never mutate the original. React relies on immutability to detect changes.`,
        resources: [
            { title: 'MDN: Array Methods', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array', type: 'documentation' },
            { title: 'JavaScript.info: Arrays', url: 'https://javascript.info/array-methods', type: 'tutorial' },
            { title: 'Destructuring', url: 'https://javascript.info/destructuring-assignment', type: 'article' },
        ],
        keyPoints: ['map & filter', 'reduce', 'Spread operator', 'Destructuring', 'Array immutability'],
    },
    {
        title: 'Objects & Destructuring',
        description: 'Objects, spread, rest and modern destructuring syntax',
        module: 'JavaScript Fundamentals', order: 4, estimatedTime: 18,
        content: `Objects store key-value pairs. Modern JS gives clean syntax:

Shorthand:  const user = { name, age };  // instead of { name: name }
Destructure: const { name, age } = user;
Rename:      const { name: firstName } = user;
Spread:      const updated = { ...user, age: 31 };
Rest:        function pick({ name, ...rest }) {}
Optional:    const city = user?.address?.city ?? 'Unknown';`,
        resources: [
            { title: 'Object Destructuring', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment', type: 'documentation' },
            { title: 'Spread and Rest', url: 'https://javascript.info/rest-parameters-spread', type: 'tutorial' },
            { title: 'Object Methods', url: 'https://javascript.info/object-methods', type: 'article' },
        ],
        keyPoints: ['Object shorthand', 'Destructuring', 'Spread operator', 'Rest parameters', 'Nullish coalescing'],
    },
    {
        title: 'Async JS: Promises & async/await',
        description: 'Promises, fetch and async/await patterns',
        module: 'JavaScript Fundamentals', order: 5, estimatedTime: 25,
        content: `JavaScript handles async work with the event loop, Promises, and async/await.

Promise chain:
fetch('/api/data').then(r => r.json()).then(console.log).catch(console.error);

async/await (cleaner):
async function load() {
  try {
    const res  = await fetch('/api/data');
    const data = await res.json();
    return data;
  } catch (err) { console.error(err); }
}

Helpers:
Promise.all([p1, p2])        // parallel, wait for all
Promise.allSettled([p1, p2]) // all results including failures`,
        resources: [
            { title: 'MDN: Promises', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise', type: 'documentation' },
            { title: 'JavaScript.info: async/await', url: 'https://javascript.info/async-await', type: 'tutorial' },
            { title: 'Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', type: 'documentation' },
        ],
        keyPoints: ['Promises', 'async/await', 'Error handling', 'fetch API', 'Promise.all'],
    },

    // ══ MODULE 2: React Fundamentals (3 lessons) ══
    {
        title: 'What is React?',
        description: 'Introduction to React — why it exists and how it works',
        module: 'React Fundamentals', order: 6, estimatedTime: 15,
        content: `React is a JavaScript library for building UIs with reusable components.

Key ideas:
- Declarative: describe what the UI should look like, React figures out the how
- Component-based: build small reusable pieces, compose them into complex UIs
- Virtual DOM: React keeps a lightweight copy of the DOM, diffs changes, and batches real DOM updates for performance
- Unidirectional data flow: data flows down via props, events flow up via callbacks`,
        resources: [
            { title: 'Official React Docs', url: 'https://react.dev', type: 'documentation' },
            { title: 'React Getting Started', url: 'https://react.dev/learn', type: 'tutorial' },
            { title: 'Why React?', url: 'https://react.dev/blog', type: 'article' },
        ],
        keyPoints: ['Declarative UI', 'Component-based', 'Virtual DOM', 'Unidirectional flow', 'React vs DOM'],
    },
    {
        title: 'JSX Syntax',
        description: 'JSX rules, expressions, and how JSX compiles',
        module: 'React Fundamentals', order: 7, estimatedTime: 18,
        content: `JSX looks like HTML but compiles to React.createElement() calls.

Rules:
- Return a single root element — wrap siblings in <> ... </>
- Use className not class
- All tags must close: <img />
- Embed JS with {}: <h1>{user.name}</h1>
- Expressions only inside {} — no statements

Example:
const card = (
  <div className="card">
    <h1>{user.name}</h1>
    {isAdmin && <AdminBadge />}
  </div>
);`,
        resources: [
            { title: 'JSX Documentation', url: 'https://react.dev/learn/writing-markup-with-jsx', type: 'documentation' },
            { title: 'JavaScript in JSX', url: 'https://react.dev/learn/javascript-in-jsx-with-curly-braces', type: 'tutorial' },
            { title: 'JSX in Depth', url: 'https://react.dev/learn/writing-markup-with-jsx', type: 'article' },
        ],
        keyPoints: ['JSX rules', 'Fragments', 'className', 'Expressions in JSX', 'JSX compilation'],
    },
    {
        title: 'Props: Passing Data to Components',
        description: 'Pass data down the component tree with props',
        module: 'React Fundamentals', order: 8, estimatedTime: 18,
        content: `Props flow from parent to child. They are read-only.

function Welcome({ name, age = 18 }) {
  return <h1>Hello {name}, age {age}</h1>;
}
<Welcome name="Alice" age={25} />

Rules:
- Never mutate props
- Can be any JS value: strings, numbers, objects, functions, JSX
- Spread props: <Component {...props} />
- children prop: content between opening and closing tags`,
        resources: [
            { title: 'Passing Props', url: 'https://react.dev/learn/passing-props-to-a-component', type: 'documentation' },
            { title: 'Component Composition', url: 'https://react.dev/learn/passing-props-to-a-component', type: 'tutorial' },
            { title: 'Props Best Practices', url: 'https://react.dev/learn', type: 'article' },
        ],
        keyPoints: ['Props basics', 'Default props', 'children prop', 'Prop spreading', 'Immutability'],
    },

    // ══ MODULE 3: Component Mastery (3 lessons) ══
    {
        title: 'Functional Components & Hooks Intro',
        description: 'Components as functions and an overview of built-in hooks',
        module: 'Component Mastery', order: 9, estimatedTime: 22,
        content: `A functional component is a JS function returning JSX.

function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

Hooks let you add React features to functional components.

Built-in hooks at a glance:
useState      → local state
useEffect     → side effects
useContext    → read context
useRef        → mutable ref without re-render
useMemo       → memoize expensive values
useCallback   → stable function reference

Rules of Hooks:
1. Only call at the top level (not inside ifs/loops)
2. Only call from React functions or custom hooks`,
        resources: [
            { title: 'Hooks Introduction', url: 'https://react.dev/reference/react/hooks', type: 'documentation' },
            { title: 'Your First Component', url: 'https://react.dev/learn/your-first-component', type: 'tutorial' },
            { title: 'Rules of Hooks', url: 'https://react.dev/reference/rules/rules-of-hooks', type: 'documentation' },
        ],
        keyPoints: ['Functional components', 'Hooks overview', 'Rules of hooks', 'Component anatomy', 'JSX return'],
    },
    {
        title: 'Conditional Rendering',
        description: 'Show or hide UI based on conditions',
        module: 'Component Mastery', order: 10, estimatedTime: 16,
        content: `Four clean patterns:

1. Variable:
let content = <Login />;
if (user) content = <Dashboard />;

2. Ternary:
{user ? <Dashboard /> : <Login />}

3. Logical &&:
{isAdmin && <AdminPanel />}

4. Early return:
if (!data) return <Spinner />;
return <DataView data={data} />;

Avoid nested ternaries — extract a helper function if it gets complex.`,
        resources: [
            { title: 'Conditional Rendering', url: 'https://react.dev/learn/conditional-rendering', type: 'documentation' },
            { title: 'Ternary in JSX', url: 'https://react.dev/learn/conditional-rendering', type: 'tutorial' },
            { title: 'Clean Conditionals', url: 'https://react.dev/learn/conditional-rendering', type: 'article' },
        ],
        keyPoints: ['if/else', 'Ternary operator', 'Logical &&', 'Early return', 'Readable conditionals'],
    },
    {
        title: 'Lists and Keys',
        description: 'Render arrays of data with proper keys',
        module: 'Component Mastery', order: 11, estimatedTime: 19,
        content: `Use .map() to turn data arrays into JSX. Give each element a unique key.

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

Key rules:
✅ Use stable IDs from your data
❌ Avoid array index as key (breaks on insert/delete)
❌ Never use Math.random()

Keys only need to be unique among siblings.`,
        resources: [
            { title: 'Rendering Lists', url: 'https://react.dev/learn/rendering-lists', type: 'documentation' },
            { title: 'Keys in Lists', url: 'https://react.dev/learn/rendering-lists', type: 'tutorial' },
            { title: 'Reconciliation', url: 'https://react.dev/learn/preserving-and-resetting-state', type: 'article' },
        ],
        keyPoints: ['map()', 'Keys', 'Stable IDs', 'Sibling uniqueness', 'Reconciliation'],
    },

    // ══ MODULE 4: State & Props (3 lessons) ══
    {
        title: 'Managing State with useState',
        description: 'Add reactive state to functional components',
        module: 'State & Props', order: 12, estimatedTime: 20,
        content: `useState returns [currentValue, setter]. React re-renders when you call the setter.

const [count, setCount] = useState(0);

Rules:
❌ Never mutate: count++
✅ Call setter: setCount(count + 1)
✅ Functional update: setCount(c => c + 1)
✅ Object state — always spread: setUser({ ...user, name: 'Alice' })

State updates are batched — React 18 batches even async updates.`,
        resources: [
            { title: 'useState Reference', url: 'https://react.dev/reference/react/useState', type: 'documentation' },
            { title: "State: A Component's Memory", url: 'https://react.dev/learn/state-a-components-memory', type: 'tutorial' },
            { title: 'Updating Objects in State', url: 'https://react.dev/learn/updating-objects-in-state', type: 'article' },
        ],
        keyPoints: ['useState', 'Functional updates', 'Immutability', 'Batching', 'Object state'],
    },
    {
        title: 'Handling Events',
        description: 'React event handlers, synthetic events and forms',
        module: 'State & Props', order: 13, estimatedTime: 17,
        content: `React events use camelCase. Pass a function reference, not a call.

✅ onClick={handleClick}
❌ onClick={handleClick()}   ← fires immediately on render
✅ onClick={() => handleItem(id)}  ← with args

Common events: onClick, onChange, onSubmit, onFocus, onBlur, onKeyDown

Controlled input:
const [val, setVal] = useState('');
<input value={val} onChange={e => setVal(e.target.value)} />

Form submit:
<form onSubmit={e => { e.preventDefault(); submitData(val); }}>`,
        resources: [
            { title: 'Responding to Events', url: 'https://react.dev/learn/responding-to-events', type: 'documentation' },
            { title: 'Event Handlers', url: 'https://react.dev/learn/responding-to-events', type: 'tutorial' },
            { title: 'SyntheticEvent', url: 'https://react.dev/reference/react-dom/components/common', type: 'documentation' },
        ],
        keyPoints: ['Event handler syntax', 'onClick', 'onChange', 'preventDefault', 'Controlled inputs'],
    },
    {
        title: 'Lifting State Up',
        description: 'Share state between siblings via a common parent',
        module: 'State & Props', order: 14, estimatedTime: 18,
        content: `When two sibling components need the same data, move state to their nearest common parent.

function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <InputChild value={value} onChange={setValue} />
      <DisplayChild value={value} />
    </>
  );
}

Steps:
1. Remove local state from both siblings
2. Add it to the parent
3. Pass value down as prop
4. Pass setter as a callback prop to the child that changes it`,
        resources: [
            { title: 'Sharing State', url: 'https://react.dev/learn/sharing-state-between-components', type: 'documentation' },
            { title: 'Thinking in React', url: 'https://react.dev/learn/thinking-in-react', type: 'tutorial' },
            { title: 'Data Flow', url: 'https://react.dev/learn/thinking-in-react', type: 'documentation' },
        ],
        keyPoints: ['Lifting state', 'Shared state', 'Callback props', 'Single source of truth', 'Data flow'],
    },

    // ══ MODULE 5: Advanced Hooks (4 lessons) ══
    {
        title: 'useEffect: Side Effects',
        description: 'Run code after render and sync with external systems',
        module: 'Advanced Hooks', order: 15, estimatedTime: 22,
        content: `useEffect(setup, deps) runs setup after every render where deps changed.

Modes:
[]       → once on mount
[a, b]  → when a or b changes
(none)  → after every render (usually wrong)

Data fetch example:
useEffect(() => {
  const ctrl = new AbortController();
  fetch('/api/data', { signal: ctrl.signal })
    .then(r => r.json()).then(setData);
  return () => ctrl.abort();  // cleanup
}, []);`,
        resources: [
            { title: 'useEffect Reference', url: 'https://react.dev/reference/react/useEffect', type: 'documentation' },
            { title: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'tutorial' },
            { title: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect', type: 'article' },
        ],
        keyPoints: ['useEffect syntax', 'Dependency array', 'Cleanup function', 'Data fetching', 'Mount vs update'],
    },
    {
        title: 'useContext: Avoid Prop Drilling',
        description: 'Broadcast shared data to any component in the tree',
        module: 'Advanced Hooks', order: 16, estimatedTime: 20,
        content: `Context lets you skip passing props through every level.

// 1. Create
const ThemeContext = createContext('light');

// 2. Provide
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// 3. Consume anywhere inside the tree
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}

Best for: theme, auth, locale. Not for frequently-changing data — every consumer re-renders on context change.`,
        resources: [
            { title: 'useContext Reference', url: 'https://react.dev/reference/react/useContext', type: 'documentation' },
            { title: 'Passing Data Deeply', url: 'https://react.dev/learn/passing-data-deeply-with-context', type: 'tutorial' },
            { title: 'Context Patterns', url: 'https://react.dev/learn/passing-data-deeply-with-context', type: 'article' },
        ],
        keyPoints: ['createContext', 'Provider', 'useContext', 'Prop drilling solution', 'Context performance'],
    },
    {
        title: 'useReducer: Complex State',
        description: 'Centralise complex state transitions with a reducer',
        module: 'Advanced Hooks', order: 17, estimatedTime: 21,
        content: `useReducer is better than useState when state has multiple related values or complex update logic.

function reducer(state, action) {
  switch (action.type) {
    case 'inc': return { count: state.count + 1 };
    case 'dec': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: return state;
  }
}
const [state, dispatch] = useReducer(reducer, { count: 0 });
dispatch({ type: 'inc' });

Benefits: logic lives in one place, easy to test, dispatch is stable.`,
        resources: [
            { title: 'useReducer Reference', url: 'https://react.dev/reference/react/useReducer', type: 'documentation' },
            { title: 'Extracting State Logic', url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer', type: 'tutorial' },
            { title: 'useReducer vs useState', url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer', type: 'documentation' },
        ],
        keyPoints: ['useReducer', 'Reducer function', 'dispatch', 'Actions', 'Centralized logic'],
    },
    {
        title: 'Custom Hooks',
        description: 'Extract reusable stateful logic into custom hooks',
        module: 'Advanced Hooks', order: 18, estimatedTime: 19,
        content: `Custom hooks are functions starting with "use" that call other hooks.

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url).then(r => r.json()).then(setData).catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
}

// Drop-in usage
const { data, loading } = useFetch('/api/users');

Popular patterns: useFetch, useDebounce, useLocalStorage, useClickOutside, usePrevious.`,
        resources: [
            { title: 'Custom Hooks Guide', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', type: 'documentation' },
            { title: 'useHooks Library', url: 'https://usehooks.com/', type: 'documentation' },
            { title: 'Hook Patterns', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', type: 'tutorial' },
        ],
        keyPoints: ['Custom hook naming', 'Logic extraction', 'Composing hooks', 'useFetch pattern', 'Return API design'],
    },

    // ══ MODULE 6: Styling & Performance (2 lessons) ══
    {
        title: 'Styling in React',
        description: 'Inline styles, CSS Modules, Tailwind and CSS-in-JS',
        module: 'Styling & Performance', order: 19, estimatedTime: 18,
        content: `Four approaches:

1. Inline styles (JS object, camelCase):
<div style={{ backgroundColor: 'blue', fontSize: 16 }}>

2. CSS Modules (scoped, no collisions):
import s from './Card.module.css';
<div className={s.card}>

3. Tailwind CSS (utility classes, zero config):
<button className="bg-blue-500 text-white px-4 py-2 rounded">

4. CSS-in-JS (styled-components / Emotion):
const Btn = styled.button\`background: blue;\`;

Pick one per project. Tailwind + CSS Modules is a popular combo.`,
        resources: [
            { title: 'Adding Stylesheets', url: 'https://react.dev/learn/adding-a-stylesheet', type: 'documentation' },
            { title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs', type: 'documentation' },
            { title: 'CSS Modules', url: 'https://github.com/css-modules/css-modules', type: 'documentation' },
        ],
        keyPoints: ['Inline styles', 'CSS Modules', 'Tailwind CSS', 'CSS-in-JS', 'Dynamic classes'],
    },
    {
        title: 'Performance Optimization',
        description: 'React.memo, useMemo, useCallback and code splitting',
        module: 'Styling & Performance', order: 20, estimatedTime: 20,
        content: `Optimize only after profiling with React DevTools Profiler.

React.memo — skip re-render if props unchanged:
const List = React.memo(({ items }) => <ul>...</ul>);

useMemo — memoize expensive calculation:
const sorted = useMemo(() => [...items].sort(...), [items]);

useCallback — stable function ref for memoized children:
const onSelect = useCallback((id) => setSelected(id), []);

Code splitting — load routes on demand:
const Dashboard = lazy(() => import('./Dashboard'));
<Suspense fallback={<Spinner />}><Dashboard /></Suspense>`,
        resources: [
            { title: 'React.memo', url: 'https://react.dev/reference/react/memo', type: 'documentation' },
            { title: 'useMemo', url: 'https://react.dev/reference/react/useMemo', type: 'documentation' },
            { title: 'React.lazy', url: 'https://react.dev/reference/react/lazy', type: 'documentation' },
        ],
        keyPoints: ['React.memo', 'useMemo', 'useCallback', 'Code splitting', 'React Profiler'],
    },

    // ══ MODULE 7: Event Handling (3 lessons) ══
    {
        title: 'React Event System',
        description: "How React's synthetic event system works under the hood",
        module: 'Event Handling', order: 21, estimatedTime: 15,
        content: `React wraps native DOM events in SyntheticEvents for cross-browser consistency. All events are attached to the root via event delegation rather than each element.

e.stopPropagation() — stops event bubbling up
e.preventDefault()  — cancels default browser action (e.g. form submit, link follow)

Event phases: capture (down) → target → bubble (up)
React handles the bubble phase by default. Use onClickCapture for capture phase.`,
        resources: [
            { title: 'React Events', url: 'https://react.dev/learn/responding-to-events', type: 'documentation' },
            { title: 'SyntheticEvent', url: 'https://react.dev/reference/react-dom/components/common', type: 'documentation' },
            { title: 'Event Bubbling', url: 'https://javascript.info/bubbling-and-capturing', type: 'article' },
        ],
        keyPoints: ['SyntheticEvent', 'Event delegation', 'stopPropagation', 'preventDefault', 'Capture phase'],
    },
    {
        title: 'Mouse & Keyboard Events',
        description: 'Handle clicks, hovers and keyboard shortcuts',
        module: 'Event Handling', order: 22, estimatedTime: 16,
        content: `Mouse events: onClick, onDoubleClick, onMouseEnter, onMouseLeave, onMouseMove, onContextMenu

Keyboard events: onKeyDown, onKeyUp (use these; onKeyPress is deprecated)

Global keyboard shortcut:
useEffect(() => {
  const handler = (e) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) openSearch();
  };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);

Always support keyboard for anything interactive — it's a basic accessibility requirement.`,
        resources: [
            { title: 'Mouse Events', url: 'https://react.dev/reference/react-dom/components/common', type: 'documentation' },
            { title: 'KeyboardEvent MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent', type: 'documentation' },
            { title: 'WAI-ARIA Patterns', url: 'https://www.w3.org/WAI/ARIA/apg/', type: 'article' },
        ],
        keyPoints: ['onClick', 'onKeyDown', 'Mouse events', 'Global listeners', 'Keyboard accessibility'],
    },
    {
        title: 'Controlled Forms',
        description: 'Controlled inputs, onChange patterns and form submission',
        module: 'Event Handling', order: 23, estimatedTime: 18,
        content: `Controlled inputs keep their value in React state — React is always the single source of truth.

function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const update = field => e => setForm({ ...form, [field]: e.target.value });

  return (
    <form onSubmit={e => { e.preventDefault(); login(form); }}>
      <input value={form.email}    onChange={update('email')} />
      <input value={form.password} onChange={update('password')} type="password" />
      <button type="submit">Login</button>
    </form>
  );
}

Uncontrolled alternative: useRef + read value on submit. Simpler but less reactive.`,
        resources: [
            { title: 'Controlled Components', url: 'https://react.dev/learn/sharing-state-between-components', type: 'tutorial' },
            { title: 'Forms in React', url: 'https://react.dev/learn/responding-to-events', type: 'documentation' },
            { title: 'useRef for inputs', url: 'https://react.dev/reference/react/useRef', type: 'documentation' },
        ],
        keyPoints: ['Controlled inputs', 'onChange pattern', 'onSubmit', 'Uncontrolled inputs', 'Form state object'],
    },

    // ══ MODULE 8: Conditional Rendering (3 lessons) ══
    {
        title: 'If/Else and Ternary Patterns',
        description: 'Clean patterns for rendering components conditionally',
        module: 'Conditional Rendering', order: 24, estimatedTime: 14,
        content: `Three patterns in order of readability:

// Variable (most readable for complex conditions)
let content = <Login />;
if (isLoggedIn) content = <Dashboard />;
return <main>{content}</main>;

// Ternary (inline, single condition)
return isLoggedIn ? <Dashboard /> : <Login />;

// Logical && (show or nothing)
{unreadCount > 0 && <Badge count={unreadCount} />}

Rule: if your ternary needs nesting, extract a function instead.`,
        resources: [
            { title: 'Conditional Rendering', url: 'https://react.dev/learn/conditional-rendering', type: 'documentation' },
            { title: 'Ternary Patterns', url: 'https://react.dev/learn/conditional-rendering', type: 'tutorial' },
        ],
        keyPoints: ['if/else', 'Ternary', 'Logical &&', 'Extract to variable', 'Avoid nested ternaries'],
    },
    {
        title: 'Loading & Error States',
        description: 'Handle async states: loading, error and success',
        module: 'Conditional Rendering', order: 25, estimatedTime: 16,
        content: `Every data-fetching component needs three states:

function UserProfile({ id }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/users/' + id).then(r => r.json())
      .then(setUser).catch(setError)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (error)   return <ErrorMessage error={error} />;
  return <div>{user.name}</div>;
}

React 18: wrap lazy-loaded components in <Suspense fallback={<Spinner />}>.`,
        resources: [
            { title: 'Suspense', url: 'https://react.dev/reference/react/Suspense', type: 'documentation' },
            { title: 'Error Boundaries', url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary', type: 'documentation' },
        ],
        keyPoints: ['Loading state', 'Error state', 'Suspense', 'Error boundaries', 'Graceful fallbacks'],
    },
    {
        title: 'Role-Based Rendering',
        description: 'Show UI based on user roles and permissions',
        module: 'Conditional Rendering', order: 26, estimatedTime: 15,
        content: `Guard routes and UI elements by role:

function RequireAuth({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Forbidden />;
  return children;
}

<Route path="/admin" element={
  <RequireAuth role="admin"><AdminDashboard /></RequireAuth>
} />

UI-level guard (cosmetic only — always enforce on server too):
{user.role === 'admin' && <DeleteButton />}`,
        resources: [
            { title: 'React Router Auth', url: 'https://reactrouter.com/en/main/start/examples', type: 'tutorial' },
            { title: 'Navigate Component', url: 'https://reactrouter.com/en/main/components/navigate', type: 'documentation' },
        ],
        keyPoints: ['RequireAuth', 'Navigate', 'Role checks', 'Protected routes', 'Server-side enforcement'],
    },

    // ══ MODULE 9: Lists & Keys (3 lessons) ══
    {
        title: 'Rendering Lists with map()',
        description: 'Transform data arrays into JSX lists',
        module: 'Lists & Keys', order: 27, estimatedTime: 16,
        content: `Use .map() to turn data arrays into JSX elements:

function ProductList({ products }) {
  return NextResponse.json({
  products: products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price
  }))
}); 
}

For complex items extract a component:
{products.map(p => <ProductCard key={p.id} product={p} />)}`,
        resources: [
            { title: 'Rendering Lists', url: 'https://react.dev/learn/rendering-lists', type: 'documentation' },
            { title: 'Array map() MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', type: 'documentation' },
        ],
        keyPoints: ['map() in JSX', 'Extracting list items', 'Nested lists', 'Dynamic rendering', 'Component per item'],
    },
    {
        title: 'Keys and Reconciliation',
        description: 'Why keys matter for React diff algorithm',
        module: 'Lists & Keys', order: 28, estimatedTime: 17,
        content: `Keys tell React which item corresponds to which DOM node across renders.

Good: <li key={item.id}>     ← stable DB/UUID
Bad:  <li key={index}>       ← shifts on insert/delete
Bad:  <li key={Math.random()}> ← new every render

Without correct keys React may:
- Lose input focus mid-typing
- Show wrong animations
- Re-render unnecessarily

Keys are only scoped to siblings — no need to be globally unique.`,
        resources: [
            { title: 'Keys in Lists', url: 'https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key', type: 'documentation' },
            { title: 'Reconciliation', url: 'https://react.dev/learn/preserving-and-resetting-state', type: 'article' },
        ],
        keyPoints: ['Key purpose', 'Stable IDs', 'Avoid index keys', 'DOM reconciliation', 'Key scope'],
    },
    {
        title: 'Filtering & Sorting Lists',
        description: 'Chain filter, sort and map for dynamic list views',
        module: 'Lists & Keys', order: 29, estimatedTime: 16,
        content: `Chain array methods before .map() to produce filtered/sorted output:

function ProductList({ products, category, sortBy }) {
  const displayed = products
    .filter(p => category === 'all' || p.category === category)
    .sort((a, b) => sortBy === 'price'
      ? a.price - b.price
      : a.name.localeCompare(b.name));

  return <ul>{displayed.map(p => <ProductCard key={p.id} product={p} />)}</ul>;
}

If the list is large and re-renders often, wrap in useMemo.`,
        resources: [
            { title: 'Array filter()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter', type: 'documentation' },
            { title: 'Array sort()', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort', type: 'documentation' },
        ],
        keyPoints: ['filter()', 'sort()', 'Method chaining', 'Search filtering', 'useMemo for lists'],
    },

    // ══ MODULE 10: useEffect (4 lessons) ══
    {
        title: 'useEffect Basics',
        description: 'Syntax, dependency array and timing',
        module: 'useEffect', order: 30, estimatedTime: 20,
        content: `useEffect(setup, deps) runs after the browser paints the screen.

Modes:
No array   → runs after every render
[]         → runs once after first render (mount)
[a, b]     → runs when a or b changes

Execution order:
1. Component renders → 2. DOM updates → 3. useEffect fires

useEffect(() => {
  document.title = 'Count: ' + count;
}, [count]);`,
        resources: [
            { title: 'useEffect Reference', url: 'https://react.dev/reference/react/useEffect', type: 'documentation' },
            { title: 'Synchronizing with Effects', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'tutorial' },
        ],
        keyPoints: ['useEffect syntax', 'Dependency array', 'Mount effect', 'Effect timing', 'DOM side effects'],
    },
    {
        title: 'Fetching Data with useEffect',
        description: 'Safe data fetching with cleanup and AbortController',
        module: 'useEffect', order: 31, estimatedTime: 22,
        content: `Always cancel in-flight requests on cleanup to avoid setting state on unmounted components.

useEffect(() => {
  const controller = new AbortController();

  fetch('/api/users', { signal: controller.signal })
    .then(r => r.json())
    .then(setUsers)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err);
    })
    .finally(() => setLoading(false));

  return () => controller.abort();
}, []);`,
        resources: [
            { title: 'Data Fetching in Effects', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'documentation' },
            { title: 'AbortController MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController', type: 'documentation' },
        ],
        keyPoints: ['Data fetching', 'AbortController', 'Cleanup', 'Race conditions', 'Loading/error state'],
    },
    {
        title: 'Effect Cleanup & Subscriptions',
        description: 'Clean up timers, listeners and WebSockets',
        module: 'useEffect', order: 32, estimatedTime: 18,
        content: `Return a cleanup function to prevent memory leaks.

// Interval
useEffect(() => {
  const id = setInterval(() => setTime(Date.now()), 1000);
  return () => clearInterval(id);
}, []);

// Global event listener
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// WebSocket
useEffect(() => {
  const ws = new WebSocket(url);
  ws.onmessage = e => setMessages(m => [...m, e.data]);
  return () => ws.close();
}, [url]);`,
        resources: [
            { title: 'Effect Cleanup', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'documentation' },
            { title: 'setInterval in React', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'tutorial' },
        ],
        keyPoints: ['Cleanup function', 'clearInterval', 'removeEventListener', 'WebSocket cleanup', 'Memory leaks'],
    },
    {
        title: 'useEffect Anti-patterns',
        description: 'Stale closures, infinite loops and when NOT to use effects',
        module: 'useEffect', order: 33, estimatedTime: 18,
        content: `Common mistakes:

1. Stale closure:
// ❌ count never updates inside effect
useEffect(() => { setCount(count + 1); }, []);
// ✅ functional update
useEffect(() => { setCount(c => c + 1); }, []);

2. Infinite loop:
// ❌ options is a new object every render
useEffect(() => { fetch(options); }, [options]);
// ✅ use primitive deps or useMemo

3. Deriving state via effects:
// ❌ useEffect to sync state from state
// ✅ compute inline: const doubled = count * 2;

Read "You Might Not Need an Effect" in the React docs.`,
        resources: [
            { title: 'You Might Not Need an Effect', url: 'https://react.dev/learn/you-might-not-need-an-effect', type: 'documentation' },
            { title: 'Stale Closures', url: 'https://react.dev/learn/synchronizing-with-effects', type: 'article' },
        ],
        keyPoints: ['Stale closures', 'Infinite loops', 'Derived state', 'Missing deps', 'Effect alternatives'],
    },

    // ══ MODULE 11: Routing (4 lessons) ══
    {
        title: 'React Router v6 Setup',
        description: 'Install and configure React Router with nested routes',
        module: 'Routing', order: 34, estimatedTime: 16,
        content: `npm install react-router-dom

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<Home />} />
        <Route path="/about"   element={<About />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="*"        element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}`,
        resources: [
            { title: 'React Router Docs', url: 'https://reactrouter.com/en/main', type: 'documentation' },
            { title: 'Getting Started', url: 'https://reactrouter.com/en/main/start/tutorial', type: 'tutorial' },
        ],
        keyPoints: ['BrowserRouter', 'Routes & Route', 'Path params', '404 route', 'Nested routes'],
    },
    {
        title: 'Navigation & Links',
        description: 'Link, NavLink and programmatic navigation with useNavigate',
        module: 'Routing', order: 35, estimatedTime: 16,
        content: `<Link to="/about">About</Link>     // no page reload

<NavLink to="/home"
  className={({ isActive }) => isActive ? 'active' : ''}>
  Home
</NavLink>

// Programmatic
const navigate = useNavigate();
navigate('/dashboard');        // go forward
navigate(-1);                  // go back
navigate('/login', { replace: true }); // replace history entry`,
        resources: [
            { title: 'Link Component', url: 'https://reactrouter.com/en/main/components/link', type: 'documentation' },
            { title: 'useNavigate', url: 'https://reactrouter.com/en/main/hooks/use-navigate', type: 'documentation' },
            { title: 'NavLink', url: 'https://reactrouter.com/en/main/components/nav-link', type: 'tutorial' },
        ],
        keyPoints: ['Link', 'NavLink', 'useNavigate', 'Active styles', 'History replace'],
    },
    {
        title: 'Route Params & Query Strings',
        description: 'Read URL segments and search params in components',
        module: 'Routing', order: 36, estimatedTime: 17,
        content: `import { useParams, useSearchParams } from 'react-router-dom';

// Route: /user/:id
function UserPage() {
  const { id } = useParams();                       // /user/42 → '42'
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') ?? 'profile';       // ?tab=settings

  return <div>User {id} — {tab}</div>;
}

// Update query string without navigate
setParams({ tab: 'settings', page: '2' });`,
        resources: [
            { title: 'useParams', url: 'https://reactrouter.com/en/main/hooks/use-params', type: 'documentation' },
            { title: 'useSearchParams', url: 'https://reactrouter.com/en/main/hooks/use-search-params', type: 'documentation' },
        ],
        keyPoints: ['useParams', 'useSearchParams', 'Dynamic segments', 'Query strings', 'URL state'],
    },
    {
        title: 'Protected Routes',
        description: 'Redirect unauthenticated users from private pages',
        module: 'Routing', order: 37, estimatedTime: 18,
        content: `function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

// Usage
<Route path="/dashboard"
  element={<RequireAuth><Dashboard /></RequireAuth>}
/>

// After login — redirect back
const { state } = useLocation();
navigate(state?.from?.pathname ?? '/dashboard');`,
        resources: [
            { title: 'Auth Example', url: 'https://reactrouter.com/en/main/start/examples', type: 'tutorial' },
            { title: 'Navigate', url: 'https://reactrouter.com/en/main/components/navigate', type: 'documentation' },
            { title: 'useLocation', url: 'https://reactrouter.com/en/main/hooks/use-location', type: 'documentation' },
        ],
        keyPoints: ['RequireAuth', 'Navigate', 'useLocation', 'Redirect after login', 'Auth flow'],
    },

    // ══ MODULE 12: Forms & Validation (5 lessons) ══
    {
        title: 'Controlled Forms',
        description: 'Fully controlled multi-field forms',
        module: 'Forms & Validation', order: 38, estimatedTime: 18,
        content: `function SignupForm() {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={e => { e.preventDefault(); submit(form); }}>
      <input name="name"  value={form.name}  onChange={handleChange} />
      <input name="email" value={form.email} onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
}`,
        resources: [
            { title: 'Controlled Components', url: 'https://react.dev/learn/sharing-state-between-components', type: 'tutorial' },
            { title: 'Forms in React', url: 'https://react.dev/learn/responding-to-events', type: 'documentation' },
        ],
        keyPoints: ['Controlled inputs', 'handleChange pattern', 'Computed property name', 'onSubmit', 'Form state object'],
    },
    {
        title: 'Manual Form Validation',
        description: 'Validate on submit and show inline error messages',
        module: 'Forms & Validation', order: 39, estimatedTime: 20,
        content: `const [errors, setErrors] = useState({});

function validate(form) {
  const errs = {};
  if (!form.email.includes('@')) errs.email = 'Invalid email';
  if (form.password.length < 8)  errs.password = 'Min 8 characters';
  return errs;
}

const handleSubmit = e => {
  e.preventDefault();
  const errs = validate(form);
  if (Object.keys(errs).length) { setErrors(errs); return; }
  submitForm(form);
};

// In JSX
{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}`,
        resources: [
            { title: 'Form Validation', url: 'https://react.dev/learn/responding-to-events', type: 'documentation' },
            { title: 'HTML5 Validation', url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation', type: 'documentation' },
        ],
        keyPoints: ['Validate on submit', 'Error state', 'Inline messages', 'onBlur validation', 'Accessibility'],
    },
    {
        title: 'React Hook Form',
        description: 'Performant form management with React Hook Form',
        module: 'Forms & Validation', order: 40, estimatedTime: 20,
        content: `React Hook Form (RHF) uses uncontrolled inputs via refs — fewer re-renders, less boilerplate.

import { useForm } from 'react-hook-form';

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', {
        required: 'Email is required',
        pattern: { value: /\S+@\S+/, message: 'Invalid email' },
      })} />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}`,
        resources: [
            { title: 'React Hook Form Docs', url: 'https://react-hook-form.com/', type: 'documentation' },
            { title: 'Getting Started', url: 'https://react-hook-form.com/get-started', type: 'tutorial' },
        ],
        keyPoints: ['register', 'handleSubmit', 'formState.errors', 'Validation rules', 'watch & setValue'],
    },
    {
        title: 'Zod Schema Validation',
        description: 'Type-safe validation with Zod + React Hook Form',
        module: 'Forms & Validation', order: 41, estimatedTime: 18,
        content: `Zod defines a schema that works for both runtime validation and TypeScript types.

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  email:    z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
  age:      z.number().min(18, 'Must be 18+'),
});

type FormData = z.infer<typeof schema>;  // free TypeScript type

const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});`,
        resources: [
            { title: 'Zod Docs', url: 'https://zod.dev', type: 'documentation' },
            { title: 'RHF Resolvers', url: 'https://react-hook-form.com/docs/useform#resolver', type: 'documentation' },
        ],
        keyPoints: ['Zod schema', 'zodResolver', 'Type inference', 'Schema composition', 'Error messages'],
    },
    {
        title: 'Multi-step Forms',
        description: 'Wizard-style forms that collect data across steps',
        module: 'Forms & Validation', order: 42, estimatedTime: 22,
        content: `const STEPS = ['Personal', 'Address', 'Payment'];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});

  const next = stepData => {
    setData(prev => ({ ...prev, ...stepData }));
    setStep(s => s + 1);
  };

  const views = [
    <PersonalStep onNext={next} />,
    <AddressStep  onNext={next} />,
    <PaymentStep  onNext={next} data={data} />,
  ];

  return (
    <>
      <ProgressBar step={step} total={STEPS.length} />
      {views[step]}
    </>
  );
}`,
        resources: [
            { title: 'Multi-step Pattern', url: 'https://react.dev/learn', type: 'tutorial' },
            { title: 'Wizard UX', url: 'https://www.nngroup.com/articles/wizard-design-pattern/', type: 'article' },
        ],
        keyPoints: ['Step state', 'Data accumulation', 'Progress bar', 'Per-step validation', 'Back/forward'],
    },

    // ══ MODULE 13: State Management (6 lessons) ══
    {
        title: 'Context API Deep Dive',
        description: 'Build a full auth context with provider and custom hook',
        module: 'State Management', order: 43, estimatedTime: 22,
        content: `const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const login  = async creds => setUser(await api.login(creds));
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}

// App.tsx
<AuthProvider><App /></AuthProvider>`,
        resources: [
            { title: 'Context API', url: 'https://react.dev/reference/react/createContext', type: 'documentation' },
            { title: 'Passing Data Deeply', url: 'https://react.dev/learn/passing-data-deeply-with-context', type: 'tutorial' },
        ],
        keyPoints: ['createContext', 'Custom provider', 'useContext', 'Auth pattern', 'Context splitting'],
    },
    {
        title: 'Zustand: Simple Global State',
        description: 'Lightweight global state without boilerplate',
        module: 'State Management', order: 44, estimatedTime: 20,
        content: `import { create } from 'zustand';

const useCartStore = create((set, get) => ({
  items: [],
  addItem:    item => set(s => ({ items: [...s.items, item] })),
  removeItem: id   => set(s => ({ items: s.items.filter(i => i.id !== id) })),
  total:      ()   => get().items.reduce((sum, i) => sum + i.price, 0),
}));

// In any component — no Provider needed
const { items, addItem } = useCartStore();

// Select slice to avoid unnecessary re-renders
const total = useCartStore(s => s.total());`,
        resources: [
            { title: 'Zustand Docs', url: 'https://zustand-demo.pmnd.rs/', type: 'documentation' },
            { title: 'Zustand GitHub', url: 'https://github.com/pmndrs/zustand', type: 'tutorial' },
        ],
        keyPoints: ['create store', 'set & get', 'Selectors', 'Middleware', 'No Provider needed'],
    },
    {
        title: 'Redux Toolkit Basics',
        description: 'Official Redux with zero boilerplate via RTK',
        module: 'State Management', order: 45, estimatedTime: 25,
        content: `import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value++ },       // Immer handles immutability
    decrement: state => { state.value-- },
    addAmount: (state, action) => { state.value += action.payload },
  },
});

export const { increment, decrement, addAmount } = counterSlice.actions;
const store = configureStore({ reducer: { counter: counterSlice.reducer } });

// Component
const count    = useSelector(s => s.counter.value);
const dispatch = useDispatch();
dispatch(increment());`,
        resources: [
            { title: 'Redux Toolkit Docs', url: 'https://redux-toolkit.js.org/', type: 'documentation' },
            { title: 'RTK Quick Start', url: 'https://redux-toolkit.js.org/tutorials/quick-start', type: 'tutorial' },
        ],
        keyPoints: ['createSlice', 'configureStore', 'useSelector', 'useDispatch', 'Immer'],
    },
    {
        title: 'RTK Query: Server State',
        description: 'Automatic data fetching and caching with RTK Query',
        module: 'State Management', order: 46, estimatedTime: 22,
        content: `import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getUsers: builder.query({ query: () => '/users', providesTags: ['User'] }),
    addUser:  builder.mutation({
      query: user => ({ url: '/users', method: 'POST', body: user }),
      invalidatesTags: ['User'],
    }),
  }),
});

const { data, isLoading } = useGetUsersQuery();
const [addUser] = useAddUserMutation();`,
        resources: [
            { title: 'RTK Query Overview', url: 'https://redux-toolkit.js.org/rtk-query/overview', type: 'documentation' },
            { title: 'RTK Query Tutorial', url: 'https://redux-toolkit.js.org/tutorials/rtk-query', type: 'tutorial' },
        ],
        keyPoints: ['createApi', 'query endpoints', 'mutation endpoints', 'Tag invalidation', 'Auto-caching'],
    },
    {
        title: 'Jotai: Atomic State',
        description: 'Granular state with composable atoms',
        module: 'State Management', order: 47, estimatedTime: 18,
        content: `import { atom, useAtom } from 'jotai';

const countAtom   = atom(0);
const doubleAtom  = atom(get => get(countAtom) * 2);  // derived, no extra state

function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [double]          = useAtom(doubleAtom);
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      {count} (doubled: {double})
    </div>
  );
}

No Provider for basic use. Atoms are garbage-collected when consumers unmount.`,
        resources: [
            { title: 'Jotai Docs', url: 'https://jotai.org/', type: 'documentation' },
            { title: 'Derived Atoms', url: 'https://jotai.org/docs/guides/derived-atoms', type: 'tutorial' },
        ],
        keyPoints: ['atom()', 'useAtom', 'Derived atoms', 'Async atoms', 'Atom families'],
    },
    {
        title: 'Choosing the Right State Solution',
        description: 'Match state type to the right tool',
        module: 'State Management', order: 48, estimatedTime: 16,
        content: `Four categories of state:

1. Local UI state → useState / useReducer
   (modal open, active tab, form inputs)

2. Shared client state → Zustand / Jotai / Context
   (auth user, theme, cart)

3. Server / async state → TanStack Query / RTK Query / SWR
   (API data, pagination, mutations)

4. URL state → React Router / useSearchParams
   (filters, sort, current page)

Rule: keep state as local as possible. Only reach for a global store when the same state is needed by unrelated parts of the tree.`,
        resources: [
            { title: 'Thinking in React', url: 'https://react.dev/learn/thinking-in-react', type: 'documentation' },
            { title: 'Server vs Client State', url: 'https://tkdodo.eu/blog/practical-react-query', type: 'article' },
        ],
        keyPoints: ['Local state', 'Shared state', 'Server state', 'URL state', 'State colocation'],
    },

    // ══ MODULE 14: API Integration (5 lessons) ══
    {
        title: 'fetch & axios Basics',
        description: 'Make HTTP requests and handle responses',
        module: 'API Integration', order: 49, estimatedTime: 18,
        content: `fetch (built-in):
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
const json = await res.json();

axios (library — cleaner API):
const { data } = await axios.post('/api/users', payload);

Axios advantages:
- Automatically parses JSON
- Throws on 4xx/5xx (fetch doesn't)
- Request/response interceptors
- Timeout support built-in`,
        resources: [
            { title: 'Fetch API', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API', type: 'documentation' },
            { title: 'Axios Docs', url: 'https://axios-http.com/docs/intro', type: 'documentation' },
        ],
        keyPoints: ['fetch API', 'axios', 'HTTP methods', 'Request headers', 'Error handling'],
    },
    {
        title: 'TanStack Query',
        description: 'Server state with automatic caching and background refresh',
        module: 'API Integration', order: 50, estimatedTime: 22,
        content: `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
  if (isLoading) return <Spinner />;
  if (error)     return <Error />;
  return data.map(u => <UserCard key={u.id} user={u} />);
}

// Mutation + cache invalidation
const qc = useQueryClient();
const { mutate } = useMutation({
  mutationFn: user => axios.post('/api/users', user),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
});`,
        resources: [
            { title: 'TanStack Query', url: 'https://tanstack.com/query/latest', type: 'documentation' },
            { title: 'Quick Start', url: 'https://tanstack.com/query/latest/docs/framework/react/quick-start', type: 'tutorial' },
        ],
        keyPoints: ['useQuery', 'useMutation', 'queryKey', 'invalidateQueries', 'Stale-while-revalidate'],
    },
    {
        title: 'REST vs GraphQL',
        description: 'Compare REST and GraphQL for React data fetching',
        module: 'API Integration', order: 51, estimatedTime: 18,
        content: `REST: fixed endpoints, fixed shape.
GET /users/1 → returns all user fields (may over-fetch)

GraphQL: single endpoint, ask for exactly what you need.
query { user(id: 1) { name posts { title } } }

Apollo Client for React:
import { gql, useQuery } from '@apollo/client';
const GET_USER = gql\`query GetUser($id: ID!) { user(id: $id) { name email } }\`;

function Profile({ id }) {
  const { data, loading } = useQuery(GET_USER, { variables: { id } });
  return loading ? <Spinner /> : <div>{data.user.name}</div>;
}`,
        resources: [
            { title: 'GraphQL Intro', url: 'https://graphql.org/learn/', type: 'documentation' },
            { title: 'Apollo Client', url: 'https://www.apollographql.com/docs/react/', type: 'documentation' },
        ],
        keyPoints: ['REST', 'GraphQL', 'Apollo Client', 'useQuery', 'Over-fetching'],
    },
    {
        title: 'JWT Authentication',
        description: 'Login, token storage, and auth request interceptors',
        module: 'API Integration', order: 52, estimatedTime: 20,
        content: `Flow: login → receive JWT → attach to every API request.

// Store token (prefer httpOnly cookie over localStorage)
const { token } = await axios.post('/api/login', creds);
localStorage.setItem('token', token);

// Attach to all requests via interceptor
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

// Handle 401 globally
axios.interceptors.response.use(null, err => {
  if (err.response?.status === 401) navigate('/login');
  return Promise.reject(err);
});`,
        resources: [
            { title: 'JWT Introduction', url: 'https://jwt.io/introduction', type: 'documentation' },
            { title: 'Axios Interceptors', url: 'https://axios-http.com/docs/interceptors', type: 'documentation' },
        ],
        keyPoints: ['JWT', 'Axios interceptors', 'httpOnly cookies', 'Refresh tokens', '401 handling'],
    },
    {
        title: 'WebSockets & Real-time Data',
        description: 'Live updates with WebSockets and Socket.io',
        module: 'API Integration', order: 53, estimatedTime: 20,
        content: `WebSockets = full-duplex real-time channel.

function useSocket(url) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const ws = new WebSocket(url);
    ws.onmessage = e => setMessages(m => [...m, JSON.parse(e.data)]);
    return () => ws.close();
  }, [url]);
  return messages;
}

Socket.io (easier API):
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');
socket.on('message', msg => setMessages(m => [...m, msg]));
socket.emit('message', { text: 'Hello' });`,
        resources: [
            { title: 'WebSocket MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API', type: 'documentation' },
            { title: 'Socket.io React', url: 'https://socket.io/how-to/use-with-react', type: 'tutorial' },
        ],
        keyPoints: ['WebSocket', 'Socket.io', 'Real-time events', 'Connection lifecycle', 'Cleanup'],
    },

    // ══ MODULE 15: Performance (4 lessons) ══
    {
        title: 'React.memo & Preventing Re-renders',
        description: 'Skip re-renders when props have not changed',
        module: 'Performance', order: 54, estimatedTime: 18,
        content: `React.memo wraps a component and does a shallow prop comparison before re-rendering.

const List = React.memo(function({ items, onSelect }) {
  return <ul>{items.map(i => <li key={i.id} onClick={() => onSelect(i)}>{i.name}</li>)}</ul>;
});

Pitfall — passing a new function reference breaks memo:
❌ <List onSelect={item => handle(item)} />   // new fn every render
✅ const handle = useCallback(item => ..., []);
   <List onSelect={handle} />`,
        resources: [
            { title: 'React.memo', url: 'https://react.dev/reference/react/memo', type: 'documentation' },
            { title: 'React DevTools Profiler', url: 'https://react.dev/learn/react-developer-tools', type: 'documentation' },
        ],
        keyPoints: ['React.memo', 'Shallow comparison', 'Reference equality', 'useCallback pairing', 'Profiler'],
    },
    {
        title: 'useMemo & useCallback',
        description: 'Memoize values and functions for reference stability',
        module: 'Performance', order: 55, estimatedTime: 18,
        content: `useMemo caches a computed value. useCallback caches a function. Both recompute only when deps change.

// Expensive sort — only re-sorts when items changes
const sorted = useMemo(
  () => [...items].sort((a, b) => a.price - b.price),
  [items]
);

// Stable callback for memoized child or useEffect dep
const handleSearch = useCallback(query => {
  setResults(data.filter(d => d.name.includes(query)));
}, [data]);

When to add:
✅ Expensive calculation (>1ms) used in render
✅ Object/array reference passed to React.memo child
❌ Not everywhere — memoization itself has a cost`,
        resources: [
            { title: 'useMemo', url: 'https://react.dev/reference/react/useMemo', type: 'documentation' },
            { title: 'useCallback', url: 'https://react.dev/reference/react/useCallback', type: 'documentation' },
        ],
        keyPoints: ['useMemo', 'useCallback', 'Reference stability', 'Premature optimization', 'Profiling first'],
    },
    {
        title: 'Code Splitting & Lazy Loading',
        description: 'Load components on demand to reduce initial bundle',
        module: 'Performance', order: 56, estimatedTime: 18,
        content: `import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));
const AdminPanel = lazy(() => import('./AdminPanel'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin"     element={<AdminPanel />} />
      </Routes>
    </Suspense>
  );
}

Route-level splitting is the highest-impact target. Also split heavy libraries (chart, rich text editor, PDF viewer).`,
        resources: [
            { title: 'React.lazy', url: 'https://react.dev/reference/react/lazy', type: 'documentation' },
            { title: 'Suspense', url: 'https://react.dev/reference/react/Suspense', type: 'documentation' },
        ],
        keyPoints: ['React.lazy', 'dynamic import()', 'Suspense fallback', 'Route splitting', 'Bundle analysis'],
    },
    {
        title: 'Virtualizing Large Lists',
        description: 'Render only visible rows for huge data sets',
        module: 'Performance', order: 57, estimatedTime: 18,
        content: `Rendering 10,000 rows freezes the browser. Virtualization renders only what's on screen.

Using @tanstack/react-virtual:
import { useVirtualizer } from '@tanstack/react-virtual';

function BigList({ items }) {
  const parentRef = useRef(null);
  const virt = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virt.getTotalSize() }}>
        {virt.getVirtualItems().map(row => (
          <div key={row.key} style={{ transform: \`translateY(\${row.start}px)\` }}>
            {items[row.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}`,
        resources: [
            { title: 'TanStack Virtual', url: 'https://tanstack.com/virtual/latest', type: 'documentation' },
            { title: 'react-window', url: 'https://react-window.vercel.app/', type: 'documentation' },
        ],
        keyPoints: ['Virtualization', 'useVirtualizer', 'Windowing', 'DOM node count', 'Scroll performance'],
    },

    // ══ MODULE 16: Custom Hooks (3 lessons) ══
    {
        title: 'Building Custom Hooks',
        description: 'Extract and reuse stateful logic across components',
        module: 'Custom Hooks', order: 58, estimatedTime: 18,
        content: `function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// Usage — search input that waits for user to stop typing
const debouncedQuery = useDebounce(query, 400);
useEffect(() => { if (debouncedQuery) search(debouncedQuery); }, [debouncedQuery]);

Rules: function name must start with "use"; can call other hooks inside.`,
        resources: [
            { title: 'Custom Hooks', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', type: 'documentation' },
            { title: 'useHooks Collection', url: 'https://usehooks.com/', type: 'documentation' },
        ],
        keyPoints: ['Hook naming', 'Logic extraction', 'useDebounce', 'Composition', 'Return API'],
    },
    {
        title: 'useFetch & Data Hooks',
        description: 'Generic reusable data-fetching hook with abort support',
        module: 'Custom Hooks', order: 59, estimatedTime: 19,
        content: `function useFetch(url) {
  const [state, dispatch] = useReducer(
    (s, a) => ({ ...s, ...a }),
    { data: null, loading: true, error: null }
  );

  useEffect(() => {
    if (!url) return;
    dispatch({ loading: true, error: null });
    const ctrl = new AbortController();

    fetch(url, { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(data => dispatch({ data, loading: false }))
      .catch(err => { if (err.name !== 'AbortError') dispatch({ error: err.message, loading: false }); });

    return () => ctrl.abort();
  }, [url]);

  return state;
}`,
        resources: [
            { title: 'useFetch Pattern', url: 'https://react.dev/learn/reusing-logic-with-custom-hooks', type: 'documentation' },
            { title: 'AbortController', url: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortController', type: 'documentation' },
        ],
        keyPoints: ['useFetch', 'useReducer in hooks', 'AbortController', 'Generic URL hook', 'Error + loading'],
    },
    {
        title: 'useLocalStorage Hook',
        description: 'Persist state to localStorage transparently',
        module: 'Custom Hooks', order: 60, estimatedTime: 16,
        content: `function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setStored = newVal => {
    const val = newVal instanceof Function ? newVal(value) : newVal;
    setValue(val);
    window.localStorage.setItem(key, JSON.stringify(val));
  };

  return [value, setStored];
}

// Drops in as a useState replacement
const [theme, setTheme] = useLocalStorage('theme', 'dark');`,
        resources: [
            { title: 'localStorage MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage', type: 'documentation' },
            { title: 'useLocalStorage', url: 'https://usehooks.com/uselocalstorage', type: 'tutorial' },
        ],
        keyPoints: ['localStorage', 'Lazy initializer', 'JSON serialize', 'SSR safety', 'Functional updates'],
    },

    // ══ MODULE 17: Project Structure (3 lessons) ══
    {
        title: 'Folder Structure Best Practices',
        description: 'Scale your React codebase with feature-based structure',
        module: 'Project Structure', order: 61, estimatedTime: 16,
        content: `Small project — group by type:
src/components/  hooks/  pages/  services/  store/  utils/

Large project — group by feature (colocation):
src/features/
  auth/       components/  hooks/  authSlice.ts  authApi.ts
  products/   components/  hooks/  productSlice.ts
src/shared/   components/  hooks/  utils/

Rule: files that change together should live together.
Use barrel exports (index.ts) to keep imports clean.`,
        resources: [
            { title: 'React File Structure', url: 'https://react.dev/learn/thinking-in-react', type: 'documentation' },
            { title: 'Bulletproof React', url: 'https://github.com/alan2207/bulletproof-react', type: 'documentation' },
        ],
        keyPoints: ['Feature folders', 'Colocation', 'Barrel exports', 'Shared modules', 'Scalability'],
    },
    {
        title: 'TypeScript in React',
        description: 'Type components, props, hooks and events with TypeScript',
        module: 'Project Structure', order: 62, estimatedTime: 22,
        content: `interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick} className={variant}>{label}</button>;
}

// useState
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);

// Event handler
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);`,
        resources: [
            { title: 'TypeScript with React', url: 'https://react.dev/learn/typescript', type: 'documentation' },
            { title: 'React TS Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', type: 'documentation' },
        ],
        keyPoints: ['Interface for props', 'Generic hooks', 'Event types', 'Utility types', 'Strict mode'],
    },
    {
        title: 'Testing React Components',
        description: 'Unit and integration tests with Vitest & Testing Library',
        module: 'Project Structure', order: 63, estimatedTime: 22,
        content: `import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('Counter', () => {
  it('increments on click', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /increment/i }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});

Query priority: getByRole > getByLabelText > getByText > getByTestId
Mock HTTP with MSW (Mock Service Worker) — intercepts fetch/axios.`,
        resources: [
            { title: 'Testing Library', url: 'https://testing-library.com/docs/react-testing-library/intro/', type: 'documentation' },
            { title: 'Vitest', url: 'https://vitest.dev/', type: 'documentation' },
            { title: 'MSW', url: 'https://mswjs.io/', type: 'documentation' },
        ],
        keyPoints: ['render & screen', 'getByRole', 'fireEvent', 'userEvent', 'MSW mocking'],
    },

    // ══ MODULE 18: Deployment (3 lessons) ══
    {
        title: 'Building for Production',
        description: 'Optimize and audit your bundle before deploying',
        module: 'Deployment', order: 64, estimatedTime: 14,
        content: `Build command:
npm run build   (Vite / CRA)
next build      (Next.js)

What happens:
- JS + CSS minified
- Development warnings stripped
- Tree shaking removes unused exports
- Content-hashed filenames for CDN caching

Analyze bundle:
npx vite-bundle-visualizer

Checklist before deploy:
✅ Remove console.logs
✅ Set all environment variables
✅ Enable error monitoring (Sentry)
✅ Test production build locally: npm run preview`,
        resources: [
            { title: 'Vite Build', url: 'https://vitejs.dev/guide/build.html', type: 'documentation' },
            { title: 'Next.js Deployment', url: 'https://nextjs.org/docs/deployment', type: 'documentation' },
        ],
        keyPoints: ['npm run build', 'Minification', 'Tree shaking', 'Bundle analysis', 'Pre-deploy checklist'],
    },
    {
        title: 'Deploying to Vercel',
        description: 'Zero-config deployments with automatic preview URLs',
        module: 'Deployment', order: 65, estimatedTime: 14,
        content: `Vercel is the easiest host for React / Next.js.

Git integration (recommended):
1. Push repo to GitHub
2. Import at vercel.com → auto-deploys every push
3. Preview URL for every PR

CLI:
npm i -g vercel
vercel          # preview
vercel --prod   # production

Environment variables:
vercel env add MY_VAR production
(or add in dashboard → Project → Settings → Env Vars)`,
        resources: [
            { title: 'Vercel Docs', url: 'https://vercel.com/docs', type: 'documentation' },
            { title: 'Vercel CLI', url: 'https://vercel.com/docs/cli', type: 'documentation' },
        ],
        keyPoints: ['Git integration', 'Preview deployments', 'vercel CLI', 'Env vars', 'Custom domains'],
    },
    {
        title: 'Netlify, Railway & Docker',
        description: 'Deploy to Netlify, Railway and containerise with Docker',
        module: 'Deployment', order: 66, estimatedTime: 16,
        content: `Netlify (static + serverless):
- Connect GitHub → build cmd: npm run build, publish: dist
- Netlify Functions for backend endpoints

Railway / Render (full-stack):
- Connect repo, add env vars, automatic SSL
- Great for Node.js + React monorepos

Docker (self-hosted / CI):
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

CI/CD: GitHub Actions can build, test, and deploy on every push.`,
        resources: [
            { title: 'Netlify Docs', url: 'https://docs.netlify.com/', type: 'documentation' },
            { title: 'Railway Docs', url: 'https://docs.railway.app/', type: 'documentation' },
            { title: 'Docker React', url: 'https://docs.docker.com/guides/reactjs/', type: 'tutorial' },
        ],
        keyPoints: ['Netlify', 'Railway / Render', 'Docker multi-stage', 'nginx', 'GitHub Actions'],
    },
];


async function seed() {
    const client = new MongoClient(MONGODB_URI!);

    try {
        await client.connect();
        console.log('✅  Connected to MongoDB');

        const db = client.db('react-learning');
        const col = db.collection('lessons');

        // Drop existing lessons so the seed is idempotent
        const deleted = await col.deleteMany({});
        console.log(`🗑   Cleared ${deleted.deletedCount} existing lessons`);

        const result = await col.insertMany(LESSONS_DATA);
        console.log(`✅  Inserted ${result.insertedCount} lessons across 18 modules`);

        // Create indexes for fast queries
        await col.createIndex({ module: 1, order: 1 });
        await col.createIndex({ order: 1 });
        console.log('✅  Indexes created');

    } catch (err) {
        console.error('❌  Seed failed:', err);
        process.exit(1);
    } finally {
        await client.close();
        console.log('🔌  Connection closed');
    }
}

seed();