import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

const LESSONS_DATA = [
  {
    title: 'What is React?',
    description: 'Introduction to React and why it matters',
    module: 'React Fundamentals',
    order: 1,
    estimatedTime: 15,
    content: `React is a JavaScript library for building user interfaces with reusable components. It uses a virtual DOM to efficiently update the actual DOM when your data changes. React makes it easy to create interactive, stateful UIs by managing component state and props.

Key concepts:
- React is declarative: You describe what you want the UI to look like
- Component-based: Build small, reusable pieces
- Learn once, write anywhere: Use React principles across different platforms

React has become one of the most popular frontend frameworks because it provides excellent developer experience and excellent performance.`,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    resources: [
      {
        title: 'Official React Documentation',
        url: 'https://react.dev',
        type: 'documentation',
      },
      {
        title: 'React Tutorial on YouTube',
        url: 'https://www.youtube.com/results?search_query=react+tutorial+2024',
        type: 'youtube',
      },
      {
        title: 'React Getting Started Guide',
        url: 'https://react.dev/learn',
        type: 'tutorial',
      },
    ],
    keyPoints: ['Declarative UI', 'Component-based', 'Virtual DOM', 'Reusable components', 'State management'],
  },
  {
    title: 'JSX and Components',
    description: 'Understanding JSX syntax and functional components',
    module: 'React Fundamentals',
    order: 2,
    estimatedTime: 20,
    content: `JSX is a syntax extension for JavaScript that looks similar to HTML. It lets you write markup directly in your JavaScript code. Components are the building blocks of React applications.

JSX Example:
const greeting = <h1>Hello, World!</h1>;

Functional Components:
function MyComponent() {
  return <h1>Hello!</h1>;
}

Benefits of JSX:
- More readable and maintainable
- Easier to visualize UI structure
- Compile-time error checking
- Better IDE support

Every React component is a JavaScript function that returns JSX elements that describe what should appear on screen.`,
    resources: [
      {
        title: 'JSX Documentation',
        url: 'https://react.dev/learn/writing-markup-with-jsx',
        type: 'documentation',
      },
      {
        title: 'Components and Props',
        url: 'https://react.dev/learn/your-first-component',
        type: 'tutorial',
      },
      {
        title: 'JSX Deep Dive',
        url: 'https://react.dev/learn/writing-markup-with-jsx',
        type: 'article',
      },
    ],
    keyPoints: ['JSX syntax', 'Functional components', 'Component structure', 'Embedding expressions', 'Elements vs Components'],
  },
  {
    title: 'Props: Passing Data to Components',
    description: 'How to pass data between components using props',
    module: 'React Fundamentals',
    order: 3,
    estimatedTime: 18,
    content: `Props are how you pass data from a parent component to a child component. They are read-only and help you build flexible, reusable components.

Example:
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

Using the component:
<Welcome name="Alice" />

Important concepts:
- Props are immutable (read-only)
- Props are passed from parent to child
- Props help reuse components
- Prop drilling can pass data through multiple levels
- You can pass any JavaScript value as a prop including functions, objects, and other components`,
    resources: [
      {
        title: 'Props Documentation',
        url: 'https://react.dev/learn/passing-props-to-a-component',
        type: 'documentation',
      },
      {
        title: 'Understanding Props',
        url: 'https://react.dev/learn/passing-props-to-a-component',
        type: 'tutorial',
      },
      {
        title: 'Props Best Practices',
        url: 'https://react.dev/learn',
        type: 'article',
      },
      {
        title: 'Component Composition',
        url: 'https://react.dev/learn/passing-props-to-a-component',
        type: 'documentation',
      },
    ],
    keyPoints: ['Props basics', 'Passing props', 'Default props', 'Prop types', 'Component composition'],
  },
  {
    title: 'Functional Components & Hooks',
    description: 'Build components with functions and use hooks',
    module: 'Component Mastery',
    order: 4,
    estimatedTime: 22,
    content: `Functional components are JavaScript functions that return JSX. Hooks allow you to "hook into" React features like state and lifecycle.

Basic Functional Component:
function Counter() {
  return <div>Count: 0</div>;
}

What are Hooks?
- useState: Add state to functional components
- useEffect: Handle side effects
- useContext: Access context values
- Custom hooks: Create reusable component logic

Hooks Rules:
1. Only call hooks at the top level of your component
2. Only call hooks from React components or custom hooks
3. Use ESLint plugin to enforce these rules`,
    resources: [
      {
        title: 'Hooks Introduction',
        url: 'https://react.dev/reference/react/hooks',
        type: 'documentation',
      },
      {
        title: 'Using Hooks',
        url: 'https://react.dev/learn/state-a-components-memory',
        type: 'tutorial',
      },
      {
        title: 'Rules of Hooks',
        url: 'https://react.dev/reference/rules/rules-of-hooks',
        type: 'documentation',
      },
      {
        title: 'Hooks Best Practices',
        url: 'https://react.dev/reference/rules',
        type: 'article',
      },
    ],
    keyPoints: ['Functional components', 'Hooks basics', 'Rules of hooks', 'Built-in hooks', 'Custom hooks'],
  },
  {
    title: 'Conditional Rendering',
    description: 'Render different UI based on conditions',
    module: 'Component Mastery',
    order: 5,
    estimatedTime: 16,
    content: `Conditional rendering in React lets you render different components or content based on certain conditions.

Common patterns:

1. If statements:
function Greeting(props) {
  if (props.isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please log in.</h1>;
}

2. Ternary operator:
{isLoggedIn ? <Dashboard /> : <Login />}

3. Logical && operator:
{unreadCount > 0 && <Badge count={unreadCount} />}

4. Early return:
function Component(props) {
  if (!props.isValid) return null;
  return <div>Valid content</div>;
}

When to use each pattern depends on readability and complexity of your conditions.`,
    resources: [
      {
        title: 'Conditional Rendering',
        url: 'https://react.dev/learn/conditional-rendering',
        type: 'documentation',
      },
      {
        title: 'Rendering Lists',
        url: 'https://react.dev/learn/rendering-lists',
        type: 'tutorial',
      },
      {
        title: 'Conditional Logic Patterns',
        url: 'https://react.dev/learn/conditional-rendering',
        type: 'article',
      },
      {
        title: 'Rendering Optimization',
        url: 'https://react.dev/learn',
        type: 'documentation',
      },
    ],
    keyPoints: ['If statements', 'Ternary operator', 'Logical operators', 'Conditional elements', 'Short-circuit evaluation'],
  },
  {
    title: 'Lists and Keys',
    description: 'Render lists of items efficiently',
    module: 'Component Mastery',
    order: 6,
    estimatedTime: 19,
    content: `Rendering lists in React requires understanding keys to help React identify which items have changed.

Rendering a list:
function TodoList(props) {
  return (
    <ul>
      {props.todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

Why keys are important:
- Help React identify which items have changed
- Preserve component state in lists
- Improve performance
- Should be unique and stable

Good keys:
- Database IDs: <li key={item.id}>
- Unique identifiers: <li key={uuid()}>

Bad keys:
- Array indices: <li key={index}> (only if list is static)
- Random values: <li key={Math.random()}>

Keys don't need to be globally unique, just unique among siblings.`,
    resources: [
      {
        title: 'Rendering Lists',
        url: 'https://react.dev/learn/rendering-lists',
        type: 'documentation',
      },
      {
        title: 'Keys in Lists',
        url: 'https://react.dev/learn/rendering-lists',
        type: 'tutorial',
      },
      {
        title: 'List Performance',
        url: 'https://react.dev/learn/rendering-lists',
        type: 'article',
      },
      {
        title: 'Efficient Updates',
        url: 'https://react.dev/learn',
        type: 'documentation',
      },
    ],
    keyPoints: ['Rendering lists', 'Map function', 'Keys', 'List performance', 'Updating lists'],
  },
  {
    title: 'Managing State with useState',
    description: 'Add and manage state in functional components',
    module: 'State & Props',
    order: 7,
    estimatedTime: 20,
    content: `useState is a React Hook that lets you add state variables to your functional components.

Basic usage:
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

Key points:
- First argument: initial state value
- Returns: [currentValue, updateFunction]
- State updates are asynchronous
- Never modify state directly
- Each component instance has its own state

Common patterns:
- Boolean flags: useState(false)
- Counters: useState(0)
- Strings: useState('')
- Complex objects: useState({})

State helps you build interactive components that respond to user actions.`,
    resources: [
      {
        title: 'Using State',
        url: 'https://react.dev/learn/state-a-components-memory',
        type: 'documentation',
      },
      {
        title: 'useState Hook',
        url: 'https://react.dev/reference/react/useState',
        type: 'tutorial',
      },
      {
        title: 'State Best Practices',
        url: 'https://react.dev/learn/state-a-components-memory',
        type: 'article',
      },
      {
        title: 'State Updates',
        url: 'https://react.dev/learn/state-a-components-memory',
        type: 'documentation',
      },
    ],
    keyPoints: ['useState hook', 'State variables', 'State updates', 'Batching updates', 'Immutability'],
  },
  {
    title: 'Handling Events',
    description: 'Handle user interactions with events',
    module: 'State & Props',
    order: 8,
    estimatedTime: 17,
    content: `Event handling in React is similar to DOM events, but with some key differences.

Basic event handling:
function ClickButton() {
  function handleClick() {
    console.log('Button clicked!');
  }
  
  return <button onClick={handleClick}>Click me</button>;
}

Event names:
- onClick: Mouse click
- onChange: Input change
- onSubmit: Form submission
- onMouseEnter: Mouse enters element
- onFocus: Element gains focus
- onBlur: Element loses focus

Important points:
- Use camelCase for event names
- Pass function reference, not function call
- Use arrow functions for inline handlers
- Event object is passed as last argument
- React uses event delegation for performance

Form handling:
function Form() {
  const [value, setValue] = useState('');
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      console.log(value);
    }}>
      <input onChange={(e) => setValue(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}`,
    resources: [
      {
        title: 'Responding to Events',
        url: 'https://react.dev/learn/responding-to-events',
        type: 'documentation',
      },
      {
        title: 'Event Handlers',
        url: 'https://react.dev/learn/responding-to-events',
        type: 'tutorial',
      },
      {
        title: 'Form Handling',
        url: 'https://react.dev/learn/responding-to-events',
        type: 'article',
      },
      {
        title: 'Event Objects',
        url: 'https://react.dev/reference/react-dom/components/common',
        type: 'documentation',
      },
      {
        title: 'Event Delegation',
        url: 'https://react.dev/learn/responding-to-events',
        type: 'article',
      },
    ],
    keyPoints: ['Event handlers', 'onClick events', 'Form events', 'onChange handling', 'preventDefault'],
  },
  {
    title: 'Lifting State Up',
    description: 'Share state between sibling components',
    module: 'State & Props',
    order: 9,
    estimatedTime: 18,
    content: `"Lifting state up" means moving state to the nearest common ancestor of components that need to share it.

Problem: Two siblings need to share state
function Parent() {
  const [temperature, setTemperature] = useState(0);
  
  return (
    <div>
      <Celsius value={temperature} onChange={setTemperature} />
      <Fahrenheit value={temperature} />
    </div>
  );
}

Benefits of lifting state:
- Single source of truth for shared state
- Easier to manage and debug
- Promotes component reusability
- Prevents prop drilling at extreme levels

When to lift state:
- Multiple components need same state
- Sibling components need to communicate
- Parent needs to control child behavior

Pattern:
1. Identify shared state
2. Move it to common parent
3. Pass state via props to children
4. Pass callbacks to update state from children
5. Keep it simple - don't lift too far up

This is the foundation for understanding React's data flow and leads to better component design.`,
    resources: [
      {
        title: 'Lifting State Up',
        url: 'https://react.dev/learn/sharing-state-between-components',
        type: 'documentation',
      },
      {
        title: 'Sharing State',
        url: 'https://react.dev/learn/sharing-state-between-components',
        type: 'tutorial',
      },
      {
        title: 'Component Synchronization',
        url: 'https://react.dev/learn/sharing-state-between-components',
        type: 'article',
      },
      {
        title: 'Data Flow',
        url: 'https://react.dev/learn/thinking-in-react',
        type: 'documentation',
      },
    ],
    keyPoints: ['Lifting state', 'Shared state', 'Callback props', 'Single source of truth', 'Data flow'],
  },
  {
    title: 'useEffect: Side Effects',
    description: 'Handle side effects in components',
    module: 'Advanced Hooks',
    order: 10,
    estimatedTime: 22,
    content: `useEffect lets you perform side effects in functional components. Side effects are anything that happens outside the component render.

Basic usage:
function Component() {
  useEffect(() => {
    // Side effect code here
    console.log('Component mounted or dependencies changed');
    
    // Optional cleanup
    return () => {
      console.log('Cleanup');
    };
  }, [dependencies]);
}

Dependency array:
- Empty []: Run once on mount
- [value]: Run when value changes
- Omitted: Run after every render (usually not wanted)

Common use cases:
1. Fetching data:
useEffect(() => {
  fetch('/api/data').then(r => r.json()).then(setData);
}, []);

2. Subscriptions:
useEffect(() => {
  const unsub = subscribe(data);
  return () => unsub();
}, []);

3. DOM manipulation:
useEffect(() => {
  document.title = title;
}, [title]);

4. Analytics:
useEffect(() => {
  trackPageView();
}, [pathname]);

Rules:
- Only call useEffect at top level
- Effect runs after render, not before
- Cleanup function runs before effect runs again
- Dependencies should be included in array`,
    resources: [
      {
        title: 'useEffect Documentation',
        url: 'https://react.dev/reference/react/useEffect',
        type: 'documentation',
      },
      {
        title: 'Side Effects Guide',
        url: 'https://react.dev/learn/synchronizing-with-effects',
        type: 'tutorial',
      },
      {
        title: 'Dependency Array',
        url: 'https://react.dev/learn/synchronizing-with-effects',
        type: 'article',
      },
      {
        title: 'Cleanup Functions',
        url: 'https://react.dev/learn/synchronizing-with-effects',
        type: 'documentation',
      },
      {
        title: 'useEffect Patterns',
        url: 'https://react.dev/learn/synchronizing-with-effects',
        type: 'article',
      },
    ],
    keyPoints: ['useEffect hook', 'Side effects', 'Dependency array', 'Cleanup functions', 'Effect timing'],
  },
  {
    title: 'useContext: Global State',
    description: 'Share data across components without prop drilling',
    module: 'Advanced Hooks',
    order: 11,
    estimatedTime: 20,
    content: `useContext lets you read context values without prop drilling through every level.

Creating context:
const ThemeContext = React.createContext('light');

Providing context:
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <MyComponent />
    </ThemeContext.Provider>
  );
}

Using context:
function MyComponent() {
  const theme = useContext(ThemeContext);
  return <div style={{ background: theme }}>Content</div>;
}

When to use Context:
- Theme switching (light/dark)
- Authentication state
- Language/localization
- Global UI state

When NOT to use Context:
- Frequently changing data (use Redux/Zustand)
- Complex state logic (use useReducer)
- One-time props (prop drilling is fine for 1-2 levels)

Context performance:
- Context changes cause all consumers to re-render
- Split contexts by data that changes together
- Use useCallback to memoize provided values

Pattern:
1. Create context with default value
2. Create provider component
3. Wrap app/section with provider
4. Use useContext to access value
5. Update value in provider state`,
    resources: [
      {
        title: 'useContext Hook',
        url: 'https://react.dev/reference/react/useContext',
        type: 'documentation',
      },
      {
        title: 'Context Guide',
        url: 'https://react.dev/learn/passing-data-deeply-with-context',
        type: 'tutorial',
      },
      {
        title: 'Context Patterns',
        url: 'https://react.dev/learn/passing-data-deeply-with-context',
        type: 'article',
      },
      {
        title: 'Avoiding Over-use of Context',
        url: 'https://react.dev/learn/passing-data-deeply-with-context',
        type: 'documentation',
      },
    ],
    keyPoints: ['Context creation', 'Context providers', 'useContext hook', 'Avoiding prop drilling', 'Context performance'],
  },
  {
    title: 'useReducer: Complex State',
    description: 'Manage complex state with a reducer function',
    module: 'Advanced Hooks',
    order: 12,
    estimatedTime: 21,
    content: `useReducer is useful when you have complex state logic or state depends on previous state.

Basic pattern:
const [state, dispatch] = useReducer(reducer, initialState);

Reducer function:
function reducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

Using the reducer:
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  
  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

When to use useReducer:
- Multiple related state variables
- Complex state update logic
- State depends on previous state
- Passing down callbacks (dispatch is stable)
- Multiple interactions modify same state

Benefits:
- Centralized state logic
- Easier to test
- Better for complex workflows
- Easier to debug with Redux DevTools

State machine pattern:
useReducer works well for implementing state machines where actions transition between valid states.`,
    resources: [
      {
        title: 'useReducer Hook',
        url: 'https://react.dev/reference/react/useReducer',
        type: 'documentation',
      },
      {
        title: 'Extracting State Logic',
        url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer',
        type: 'tutorial',
      },
      {
        title: 'Reducer Patterns',
        url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer',
        type: 'article',
      },
      {
        title: 'useReducer vs useState',
        url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer',
        type: 'documentation',
      },
        {
        title: 'Advanced State Management',
        url: 'https://react.dev/learn/extracting-state-logic-into-a-reducer',
        type: 'article',
      },
    ],
    keyPoints: ['useReducer hook', 'Reducer function', 'Actions', 'Complex state', 'State machine'],
  },
  {
    title: 'Custom Hooks',
    description: 'Create reusable stateful logic',
    module: 'Advanced Hooks',
    order: 13,
    estimatedTime: 19,
    content: `Custom hooks let you extract component logic into reusable functions. A custom hook is a JavaScript function that uses React hooks.

Example - useLocalStorage:
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
}

Usage:
function MyComponent() {
  const [name, setName] = useLocalStorage('name', 'John');
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}

Common custom hooks:
- useFetch: Fetch data from API
- useLocalStorage: Persist to local storage
- usePrevious: Access previous value
- useAsync: Handle async operations
- useClickOutside: Detect clicks outside element

Creating custom hooks:
1. Extract component logic into function
2. Start function name with "use"
3. Use React hooks inside
4. Return values/functions needed
5. Follow rules of hooks

Benefits:
- Reuse stateful logic across components
- Reduce component complexity
- Easier testing
- Better code organization`,
    resources: [
      {
        title: 'Building Your Own Hooks',
        url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
        type: 'documentation',
      },
      {
        title: 'Custom Hooks Guide',
        url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
        type: 'tutorial',
      },
      {
        title: 'Hook Patterns',
        url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
        type: 'article',
      },
      {
        title: 'React Hooks Library',
        url: 'https://usehooks.com/',
        type: 'documentation',
      },
    ],
    keyPoints: ['Custom hooks', 'Hook composition', 'Reusable logic', 'Hook patterns', 'Testing hooks'],
  },
  {
    title: 'Styling in React',
    description: 'Different approaches to styling React components',
    module: 'Styling & Performance',
    order: 14,
    estimatedTime: 18,
    content: `There are multiple ways to style React components, each with tradeoffs.

1. Inline styles:
function Button() {
  const styles = { backgroundColor: 'blue', color: 'white' };
  return <button style={styles}>Click</button>;
}

2. CSS modules:
// Button.module.css
.button { background: blue; color: white; }

// Button.jsx
import styles from './Button.module.css';
function Button() {
  return <button className={styles.button}>Click</button>;
}

3. Tailwind CSS:
function Button() {
  return <button className="bg-blue-500 text-white">Click</button>;
}

4. CSS-in-JS libraries:
import styled from 'styled-components';

const StyledButton = styled.button\`
  background: blue;
  color: white;
\`;

Pros and cons:
- Inline: Simple, dynamic easily
- CSS modules: Scoped, portable
- Tailwind: Fast, consistent, requires learning
- CSS-in-JS: Powerful, dynamic, complexity

Best practices:
- Choose one approach per project
- Use utility classes for consistency
- Extract reusable component styles
- Use theme systems for colors
- Optimize CSS performance`,
    resources: [
      {
        title: 'Styling Components',
        url: 'https://react.dev/learn/adding-a-stylesheet',
        type: 'documentation',
      },
      {
        title: 'CSS Styling Guide',
        url: 'https://react.dev/learn/adding-a-stylesheet',
        type: 'tutorial',
      },
      {
        title: 'Tailwind CSS',
        url: 'https://tailwindcss.com/',
        type: 'documentation',
      },
      {
        title: 'Styled Components',
        url: 'https://styled-components.com/',
        type: 'documentation',
      },
    ],
    keyPoints: ['Inline styles', 'CSS modules', 'Tailwind CSS', 'CSS-in-JS', 'Styling approaches'],
  },
  {
    title: 'Performance Optimization',
    description: 'Optimize React app performance',
    module: 'Styling & Performance',
    order: 15,
    estimatedTime: 20,
    content: `Performance optimization is crucial for good user experience. React provides several tools.

Key concepts:

1. useMemo - Memoize expensive computations:
const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);

2. useCallback - Memoize functions:
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);

3. React.memo - Memoize components:
const MyComponent = React.memo(function MyComponent(props) {
  return <div>{props.value}</div>;
});

4. Code splitting:
const LazyComponent = React.lazy(() => import('./LazyComponent'));

5. Virtualization - Render only visible items:
<VirtualList items={1000000} />

Performance tips:
- Profile with React DevTools Profiler
- Avoid unnecessary re-renders
- Use keys correctly in lists
- Split into smaller components
- Lazy load components and routes
- Optimize images and assets
- Use production build for testing
- Monitor bundle size

Common pitfalls:
- Premature optimization
- Not using dependencies correctly
- Memoizing everything
- Forgetting cleanup in useEffect
- Creating objects/arrays in render

Remember: Measure first, optimize second. Not all optimization is worth the complexity trade-off.`,
    resources: [
      {
        title: 'Rendering Performance',
        url: 'https://react.dev/learn/render-and-commit',
        type: 'documentation',
      },
      {
        title: 'Optimization Guide',
        url: 'https://react.dev/learn/keeping-components-pure',
        type: 'tutorial',
      },
      {
        title: 'React Profiler',
        url: 'https://react.dev/learn/render-and-commit',
        type: 'article',
      },
      {
        title: 'Code Splitting',
        url: 'https://react.dev/reference/react/lazy',
        type: 'documentation',
      },
    ],
    keyPoints: ['useMemo', 'useCallback', 'React.memo', 'Code splitting', 'Performance profiling'],
  },
];

export async function GET() {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const lessonsCollection = db.collection('lessons');

      // Check if lessons already exist
      const existingLessons = await lessonsCollection.countDocuments();

      if (existingLessons === 0) {
        // Insert all lessons
        await lessonsCollection.insertMany(LESSONS_DATA);
      }

      // Return all lessons
      const lessons = await lessonsCollection.find({}).toArray();
      return Response.json({ lessons }, { status: 200 });
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Lessons fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch lessons' },
      { status: 500 }
    );
  }
}
