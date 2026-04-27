export const MODULES = [
  {
    name: 'React Fundamentals',
    description: 'Learn the core concepts of React including JSX, components, and rendering',
    order: 1,
  },
  {
    name: 'Component Mastery',
    description: 'Deep dive into functional components, hooks, and component composition',
    order: 2,
  },
  {
    name: 'State & Props',
    description: 'Master state management and prop drilling with modern patterns',
    order: 3,
  },
  {
    name: 'Advanced Hooks',
    description: 'Learn useEffect, useContext, useReducer, and custom hooks',
    order: 4,
  },
  {
    name: 'Styling & Performance',
    description: 'CSS-in-JS, Tailwind CSS, and performance optimization techniques',
    order: 5,
  },
];

export const LESSONS = [
  // Module 1: React Fundamentals
  {
    title: 'What is React?',
    module: 'React Fundamentals',
    description: 'Introduction to React and why it exists',
    content: `
React is a JavaScript library for building user interfaces with reusable components. It makes it easy to create interactive UIs by efficiently managing how your app looks and responds to user interactions.

## Key Points:
- React is declarative - you describe what the UI should look like
- Component-based architecture for reusability
- Virtual DOM for efficient rendering
- One-way data flow makes apps more stable
    `,
    order: 1,
    estimatedTime: 10,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    resources: [
      {
        title: 'Official React Docs',
        url: 'https://react.dev',
        type: 'documentation',
      },
      {
        title: 'React Getting Started',
        url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
        type: 'youtube',
      },
    ],
    keyPoints: [
      'React is a UI library, not a full framework',
      'Components are the building blocks of React apps',
      'JSX is a syntax extension for JavaScript',
      'React uses a virtual DOM for performance',
    ],
  },
  {
    title: 'JSX and Components',
    module: 'React Fundamentals',
    description: 'Understanding JSX syntax and creating your first component',
    content: `
JSX is a syntax extension that lets you write HTML-like code in JavaScript. It gets compiled to regular JavaScript function calls.

## JSX Basics:
- JSX looks like HTML but it's JavaScript
- Must return a single root element
- Use className instead of class
- JavaScript expressions go in curly braces {}

## Creating Components:
- Functional components are JavaScript functions that return JSX
- Components must start with a capital letter
- Keep components small and focused on one thing
    `,
    order: 2,
    estimatedTime: 15,
    videoUrl: 'https://www.youtube.com/embed/N3AkSS5hxZU',
    resources: [
      {
        title: 'JSX Guide',
        url: 'https://react.dev/learn/writing-markup-with-jsx',
        type: 'documentation',
      },
      {
        title: 'Components Tutorial',
        url: 'https://react.dev/learn/your-first-component',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'JSX is syntactic sugar for React.createElement()',
      'Every JSX element is a component',
      'Props make components reusable',
      'Each component should have a single responsibility',
    ],
  },
  {
    title: 'Props: Passing Data to Components',
    module: 'React Fundamentals',
    description: 'Learn how to use props to pass data between components',
    content: `
Props are how components talk to each other. A parent component can pass data down to a child component through props.

## Props Basics:
- Props are read-only and flow one way (parent to child)
- Props are like function parameters
- Destructure props for cleaner code
- Props can be any JavaScript value: strings, numbers, objects, functions, etc.

## Best Practices:
- Use PropTypes or TypeScript for type safety
- Avoid prop drilling (passing through many intermediate components)
- Give props meaningful names
- Document what props a component expects
    `,
    order: 3,
    estimatedTime: 15,
    videoUrl: 'https://www.youtube.com/embed/QQYfIY1DXWo',
    resources: [
      {
        title: 'Props Documentation',
        url: 'https://react.dev/learn/passing-props-to-a-component',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'Props are immutable',
      'Props enable component reusability',
      'Props flow downward only (parent to child)',
      'You cannot modify props in a child component',
    ],
  },

  // Module 2: Component Mastery
  {
    title: 'Functional Components & Hooks',
    module: 'Component Mastery',
    description: 'Master modern functional components with React Hooks',
    content: `
Functional components are regular JavaScript functions that return JSX. Hooks are special functions that let you "hook into" React features.

## Why Functional Components?
- Simpler and more intuitive than class components
- Reusable logic through custom hooks
- Better performance and smaller bundle size
- Hooks make state management easier

## Common Hooks:
- useState: Add state to functional components
- useEffect: Run side effects
- useContext: Access global context
- useReducer: Complex state logic
    `,
    order: 4,
    estimatedTime: 20,
    videoUrl: 'https://www.youtube.com/embed/dpw9EHDh2bM',
    resources: [
      {
        title: 'Hooks API Reference',
        url: 'https://react.dev/reference/react',
        type: 'documentation',
      },
      {
        title: 'React Hooks Tutorial',
        url: 'https://www.youtube.com/watch?v=O6P86uwfdR0',
        type: 'youtube',
      },
    ],
    keyPoints: [
      'Functional components replace class components',
      'Hooks let you use state and other features in functional components',
      'Rules of Hooks: Only call hooks at top level and in React functions',
      'You can create custom hooks by extracting component logic',
    ],
  },
  {
    title: 'Conditional Rendering',
    module: 'Component Mastery',
    description: 'Render different content based on conditions',
    content: `
Conditional rendering allows you to render different content based on conditions, much like if-statements in JavaScript.

## Techniques:
1. If statements - evaluate before return
2. Ternary operators - concise inline conditions
3. Logical && operator - render if true
4. Early returns - return null to render nothing

## Best Practices:
- Keep conditional logic simple
- Extract complex conditions into separate functions
- Avoid deeply nested ternaries
- Use meaningful variable names for conditions
    `,
    order: 5,
    estimatedTime: 12,
    videoUrl: 'https://www.youtube.com/embed/mXABUGPfVw4',
    resources: [
      {
        title: 'Conditional Rendering Guide',
        url: 'https://react.dev/learn/conditional-rendering',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'JavaScript conditional logic works in React',
      'Use ternary operators for simple conditions',
      'The && operator is useful for optional rendering',
      'Return null to render nothing',
    ],
  },
  {
    title: 'Lists and Keys',
    module: 'Component Mastery',
    description: 'Rendering lists efficiently with proper key usage',
    content: `
Lists are a fundamental part of web apps. React provides efficient ways to render lists of data.

## Rendering Lists:
- Use array.map() to transform data into JSX
- Each list item needs a unique 'key' prop
- Keys help React identify which items have changed
- Never use index as a key (unless list is static)

## Common Mistakes:
- Forgetting the key prop causes bugs in lists
- Using array index as key with dynamic lists
- Not using unique, stable identifiers
    `,
    order: 6,
    estimatedTime: 14,
    videoUrl: 'https://www.youtube.com/embed/Fnldk_DKJas',
    resources: [
      {
        title: 'Rendering Lists',
        url: 'https://react.dev/learn/rendering-lists',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'Use map() to render lists in React',
      'Keys help React track which items change, are added, or removed',
      'Keys should be unique and stable across rerenders',
      'Index as key is anti-pattern for dynamic lists',
    ],
  },

  // Module 3: State & Props
  {
    title: 'Managing State with useState',
    module: 'State & Props',
    description: 'Learn the most important hook for managing component state',
    content: `
useState is the hook you'll use most often. It lets you add state to functional components.

## How useState Works:
- Returns an array with two elements: state value and setter function
- Use destructuring to access them
- Setter function triggers a re-render
- State updates are asynchronous but batched

## State Rules:
- State is local to the component
- Only initialize state once
- State updates are immutable
- For objects/arrays, create new references when updating
    `,
    order: 7,
    estimatedTime: 18,
    videoUrl: 'https://www.youtube.com/embed/Ew-BqtsluBM',
    resources: [
      {
        title: 'useState Hook',
        url: 'https://react.dev/reference/react/useState',
        type: 'documentation',
      },
      {
        title: 'State Management Explained',
        url: 'https://www.youtube.com/watch?v=DhClNEp-TIYA',
        type: 'youtube',
      },
    ],
    keyPoints: [
      'useState returns [state, setState]',
      'State updates are asynchronous',
      'Never modify state directly',
      'Each component instance has its own state',
    ],
  },
  {
    title: 'Handling Events',
    module: 'State & Props',
    description: 'Respond to user interactions with event handlers',
    content: `
Events in React are similar to DOM events but with some differences.

## Event Handling Basics:
- Event names are camelCase: onClick, onChange, onSubmit
- Event handler is a function that receives the event
- Use arrow functions to pass arguments
- Prevent default behavior with e.preventDefault()

## Common Events:
- Click: onClick
- Change: onChange
- Submit: onSubmit
- Focus/Blur: onFocus, onBlur
- Keyboard: onKeyDown, onKeyUp, onKeyPress
    `,
    order: 8,
    estimatedTime: 12,
    videoUrl: 'https://www.youtube.com/embed/M0oJtGgQAXE',
    resources: [
      {
        title: 'Handling Events',
        url: 'https://react.dev/learn/responding-to-events',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'Event handlers are camelCase in React',
      'Pass function reference or arrow function',
      'Event object is passed as first argument',
      'Prevent default behavior when needed',
    ],
  },
  {
    title: 'Lifting State Up',
    module: 'State & Props',
    description: 'Share state between sibling components',
    content: `
When multiple components need to share the same state, lift the state up to their parent component.

## When to Lift State:
- Multiple components need the same state
- Need to communicate between siblings
- Want to keep state synchronized

## The Process:
1. Move state to the parent component
2. Pass state down as props
3. Pass setter functions as props for child updates
4. Children update parent state through callbacks

## Benefits:
- Single source of truth
- Easier to debug
- Components are reusable
    `,
    order: 9,
    estimatedTime: 16,
    videoUrl: 'https://www.youtube.com/embed/jpegXpNwzqw',
    resources: [
      {
        title: 'Sharing State Between Components',
        url: 'https://react.dev/learn/sharing-state-between-components',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'Lift state to the lowest common parent',
      'State flows down, updates flow up',
      'Avoid prop drilling by using Context',
      'Single source of truth principle',
    ],
  },

  // Module 4: Advanced Hooks
  {
    title: 'useEffect: Side Effects',
    module: 'Advanced Hooks',
    description: 'Perform side effects like API calls and subscriptions',
    content: `
useEffect is for running code after the component renders. This is where you fetch data, set up subscriptions, or update the DOM directly.

## useEffect Basics:
- Runs after every render by default
- Second argument controls when it runs
- Return a cleanup function to prevent memory leaks
- Empty dependency array runs once on mount

## Common Use Cases:
- Fetching data from an API
- Setting up event listeners
- Updating document title
- Cleaning up subscriptions
    `,
    order: 10,
    estimatedTime: 20,
    videoUrl: 'https://www.youtube.com/embed/j6I0p3ypT-U',
    resources: [
      {
        title: 'useEffect Documentation',
        url: 'https://react.dev/reference/react/useEffect',
        type: 'documentation',
      },
      {
        title: 'useEffect Hook Explained',
        url: 'https://www.youtube.com/watch?v=IYvD9oBCuJI',
        type: 'youtube',
      },
    ],
    keyPoints: [
      'useEffect runs after component renders',
      'Use dependency array to control when effect runs',
      'Return a cleanup function to prevent memory leaks',
      'Don\'t call hooks inside conditions',
    ],
  },
  {
    title: 'useContext: Global State',
    module: 'Advanced Hooks',
    description: 'Access global context without prop drilling',
    content: `
useContext allows you to subscribe to React Context without nesting. It avoids the "prop drilling" problem.

## Context Basics:
- Create context with React.createContext()
- Provide values with Context.Provider
- Consume with useContext hook
- All consumers re-render when provider value changes

## When to Use Context:
- Theme (dark/light mode)
- User authentication
- Language/localization
- Global UI state
    `,
    order: 11,
    estimatedTime: 18,
    videoUrl: 'https://www.youtube.com/embed/xWXxkD25D4I',
    resources: [
      {
        title: 'useContext Hook',
        url: 'https://react.dev/reference/react/useContext',
        type: 'documentation',
      },
      {
        title: 'Context API Tutorial',
        url: 'https://www.youtube.com/watch?v=5LrDIUGw5_4',
        type: 'youtube',
      },
    ],
    keyPoints: [
      'useContext solves prop drilling',
      'Wrap providers at appropriate level',
      'All consumers re-render on value change',
      'Use custom hooks to wrap useContext',
    ],
  },
  {
    title: 'useReducer: Complex State',
    module: 'Advanced Hooks',
    description: 'Manage complex state with useReducer hook',
    content: `
useReducer is useful when you have complex state logic with multiple sub-values. It\'s similar to Redux reducers.

## useReducer Syntax:
- Takes reducer function and initial state
- Returns state and dispatch function
- Dispatch sends actions to the reducer
- Reducer returns new state based on action

## When to Use:
- Multiple state values that relate to each other
- Complex state transitions
- Want to optimize performance (pass dispatch to children)
- Testing state logic separately
    `,
    order: 12,
    estimatedTime: 20,
    videoUrl: 'https://www.youtube.com/embed/sZCgtjHXwVQ',
    resources: [
      {
        title: 'useReducer Hook',
        url: 'https://react.dev/reference/react/useReducer',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'useReducer is for complex state logic',
      'Reducer is a pure function (same input = same output)',
      'Actions describe what happened',
      'Easier to debug state updates',
    ],
  },
  {
    title: 'Custom Hooks',
    module: 'Advanced Hooks',
    description: 'Create reusable hook logic',
    content: `
Custom hooks are JavaScript functions that use React hooks. They let you extract component logic into reusable functions.

## Creating Custom Hooks:
- Name must start with 'use'
- Can call other hooks
- Can return anything (state, functions, etc.)
- Can be used in multiple components

## Benefits:
- DRY principle - Don't Repeat Yourself
- Easier to share logic between components
- Cleaner component code
- Easy to test
    `,
    order: 13,
    estimatedTime: 18,
    videoUrl: 'https://www.youtube.com/embed/vBqMHZIW0So',
    resources: [
      {
        title: 'Custom Hooks Guide',
        url: 'https://react.dev/learn/reusing-logic-with-custom-hooks',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'Custom hooks are functions that use hooks',
      'Names must start with "use"',
      'Share stateful logic across components',
      'Each hook call has independent state',
    ],
  },

  // Module 5: Styling & Performance
  {
    title: 'Styling in React',
    module: 'Styling & Performance',
    description: 'Different approaches to styling React components',
    content: `
There are many ways to style React components. Each has pros and cons.

## Styling Approaches:
1. Inline Styles - JavaScript objects (limited but scoped)
2. CSS Modules - Scoped CSS files
3. Tailwind CSS - Utility-first CSS framework
4. CSS-in-JS - styled-components, Emotion
5. SCSS/SASS - Preprocessor with nesting

## Best Practices:
- Avoid inline styles for large applications
- Use CSS Modules or Tailwind for predictable styling
- Keep styling close to components
- Use design systems for consistency
    `,
    order: 14,
    estimatedTime: 15,
    videoUrl: 'https://www.youtube.com/embed/P_7xAd6cCPo',
    resources: [
      {
        title: 'Styling and CSS Guide',
        url: 'https://react.dev/learn/styling-with-css',
        type: 'documentation',
      },
      {
        title: 'Tailwind CSS Documentation',
        url: 'https://tailwindcss.com',
        type: 'documentation',
      },
    ],
    keyPoints: [
      'Many ways to style React components',
      'CSS Modules provide scoped styling',
      'Tailwind CSS is popular for rapid development',
      'Choose based on project needs',
    ],
  },
  {
    title: 'Performance Optimization',
    module: 'Styling & Performance',
    description: 'Optimize your React app performance',
    content: `
React is fast, but apps can slow down without optimization. Learn key performance techniques.

## Performance Tools:
- React DevTools Profiler
- Chrome DevTools Performance tab
- Lighthouse for overall performance

## Optimization Techniques:
1. Code splitting - Load code on demand
2. Memoization - Skip unnecessary re-renders
3. Lazy loading - Load components only when needed
4. Image optimization - Use proper formats and sizes
5. Bundle analysis - See what's taking up space
    `,
    order: 15,
    estimatedTime: 20,
    videoUrl: 'https://www.youtube.com/embed/H6FHZu8Th1I',
    resources: [
      {
        title: 'Performance Optimization',
        url: 'https://react.dev/learn/render-and-commit',
        type: 'documentation',
      },
      {
        title: 'React Performance Tips',
        url: 'https://www.youtube.com/watch?v=9JJva6ubnnM',
        type: 'youtube',
      },
    ],
    keyPoints: [
      'Measure before optimizing',
      'Code splitting improves initial load',
      'Memoization prevents unnecessary re-renders',
      'Profile your app to find bottlenecks',
    ],
  },
];

export const QUIZZES = [
  // Module 1 Quizzes
  {
    lessonTitle: 'What is React?',
    questions: [
      {
        question: 'What is the primary purpose of React?',
        options: [
          'Building server-side applications',
          'Creating interactive user interfaces',
          'Managing databases',
          'Handling network requests',
        ],
        correctAnswer: 1,
        explanation: 'React is a library specifically designed for building interactive user interfaces with JavaScript.',
      },
      {
        question: 'Which of the following is NOT a key feature of React?',
        options: [
          'Component-based architecture',
          'Virtual DOM',
          'Built-in database',
          'Declarative programming',
        ],
        correctAnswer: 2,
        explanation: 'React does not include a built-in database. React focuses on the UI layer, and you need separate solutions for backend/database.',
      },
      {
        question: 'What does "declarative" mean in React?',
        options: [
          'You write how to do things step by step',
          'You describe what the UI should look like',
          'You declare variables before using them',
          'You declare components as classes',
        ],
        correctAnswer: 1,
        explanation: 'Declarative means you describe the desired end state of the UI, and React figures out how to achieve it.',
      },
      {
        question: 'What is the Virtual DOM?',
        options: [
          'A physical server that holds DOM elements',
          'A JavaScript representation of the real DOM',
          'A deprecated feature no longer used',
          'A browser API for DOM manipulation',
        ],
        correctAnswer: 1,
        explanation: 'The Virtual DOM is an in-memory representation of the real DOM that React uses to efficiently update the actual DOM.',
      },
    ],
  },
  {
    lessonTitle: 'JSX and Components',
    questions: [
      {
        question: 'What does JSX stand for?',
        options: [
          'JavaScript XML',
          'JSON Extended',
          'JavaScript Extension',
          'Java Syntax Extension',
        ],
        correctAnswer: 0,
        explanation: 'JSX stands for JavaScript XML. It is a syntax extension that allows you to write HTML-like code in JavaScript.',
      },
      {
        question: 'In JSX, what is used instead of the class attribute?',
        options: ['class', 'className', 'classname', 'css-class'],
        correctAnswer: 1,
        explanation: 'In JSX, you use className instead of class because class is a reserved keyword in JavaScript.',
      },
      {
        question: 'How do you embed JavaScript expressions in JSX?',
        options: [
          'Using ${}',
          'Using {{}}',
          'Using {}',
          'Using <>',
        ],
        correctAnswer: 2,
        explanation: 'Single curly braces {} are used to embed JavaScript expressions in JSX. Double braces are used for inline object styles.',
      },
      {
        question: 'Component names must start with:',
        options: ['lowercase letter', 'uppercase letter', 'underscore', 'dollar sign'],
        correctAnswer: 1,
        explanation: 'React components must start with an uppercase letter to distinguish them from regular HTML elements.',
      },
      {
        question: 'A functional component must return:',
        options: [
          'A promise',
          'JSX or null',
          'An object',
          'A string',
        ],
        correctAnswer: 1,
        explanation: 'Functional components must return JSX or null. You can also return React elements or arrays of elements.',
      },
    ],
  },
  {
    lessonTitle: 'Props: Passing Data to Components',
    questions: [
      {
        question: 'What are props in React?',
        options: [
          'Internal state of a component',
          'HTML properties',
          'Arguments passed to a component',
          'Methods of a component',
        ],
        correctAnswer: 2,
        explanation: 'Props are arguments passed to React components, similar to function parameters. They allow parent components to pass data to children.',
      },
      {
        question: 'Can a child component modify props received from the parent?',
        options: [
          'Yes, always',
          'Yes, if it\'s an object',
          'No, props are read-only',
          'Yes, through spread operator',
        ],
        correctAnswer: 2,
        explanation: 'Props are read-only in React. If a child needs to modify data, the parent should pass a callback function.',
      },
      {
        question: 'How do you pass a number as a prop?',
        options: [
          'prop="123"',
          'prop={123}',
          'prop={\'123\'}',
          'prop=123',
        ],
        correctAnswer: 1,
        explanation: 'Use curly braces {} to pass JavaScript values including numbers. Without braces, it\'s treated as a string.',
      },
      {
        question: 'What is prop drilling?',
        options: [
          'Drilling holes in props',
          'Passing props through many intermediate components',
          'Using drill from a library',
          'Extracting data from props',
        ],
        correctAnswer: 1,
        explanation: 'Prop drilling is when you pass props through multiple intermediate components that don\'t use them. Context API helps avoid this.',
      },
    ],
  },

  // Module 2 Quizzes
  {
    lessonTitle: 'Functional Components & Hooks',
    questions: [
      {
        question: 'What are React Hooks?',
        options: [
          'Methods for hooking components together',
          'Functions that let you use React features in functional components',
          'Lifecycle methods for class components',
          'CSS styling hooks',
        ],
        correctAnswer: 1,
        explanation: 'Hooks are functions that let you "hook into" React features like state and lifecycle methods from functional components.',
      },
      {
        question: 'Which of these is NOT a valid place to call a Hook?',
        options: [
          'At the top level of a component',
          'At the top level of a custom hook',
          'Inside a conditional statement',
          'Inside a loop',
        ],
        correctAnswer: 2,
        explanation: 'You should not call Hooks inside conditionals or loops. This breaks the Rules of Hooks and can cause bugs.',
      },
      {
        question: 'What is the main advantage of functional components over class components?',
        options: [
          'They are faster',
          'Simpler syntax and easier to understand',
          'They support more features',
          'They don\'t need React imports',
        ],
        correctAnswer: 1,
        explanation: 'Functional components have simpler syntax, are easier to understand, and work well with Hooks for better code organization.',
      },
      {
        question: 'Can you mix functional components and class components in the same app?',
        options: ['No, not allowed', 'Yes, they work together fine', 'Only if using same version', 'Only in specific files'],
        correctAnswer: 1,
        explanation: 'Yes, you can use both functional and class components in the same React application.',
      },
    ],
  },
  {
    lessonTitle: 'Conditional Rendering',
    questions: [
      {
        question: 'Which of these is a valid way to conditionally render in React?',
        options: [
          'Using if statements before return',
          'Using ternary operators',
          'Using logical && operator',
          'All of the above',
        ],
        correctAnswer: 3,
        explanation: 'All these methods are valid for conditional rendering. Choose based on complexity and readability.',
      },
      {
        question: 'What does returning null do in a component?',
        options: [
          'Shows an error',
          'Displays "null"',
          'Renders nothing',
          'Unmounts the component',
        ],
        correctAnswer: 2,
        explanation: 'Returning null from a component renders nothing. It\'s a valid way to conditionally render nothing.',
      },
      {
        question: 'When should you use the && operator for conditional rendering?',
        options: [
          'Always',
          'For simple conditions with two outcomes',
          'Only for one condition to render',
          'Never in React',
        ],
        correctAnswer: 2,
        explanation: 'Use && for simple conditions where you want to render something or nothing. Use ternary for render-one-or-other cases.',
      },
    ],
  },
  {
    lessonTitle: 'Lists and Keys',
    questions: [
      {
        question: 'Why does React require a key prop for list items?',
        options: [
          'For styling purposes',
          'To help React identify which items changed',
          'To improve performance slightly',
          'It\'s not required, just recommended',
        ],
        correctAnswer: 1,
        explanation: 'Keys help React identify which items changed, were added, or were removed. This is crucial for proper list rendering.',
      },
      {
        question: 'Is using array index as a key safe?',
        options: [
          'Yes, always safe',
          'Safe for dynamic lists',
          'Only safe for static lists',
          'Never safe',
        ],
        correctAnswer: 2,
        explanation: 'Using index as a key is only safe for static lists. For dynamic lists, it causes bugs because indices change.',
      },
      {
        question: 'How do you render a list in React?',
        options: [
          'Using for loops',
          'Using array.map() method',
          'Using foreach loops',
          'Using while loops',
        ],
        correctAnswer: 1,
        explanation: 'Use array.map() to transform an array of data into JSX elements. It\'s the idiomatic React way.',
      },
      {
        question: 'What should be a unique key?',
        options: [
          'Something that changes every render',
          'An index that doesn\'t change',
          'A stable identifier unique to each item',
          'The item\'s position in the array',
        ],
        correctAnswer: 2,
        explanation: 'Keys should be stable identifiers (like IDs from a database) that don\'t change between renders.',
      },
      {
        question: 'What happens if you don\'t provide keys in a list?',
        options: [
          'Nothing, it still works fine',
          'React will use indices automatically',
          'Bugs in dynamic lists and state management',
          'The app will crash',
        ],
        correctAnswer: 2,
        explanation: 'Without proper keys, dynamic lists can have bugs with state management and component instances.',
      },
    ],
  },

  // Module 3 Quizzes
  {
    lessonTitle: 'Managing State with useState',
    questions: [
      {
        question: 'What does useState hook return?',
        options: [
          'Just the state value',
          'An array with [state, setState]',
          'An object with state properties',
          'A promise',
        ],
        correctAnswer: 1,
        explanation: 'useState returns an array with two elements: the current state value and a function to update it.',
      },
      {
        question: 'How many times does a component re-render when you call setState?',
        options: [
          'Once immediately',
          'Asynchronously, batched with other updates',
          'Multiple times to update all state',
          'Not at all',
        ],
        correctAnswer: 1,
        explanation: 'setState is asynchronous and React batches state updates for efficiency.',
      },
      {
        question: 'Can you store any type of value in state?',
        options: [
          'Only strings and numbers',
          'Any JavaScript value',
          'Only objects',
          'Only primitives',
        ],
        correctAnswer: 1,
        explanation: 'State can hold any JavaScript value: strings, numbers, arrays, objects, functions, etc.',
      },
      {
        question: 'What is the proper way to update an object in state?',
        options: [
          'Directly modify the object',
          'Use setState with the same object reference',
          'Create a new object with spread operator',
          'Use Object.assign on existing state',
        ],
        correctAnswer: 2,
        explanation: 'Always create a new object when updating state. React uses reference equality to detect changes.',
      },
    ],
  },
  {
    lessonTitle: 'Handling Events',
    questions: [
      {
        question: 'In React event names are:',
        options: [
          'lowercase like DOM events',
          'camelCase like onClick, onChange',
          'UPPERCASE',
          'with dashes like on-click',
        ],
        correctAnswer: 1,
        explanation: 'React uses camelCase for event names: onClick, onChange, onSubmit, etc.',
      },
      {
        question: 'How do you prevent default form submission?',
        options: [
          'Return false',
          'Call e.preventDefault()',
          'Use onclick="return false"',
          'Add prevent-default attribute',
        ],
        correctAnswer: 1,
        explanation: 'Use e.preventDefault() in the event handler to prevent default form submission behavior.',
      },
      {
        question: 'How do you pass arguments to an event handler?',
        options: [
          'onClick={handleClick(5)}',
          'onClick={() => handleClick(5)}',
          'onClick="handleClick(5)"',
          'onClick={handleClick 5}',
        ],
        correctAnswer: 1,
        explanation: 'Use an arrow function to pass arguments to event handlers: onClick={() => handleClick(5)}',
      },
      {
        question: 'What is the event object in React?',
        options: [
          'A DOM event (SyntheticEvent wrapper)',
          'A custom React object',
          'A DOM EventTarget',
          'Always undefined',
        ],
        correctAnswer: 0,
        explanation: 'React wraps browser events in a cross-browser compatible SyntheticEvent object.',
      },
    ],
  },
  {
    lessonTitle: 'Lifting State Up',
    questions: [
      {
        question: 'When should you lift state up?',
        options: [
          'Always at the root component',
          'When multiple components need the same state',
          'For better performance',
          'When state is complex',
        ],
        correctAnswer: 1,
        explanation: 'Lift state to the lowest common parent of components that need to share state.',
      },
      {
        question: 'What is the benefit of lifting state up?',
        options: [
          'Improved performance',
          'Easier styling',
          'Single source of truth',
          'Simpler imports',
        ],
        correctAnswer: 2,
        explanation: 'Lifting state creates a single source of truth, making it easier to manage and debug state changes.',
      },
      {
        question: 'How do child components update parent state?',
        options: [
          'Directly modify parent.state',
          'Call parent methods passed as props',
          'Use Context API',
          'Use localStorage',
        ],
        correctAnswer: 1,
        explanation: 'Parent passes callback functions as props that children call to update parent state.',
      },
    ],
  },

  // Module 4 Quizzes
  {
    lessonTitle: 'useEffect: Side Effects',
    questions: [
      {
        question: 'When does useEffect run?',
        options: [
          'Before the component renders',
          'After the component renders',
          'During component initialization',
          'Never, it\'s for class components',
        ],
        correctAnswer: 1,
        explanation: 'useEffect runs after the component renders, making it perfect for side effects.',
      },
      {
        question: 'What does an empty dependency array [] mean?',
        options: [
          'Run every render',
          'Never run',
          'Run once after initial render',
          'Run only when props change',
        ],
        correctAnswer: 2,
        explanation: 'An empty dependency array means the effect runs once when the component mounts.',
      },
      {
        question: 'Why should you return a cleanup function from useEffect?',
        options: [
          'To improve performance',
          'To prevent memory leaks',
          'To stop infinite loops',
          'It\'s optional and not important',
        ],
        correctAnswer: 1,
        explanation: 'Cleanup functions prevent memory leaks by cleaning up subscriptions, timers, and event listeners.',
      },
      {
        question: 'What happens if you omit the dependency array?',
        options: [
          'Effect runs once',
          'Effect never runs',
          'Effect runs after every render',
          'Error is thrown',
        ],
        correctAnswer: 2,
        explanation: 'Without a dependency array, useEffect runs after every render, which is often not desired.',
      },
    ],
  },
  {
    lessonTitle: 'useContext: Global State',
    questions: [
      {
        question: 'What problem does useContext solve?',
        options: [
          'Memory management',
          'Prop drilling',
          'Performance issues',
          'Event handling',
        ],
        correctAnswer: 1,
        explanation: 'useContext avoids prop drilling by allowing components to access values without passing through every component layer.',
      },
      {
        question: 'How do you create a Context?',
        options: [
          'new Context()',
          'createContext()',
          'React.createContext()',
          'useCreateContext()',
        ],
        correctAnswer: 2,
        explanation: 'Use React.createContext() or the createContext function from React to create a context.',
      },
      {
        question: 'What happens when context value changes?',
        options: [
          'Only the provider re-renders',
          'All consumers re-render',
          'Nothing changes',
          'Only one consumer re-renders',
        ],
        correctAnswer: 1,
        explanation: 'When context value changes, all components consuming that context will re-render.',
      },
    ],
  },
  {
    lessonTitle: 'useReducer: Complex State',
    questions: [
      {
        question: 'What does a reducer function do?',
        options: [
          'Reduces code size',
          'Takes state and action, returns new state',
          'Combines multiple states',
          'Deletes state properties',
        ],
        correctAnswer: 1,
        explanation: 'A reducer function takes the current state and an action, then returns the new state.',
      },
      {
        question: 'How do you trigger a reducer action?',
        options: [
          'Call the reducer directly',
          'Use the dispatch function',
          'Modify state directly',
          'Call useReducer again',
        ],
        correctAnswer: 1,
        explanation: 'useReducer returns a dispatch function that you call with an action object.',
      },
      {
        question: 'Should a reducer be a pure function?',
        options: [
          'No, it can have side effects',
          'Yes, same input should give same output',
          'Only for large apps',
          'It doesn\'t matter',
        ],
        correctAnswer: 1,
        explanation: 'Reducers should be pure functions - same input always produces same output, with no side effects.',
      },
      {
        question: 'When should you use useReducer over useState?',
        options: [
          'Always use useReducer',
          'For complex state with multiple actions',
          'Never use useReducer',
          'Only in class components',
        ],
        correctAnswer: 1,
        explanation: 'Use useReducer when you have complex state logic with multiple related state updates.',
      },
    ],
  },
  {
    lessonTitle: 'Custom Hooks',
    questions: [
      {
        question: 'What makes a function a custom Hook?',
        options: [
          'It uses React libraries',
          'It calls other Hooks',
          'Its name starts with "use"',
          'It returns JSX',
        ],
        correctAnswer: 2,
        explanation: 'Custom Hooks are functions whose names start with "use" and can call other Hooks.',
      },
      {
        question: 'Can a custom Hook return state?',
        options: [
          'No, custom hooks are helpers only',
          'Yes, it can return anything',
          'Only if it\'s an object',
          'Only if wrapped in a custom component',
        ],
        correctAnswer: 1,
        explanation: 'Custom Hooks can return any value: state, functions, objects, etc.',
      },
      {
        question: 'Does each component calling a custom Hook have separate state?',
        options: [
          'No, state is shared',
          'Yes, each instance has its own state',
          'Depends on implementation',
          'State is never isolated',
        ],
        correctAnswer: 1,
        explanation: 'Each component instance calling a custom Hook has its own independent state.',
      },
    ],
  },

  // Module 5 Quizzes
  {
    lessonTitle: 'Styling in React',
    questions: [
      {
        question: 'What is a major limitation of inline styles?',
        options: [
          'They are too fast',
          'Cannot use CSS features like media queries',
          'They don\'t work in React',
          'They are too flexible',
        ],
        correctAnswer: 1,
        explanation: 'Inline styles are JavaScript objects and cannot support CSS features like media queries, pseudo-classes, etc.',
      },
      {
        question: 'What is Tailwind CSS?',
        options: [
          'A CSS preprocessor',
          'A utility-first CSS framework',
          'A JavaScript animation library',
          'A styling tool for class components only',
        ],
        correctAnswer: 1,
        explanation: 'Tailwind CSS is a utility-first CSS framework that provides pre-made classes for styling.',
      },
      {
        question: 'What advantage does CSS Modules provide?',
        options: [
          'Faster performance',
          'Scoped styling to avoid conflicts',
          'Global styling for all components',
          'Smaller bundle size',
        ],
        correctAnswer: 1,
        explanation: 'CSS Modules provide scoped styling where class names are local by default, preventing naming conflicts.',
      },
      {
        question: 'When would you use styled-components?',
        options: [
          'Always instead of CSS',
          'When you want CSS-in-JS with scoped styles',
          'Never in React apps',
          'Only for styling class components',
        ],
        correctAnswer: 1,
        explanation: 'styled-components is a CSS-in-JS library that provides component-scoped styling with the full power of CSS.',
      },
    ],
  },
  {
    lessonTitle: 'Performance Optimization',
    questions: [
      {
        question: 'What is code splitting?',
        options: [
          'Breaking code into functions',
          'Loading code on demand, not upfront',
          'Splitting CSS and JavaScript',
          'Removing duplicate code',
        ],
        correctAnswer: 1,
        explanation: 'Code splitting loads code chunks only when needed, improving initial page load time.',
      },
      {
        question: 'What does React.memo do?',
        options: [
          'Memorizes data in localStorage',
          'Prevents re-renders if props haven\'t changed',
          'Improves bundle size',
          'Caches API requests',
        ],
        correctAnswer: 1,
        explanation: 'React.memo is a higher-order component that memoizes a component and prevents unnecessary re-renders.',
      },
      {
        question: 'When should you optimize?',
        options: [
          'Always, for all code',
          'Before measuring performance',
          'After identifying bottlenecks',
          'Never, it\'s not important',
        ],
        correctAnswer: 2,
        explanation: 'Always measure performance first using tools like Profiler to identify real bottlenecks before optimizing.',
      },
      {
        question: 'What is lazy loading?',
        options: [
          'Loading components slowly intentionally',
          'Loading resources only when needed',
          'Postponing all renders',
          'Never loading resources',
        ],
        correctAnswer: 1,
        explanation: 'Lazy loading delays loading of resources until they\'re actually needed, improving performance.',
      },
    ],
  },
];
