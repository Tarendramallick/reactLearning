export const QUIZZES = [
  {
    id: 1,
    lessonTitle: "What is React?",
    questions: [
      {
        id: "q1",
        question: "What is React?",
        options: [
          "A JavaScript library for building user interfaces",
          "A Python framework for web development",
          "A CSS framework",
          "A database management system"
        ],
        correctAnswer: 0,
        explanation: "React is a JavaScript library developed by Facebook for building dynamic and interactive user interfaces using components and a virtual DOM."
      },
      {
        id: "q2",
        question: "Who created React?",
        options: [
          "Google",
          "Facebook (Meta)",
          "Microsoft",
          "Twitter"
        ],
        correctAnswer: 1,
        explanation: "React was created by Facebook (now Meta) and was open-sourced in 2013. It was created to handle the complexity of building dynamic UIs."
      },
      {
        id: "q3",
        question: "What does Virtual DOM do in React?",
        options: [
          "Stores all data in memory",
          "Creates a virtual representation of the UI in memory to optimize updates",
          "Manages CSS styling",
          "Handles HTTP requests"
        ],
        correctAnswer: 1,
        explanation: "The Virtual DOM is a lightweight copy of the real DOM. React uses it to efficiently determine what changes need to be made to the actual DOM, improving performance."
      },
      {
        id: "q4",
        question: "Why is React popular for building web applications?",
        options: [
          "It's the only way to build websites",
          "It's reusable components, efficient rendering, and large ecosystem",
          "It doesn't require learning JavaScript",
          "It handles backend automatically"
        ],
        correctAnswer: 1,
        explanation: "React is popular because of its component-based architecture, virtual DOM for efficient updates, one-way data flow, and a huge ecosystem of libraries and tools."
      },
      {
        id: "q5",
        question: "What is a component in React?",
        options: [
          "A function that makes network requests",
          "A reusable piece of UI that can be composed together",
          "A CSS file",
          "A database table"
        ],
        correctAnswer: 1,
        explanation: "A React component is a reusable, self-contained piece of UI. Components can be functional or class-based and can be composed together to build complex UIs."
      }
    ],
    passingScore: 70
  },
  {
    id: 2,
    lessonTitle: "Understanding JSX",
    questions: [
      {
        id: "q1",
        question: "What does JSX stand for?",
        options: [
          "JavaScript XML",
          "Java Syntax Extension",
          "JSON X-format",
          "JavaScript Extra"
        ],
        correctAnswer: 0,
        explanation: "JSX stands for JavaScript XML. It's a syntax extension to JavaScript that allows you to write HTML-like code in your JavaScript files."
      },
      {
        id: "q2",
        question: "Is JSX valid JavaScript?",
        options: [
          "Yes, browsers understand it directly",
          "No, it must be compiled to JavaScript first",
          "Only in modern browsers",
          "Only with special plugins"
        ],
        correctAnswer: 1,
        explanation: "JSX is not valid JavaScript. It must be compiled/transpiled (usually by Babel) into regular JavaScript function calls before the browser can understand it."
      },
      {
        id: "q3",
        question: "How do you embed a JavaScript expression in JSX?",
        options: [
          "Use double curly braces {{ }}",
          "Use single curly braces { }",
          "Use square brackets [ ]",
          "Use parentheses ( )"
        ],
        correctAnswer: 1,
        explanation: "You use single curly braces { } to embed JavaScript expressions in JSX. For example: <div>{name}</div> will display the value of the name variable."
      },
      {
        id: "q4",
        question: "What happens when React compiles this JSX: <div>Hello</div>",
        options: [
          "It creates an HTML string",
          "It creates a React.createElement() function call",
          "It sends it to the server",
          "It stores it in the Virtual DOM"
        ],
        correctAnswer: 1,
        explanation: "React compiles JSX elements to React.createElement() calls. <div>Hello</div> becomes React.createElement('div', null, 'Hello')."
      },
      {
        id: "q5",
        question: "Can you use CSS class names directly in JSX?",
        options: [
          "Yes, <div class='myClass'>",
          "No, you must use className instead: <div className='myClass'>",
          "You need to import CSS first",
          "Only in styled-components"
        ],
        correctAnswer: 1,
        explanation: "In JSX, you must use 'className' instead of 'class' because 'class' is a reserved keyword in JavaScript. <div className='myClass'> is the correct syntax."
      }
    ],
    passingScore: 70
  },
  {
    id: 3,
    lessonTitle: "Components and Props",
    questions: [
      {
        id: "q1",
        question: "What are the two types of React components?",
        options: [
          "Local and Global",
          "Functional and Class components",
          "Simple and Complex",
          "Static and Dynamic"
        ],
        correctAnswer: 1,
        explanation: "React has two types of components: Functional components (JavaScript functions) and Class components (ES6 classes extending React.Component)."
      },
      {
        id: "q2",
        question: "What are props in React?",
        options: [
          "A way to store component state",
          "Read-only data passed from parent to child components",
          "Methods for updating the UI",
          "CSS properties"
        ],
        correctAnswer: 1,
        explanation: "Props (properties) are read-only data passed from a parent component to a child component. They allow you to customize component behavior and appearance."
      },
      {
        id: "q3",
        question: "Can you modify props inside a child component?",
        options: [
          "Yes, props are mutable",
          "No, props are immutable and cannot be modified",
          "Only if you use setState",
          "Only in class components"
        ],
        correctAnswer: 1,
        explanation: "Props are immutable. If you need to change the value, the parent component must update it and pass the new value as a prop."
      },
      {
        id: "q4",
        question: "How do you pass props to a component?",
        options: [
          "Inside the component definition",
          "As attributes on the component tag: <Button color='red' />",
          "Using import statements",
          "Through function parameters"
        ],
        correctAnswer: 1,
        explanation: "Props are passed as attributes on the component tag. For example: <Button color='red' size='large' /> passes color and size props to the Button component."
      },
      {
        id: "q5",
        question: "What is prop drilling?",
        options: [
          "A way to extract props from components",
          "Passing props through many levels of components unnecessarily",
          "The process of learning about props",
          "A performance optimization technique"
        ],
        correctAnswer: 1,
        explanation: "Prop drilling is passing props through multiple intermediate components that don't use them, just to get them to a deeply nested component. Context API or state management can solve this."
      }
    ],
    passingScore: 70
  },
  {
    id: 4,
    lessonTitle: "State and Hooks",
    questions: [
      {
        id: "q1",
        question: "What is state in React?",
        options: [
          "A permanent variable in the component",
          "Data that can change and trigger UI updates when changed",
          "The same as props",
          "A function parameter"
        ],
        correctAnswer: 1,
        explanation: "State is mutable data that belongs to a component. When state changes, React re-renders the component to reflect the new data."
      },
      {
        id: "q2",
        question: "How do you use the useState hook?",
        options: [
          "useState() returns state and a setter function as an array",
          "useState(value) directly updates state",
          "You don't need useState in modern React",
          "useState is only for class components"
        ],
        correctAnswer: 0,
        explanation: "useState returns an array with two elements: [state, setState]. Example: const [count, setCount] = useState(0); creates a state variable 'count' initialized to 0."
      },
      {
        id: "q3",
        question: "What's the difference between state and props?",
        options: [
          "State is mutable and internal, props are immutable and passed from parent",
          "They are the same thing",
          "Props are for functions, state is for classes",
          "State is for CSS, props are for JavaScript"
        ],
        correctAnswer: 0,
        explanation: "State is data owned and controlled by a component that can change. Props are read-only data passed from a parent component to a child."
      },
      {
        id: "q4",
        question: "What does the useEffect hook do?",
        options: [
          "It manages component state",
          "It performs side effects like fetching data or subscriptions",
          "It passes props to child components",
          "It handles component styling"
        ],
        correctAnswer: 1,
        explanation: "useEffect lets you perform side effects (data fetching, subscriptions, timers) in functional components. It runs after every render by default."
      },
      {
        id: "q5",
        question: "What is the dependency array in useEffect for?",
        options: [
          "To store component dependencies",
          "To control when the effect runs based on dependency changes",
          "To manage props",
          "It's optional and doesn't affect behavior"
        ],
        correctAnswer: 1,
        explanation: "The dependency array tells useEffect when to run. An empty array [] means run once on mount. [dep1, dep2] means run when those dependencies change."
      }
    ],
    passingScore: 70
  },
  {
    id: 5,
    lessonTitle: "Event Handling and Forms",
    questions: [
      {
        id: "q1",
        question: "How do you handle a click event in React?",
        options: [
          "onclick='handleClick()' like in HTML",
          "onClick={handleClick} as a prop",
          "on:click={handleClick}",
          "click.addEventListener"
        ],
        correctAnswer: 1,
        explanation: "In React, event handlers are passed as props using camelCase names. onClick={handleClick} is the correct syntax for handling click events."
      },
      {
        id: "q2",
        question: "What is event binding in React?",
        options: [
          "Connecting the event handler to the DOM element",
          "Creating a new instance of the component",
          "Passing event data through props",
          "Preventing default event behavior"
        ],
        correctAnswer: 0,
        explanation: "Event binding connects event handlers to DOM elements. In functional components, this is handled automatically. In class components, you might need to bind in the constructor."
      },
      {
        id: "q3",
        question: "How do you prevent default form submission in React?",
        options: [
          "return false from the handler",
          "Call e.preventDefault() in the event handler",
          "Use return: false in the form tag",
          "It's handled automatically"
        ],
        correctAnswer: 1,
        explanation: "To prevent default form submission, call e.preventDefault() in your submit handler. This prevents the page from reloading and allows you to handle the submission with JavaScript."
      },
      {
        id: "q4",
        question: "What is a controlled component in React?",
        options: [
          "A component that controls other components",
          "An input whose value is controlled by React state",
          "A component with many event handlers",
          "A component imported from a library"
        ],
        correctAnswer: 1,
        explanation: "A controlled component is an input (text, textarea, select) where the value is controlled by React state. You update state onChange and display it with value={state}."
      },
      {
        id: "q5",
        question: "Why use controlled components over uncontrolled?",
        options: [
          "They are faster",
          "They provide better control and validation of form data",
          "They don't require state",
          "They are required in modern React"
        ],
        correctAnswer: 1,
        explanation: "Controlled components give you full control over input values, making it easy to validate, format, or respond to changes in real-time."
      }
    ],
    passingScore: 70
  },
  {
    id: 6,
    lessonTitle: "Conditional Rendering",
    questions: [
      {
        id: "q1",
        question: "What is conditional rendering?",
        options: [
          "Rendering HTML based on a condition",
          "Using CSS media queries",
          "Rendering different components based on conditions",
          "Both A and C"
        ],
        correctAnswer: 3,
        explanation: "Conditional rendering means rendering different content based on conditions. This can be done with if/else, ternary operators, or logical AND operators."
      },
      {
        id: "q2",
        question: "Which approach is commonly used for ternary operators in JSX?",
        options: [
          "if (condition) return <A /> else return <B />",
          "condition ? <A /> : <B />",
          "{condition && <A />}",
          "switch(condition) case <A />"
        ],
        correctAnswer: 1,
        explanation: "Ternary operators are useful for inline conditionals: condition ? <CompA /> : <CompB /> renders CompA if true, CompB if false."
      },
      {
        id: "q3",
        question: "How do you render something only if a condition is true?",
        options: [
          "condition ? <Component /> : null",
          "condition && <Component />",
          "Both A and B work",
          "You must use if statements"
        ],
        correctAnswer: 2,
        explanation: "Both approaches work. The logical AND operator && is cleaner for single conditions: condition && <Component /> renders nothing if false."
      },
      {
        id: "q4",
        question: "What should you avoid in conditional rendering?",
        options: [
          "Using ternary operators",
          "Rendering null",
          "Using && with 0 or empty string on the left",
          "Checking boolean props"
        ],
        correctAnswer: 2,
        explanation: "Avoid using && with 0 or empty strings on the left because they're falsy. Example: 0 && <Component /> renders '0' instead of nothing."
      },
      {
        id: "q5",
        question: "How do you conditionally apply CSS classes?",
        options: [
          "className={condition ? 'class1' : 'class2'}",
          "Use JavaScript string concatenation",
          "Use template literals: className={`class ${condition && 'active'}`}",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "All approaches work. The most common are ternary operators for two classes, or template literals for more complex logic."
      }
    ],
    passingScore: 70
  },
  {
    id: 7,
    lessonTitle: "Lists and Keys",
    questions: [
      {
        id: "q1",
        question: "How do you render a list of items in React?",
        options: [
          "Using a for loop inside JSX",
          "Using the map() function",
          "Using forEach() method",
          "Manually creating each item"
        ],
        correctAnswer: 1,
        explanation: "Use the map() function to transform an array into a list of React elements. Example: items.map(item => <li key={item.id}>{item.name}</li>)"
      },
      {
        id: "q2",
        question: "Why do list items in React need a key prop?",
        options: [
          "To prevent errors",
          "To help React identify which items have changed, been added, or removed",
          "To improve styling",
          "It's not necessary but recommended"
        ],
        correctAnswer: 1,
        explanation: "Keys help React identify which items have changed. Without keys, React might re-render more than necessary, affecting performance."
      },
      {
        id: "q3",
        question: "What should you use as a key?",
        options: [
          "The index of the array",
          "A unique identifier from the data",
          "The item's name",
          "Any unique string"
        ],
        correctAnswer: 1,
        explanation: "Use a unique ID from your data as the key (not the array index). Array indices can change if items are reordered, causing bugs."
      },
      {
        id: "q4",
        question: "What happens if you use the array index as a key?",
        options: [
          "It works perfectly fine",
          "Performance issues and bugs with reordering, filtering, or adding items",
          "It prevents component state from working",
          "Keys are not used by React"
        ],
        correctAnswer: 1,
        explanation: "Using array indices as keys causes problems when lists are filtered, sorted, or items are added/removed because indices change."
      },
      {
        id: "q5",
        question: "How do you render a filtered list?",
        options: [
          "items.map() then filter with if statements",
          "items.filter().map() to first filter, then render",
          "Use a for loop to manually filter",
          "Filter on the server only"
        ],
        correctAnswer: 1,
        explanation: "Chain filter() and map() methods: items.filter(item => item.active).map(item => <li key={item.id}>{item.name}</li>)"
      }
    ],
    passingScore: 70
  }
];

export const QUIZ_DEFINITIONS = {
  "React": "A JavaScript library for building user interfaces with reusable components and efficient rendering.",
  "Component": "A reusable piece of UI that encapsulates structure (JSX), behavior (logic), and styling.",
  "JSX": "JavaScript XML - a syntax extension allowing you to write HTML-like code in JavaScript files.",
  "Props": "Read-only data passed from parent to child components to customize behavior and appearance.",
  "State": "Mutable data owned by a component that triggers re-renders when updated.",
  "Virtual DOM": "An in-memory representation of the real DOM used by React to optimize updates.",
  "Hook": "A function that lets you use React features like state and side effects in functional components.",
  "useState": "A hook that adds state to functional components, returning [state, setState].",
  "useEffect": "A hook for performing side effects like fetching data, after the component renders.",
  "Rendering": "The process of converting JSX and data into HTML that appears on the screen.",
  "Re-rendering": "When a component's JSX is converted to HTML again due to state/props changes.",
  "Conditional Rendering": "Displaying different content based on conditions using if/else or ternary operators.",
  "Event Handler": "A function that runs in response to user interactions like clicks or form submissions.",
  "Controlled Component": "An input whose value is controlled by React state instead of the DOM.",
  "Key": "A unique identifier for list items that helps React track which items changed.",
  "Dependency Array": "An array in useEffect specifying when the effect should run based on dependency changes.",
  "Binding": "Connecting an event handler to a component so it has the correct 'this' context.",
  "Prop Drilling": "Passing props through multiple levels of components just to reach a deeply nested component.",
  "Side Effect": "Operations like API calls, subscriptions, or DOM updates that happen after rendering.",
};
