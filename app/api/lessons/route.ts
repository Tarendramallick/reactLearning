'use server';

const lessons = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Variables, functions, ES6 features, promises & async/await",
    icon: "📚",
    completed: false,
    topics: [
      "Variables (let, const)",
      "Functions & Arrow Functions",
      "ES6 Features",
      "Promises & Async/Await"
    ]
  },
  {
    id: 2,
    title: "React Fundamentals",
    description: "Introduction to React, JSX, components, and state basics",
    icon: "⚛️",
    completed: false,
    topics: [
      "What is React?",
      "JSX Syntax",
      "Components & Props",
      "useState Hook"
    ]
  },
  {
    id: 3,
    title: "JSX & Rendering",
    description: "Master JSX syntax, conditional rendering, and element embedding",
    icon: "</>",
    completed: false,
    topics: [
      "JSX Rules",
      "Embedding Expressions",
      "Conditional Rendering",
      "Lists & Keys"
    ]
  },
  {
    id: 4,
    title: "Components",
    description: "Functional components, component composition, and reusability",
    icon: "🧩",
    completed: false,
    topics: [
      "Functional Components",
      "Component Structure",
      "Composition & Reusability",
      "Component Best Practices"
    ]
  },
  {
    id: 5,
    title: "Props & Data Flow",
    description: "Master data passing with props and prop destructuring",
    icon: "📤",
    completed: false,
    topics: [
      "Passing Props",
      "Props Destructuring",
      "Default Props",
      "Prop Validation"
    ]
  },
  {
    id: 6,
    title: "State Management",
    description: "useState, state updates, lifecycle with hooks",
    icon: "🗄️",
    completed: false,
    topics: [
      "useState Hook",
      "State Updates",
      "Multiple State Variables",
      "State Best Practices"
    ]
  },
  {
    id: 7,
    title: "Event Handling",
    description: "Handle user interactions, form inputs, and events",
    icon: "🖱️",
    completed: false,
    topics: [
      "Event Handling",
      "Form Handling",
      "Event Propagation",
      "Controlled Components"
    ]
  },
  {
    id: 8,
    title: "Conditional Rendering",
    description: "if/else, ternary operators, and logical AND rendering",
    icon: "🔀",
    completed: false,
    topics: [
      "if/else Conditions",
      "Ternary Operators",
      "Logical AND (&&)",
      "Switch Statements"
    ]
  },
  {
    id: 9,
    title: "Lists & Keys",
    description: "Render lists with map, understand keys for performance",
    icon: "📋",
    completed: false,
    topics: [
      "Rendering Lists",
      "Using map()",
      "Keys in Lists",
      "Performance Tips"
    ]
  },
  {
    id: 10,
    title: "Side Effects",
    description: "useEffect hook for data fetching and dependency management",
    icon: "⚡",
    completed: false,
    topics: [
      "useEffect Hook",
      "Cleanup Functions",
      "Dependency Array",
      "API Calls"
    ]
  },
  {
    id: 11,
    title: "Routing",
    description: "React Router for client-side navigation",
    icon: "🧭",
    completed: false,
    topics: [
      "React Router Setup",
      "Routes & Links",
      "Dynamic Routes",
      "Route Parameters"
    ]
  },
  {
    id: 12,
    title: "Forms & Validation",
    description: "Form handling, validation, and error messages",
    icon: "📝",
    completed: false,
    topics: [
      "Form Inputs",
      "Form Submission",
      "Validation",
      "Error Handling"
    ]
  },
  {
    id: 13,
    title: "Advanced State Management",
    description: "useReducer, Context API, and state management patterns",
    icon: "👥",
    completed: false,
    topics: [
      "useReducer Hook",
      "Context API",
      "Prop Drilling",
      "Custom Hooks"
    ]
  },
  {
    id: 14,
    title: "API Integration",
    description: "HTTP requests, fetch API, axios, and error handling",
    icon: "🔌",
    completed: false,
    topics: [
      "HTTP Basics",
      "Fetch API",
      "Axios Library",
      "Error Handling"
    ]
  },
  {
    id: 15,
    title: "Performance Optimization",
    description: "useMemo, useCallback, memoization, and React.memo",
    icon: "⚙️",
    completed: false,
    topics: [
      "useMemo Hook",
      "useCallback Hook",
      "React.memo",
      "Code Splitting"
    ]
  },
  {
    id: 16,
    title: "Custom Hooks",
    description: "Create reusable hook logic and hook design patterns",
    icon: "🎣",
    completed: false,
    topics: [
      "Creating Custom Hooks",
      "Hook Patterns",
      "Hook Rules",
      "Testing Hooks"
    ]
  },
  {
    id: 17,
    title: "Project Architecture",
    description: "Project structure, folder organization, and scalable design",
    icon: "🏗️",
    completed: false,
    topics: [
      "Folder Structure",
      "Component Organization",
      "Best Practices",
      "Naming Conventions"
    ]
  },
  {
    id: 18,
    title: "Deployment & Production",
    description: "Build process, deployment platforms, and environment configuration",
    icon: "🚀",
    completed: false,
    topics: [
      "Build Process",
      "Vercel Deployment",
      "Environment Variables",
      "Performance Monitoring"
    ]
  }
];

export async function GET() {
  return Response.json(lessons);
}
