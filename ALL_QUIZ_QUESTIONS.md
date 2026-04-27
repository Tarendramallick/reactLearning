# All 35 Quiz Questions - Complete Reference

## Quick Summary
- **Total Quizzes:** 7
- **Questions per Quiz:** 5
- **Total Questions:** 35
- **Options per Question:** 4 (A, B, C, D)
- **Passing Score:** 70% (at least 4/5 correct)
- **Status:** All questions answered with detailed explanations

---

## Quiz 1: What is React? (5 Questions)

**Question 1: What is React?**
- A. A JavaScript library for building user interfaces
- B. A Python framework for web development
- C. A CSS framework
- D. A database management system
- **Answer:** A ✓
- **Explanation:** React is a JavaScript library developed by Facebook for building dynamic and interactive user interfaces using components and a virtual DOM.

**Question 2: Who created React?**
- A. Google
- B. Facebook (Meta)
- C. Microsoft
- D. Twitter
- **Answer:** B ✓
- **Explanation:** React was created by Facebook (now Meta) and was open-sourced in 2013. It was created to handle the complexity of building dynamic UIs.

**Question 3: What does Virtual DOM do in React?**
- A. Stores all data in memory
- B. Creates a virtual representation of the UI in memory to optimize updates
- C. Manages CSS styling
- D. Handles HTTP requests
- **Answer:** B ✓
- **Explanation:** The Virtual DOM is a lightweight copy of the real DOM. React uses it to efficiently determine what changes need to be made to the actual DOM, improving performance.

**Question 4: Why is React popular for building web applications?**
- A. It's the only way to build websites
- B. It's reusable components, efficient rendering, and large ecosystem
- C. It doesn't require learning JavaScript
- D. It handles backend automatically
- **Answer:** B ✓
- **Explanation:** React is popular because of its component-based architecture, virtual DOM for efficient updates, one-way data flow, and a huge ecosystem of libraries and tools.

**Question 5: What is a component in React?**
- A. A function that makes network requests
- B. A reusable piece of UI that can be composed together
- C. A CSS file
- D. A database table
- **Answer:** B ✓
- **Explanation:** A React component is a reusable, self-contained piece of UI. Components can be functional or class-based and can be composed together to build complex UIs.

---

## Quiz 2: Understanding JSX (5 Questions)

**Question 1: What does JSX stand for?**
- A. JavaScript XML
- B. Java Syntax Extension
- C. JSON X-format
- D. JavaScript Extra
- **Answer:** A ✓
- **Explanation:** JSX stands for JavaScript XML. It's a syntax extension to JavaScript that allows you to write HTML-like code in your JavaScript files.

**Question 2: Is JSX valid JavaScript?**
- A. Yes, browsers understand it directly
- B. No, it must be compiled to JavaScript first
- C. Only in modern browsers
- D. Only with special plugins
- **Answer:** B ✓
- **Explanation:** JSX is not valid JavaScript. It must be compiled/transpiled (usually by Babel) into regular JavaScript function calls before the browser can understand it.

**Question 3: How do you embed a JavaScript expression in JSX?**
- A. Use double curly braces {{ }}
- B. Use single curly braces { }
- C. Use square brackets [ ]
- D. Use parentheses ( )
- **Answer:** B ✓
- **Explanation:** You use single curly braces { } to embed JavaScript expressions in JSX. For example: <div>{name}</div> will display the value of the name variable.

**Question 4: What happens when React compiles this JSX: <div>Hello</div>**
- A. It creates an HTML string
- B. It creates a React.createElement() function call
- C. It sends it to the server
- D. It stores it in the Virtual DOM
- **Answer:** B ✓
- **Explanation:** React compiles JSX elements to React.createElement() calls. <div>Hello</div> becomes React.createElement('div', null, 'Hello').

**Question 5: Can you use CSS class names directly in JSX?**
- A. Yes, <div class='myClass'>
- B. No, you must use className instead: <div className='myClass'>
- C. You need to import CSS first
- D. Only in styled-components
- **Answer:** B ✓
- **Explanation:** In JSX, you must use 'className' instead of 'class' because 'class' is a reserved keyword in JavaScript. <div className='myClass'> is the correct syntax.

---

## Quiz 3: Components and Props (5 Questions)

**Question 1: What are the two types of React components?**
- A. Local and Global
- B. Functional and Class components
- C. Simple and Complex
- D. Static and Dynamic
- **Answer:** B ✓
- **Explanation:** React has two types of components: Functional components (JavaScript functions) and Class components (ES6 classes extending React.Component).

**Question 2: What are props in React?**
- A. A way to store component state
- B. Read-only data passed from parent to child components
- C. Methods for updating the UI
- D. CSS properties
- **Answer:** B ✓
- **Explanation:** Props (properties) are read-only data passed from a parent component to a child component. They allow you to customize component behavior and appearance.

**Question 3: Can you modify props inside a child component?**
- A. Yes, props are mutable
- B. No, props are immutable and cannot be modified
- C. Only if you use setState
- D. Only in class components
- **Answer:** B ✓
- **Explanation:** Props are immutable. If you need to change the value, the parent component must update it and pass the new value as a prop.

**Question 4: How do you pass props to a component?**
- A. Inside the component definition
- B. As attributes on the component tag: <Button color='red' />
- C. Using import statements
- D. Through function parameters
- **Answer:** B ✓
- **Explanation:** Props are passed as attributes on the component tag. For example: <Button color='red' size='large' /> passes color and size props to the Button component.

**Question 5: What is prop drilling?**
- A. A way to extract props from components
- B. Passing props through many levels of components unnecessarily
- C. The process of learning about props
- D. A performance optimization technique
- **Answer:** B ✓
- **Explanation:** Prop drilling is passing props through multiple intermediate components that don't use them, just to get them to a deeply nested component. Context API or state management can solve this.

---

## Quiz 4: State and Hooks (5 Questions)

**Question 1: What is state in React?**
- A. A permanent variable in the component
- B. Data that can change and trigger UI updates when changed
- C. The same as props
- D. A function parameter
- **Answer:** B ✓
- **Explanation:** State is mutable data that belongs to a component. When state changes, React re-renders the component to reflect the new data.

**Question 2: How do you use the useState hook?**
- A. useState() returns state and a setter function as an array
- B. useState(value) directly updates state
- C. You don't need useState in modern React
- D. useState is only for class components
- **Answer:** A ✓
- **Explanation:** useState returns an array with two elements: [state, setState]. Example: const [count, setCount] = useState(0); creates a state variable 'count' initialized to 0.

**Question 3: What's the difference between state and props?**
- A. State is mutable and internal, props are immutable and passed from parent
- B. They are the same thing
- C. Props are for functions, state is for classes
- D. State is for CSS, props are for JavaScript
- **Answer:** A ✓
- **Explanation:** State is data owned and controlled by a component that can change. Props are read-only data passed from a parent component to a child.

**Question 4: What does the useEffect hook do?**
- A. It manages component state
- B. It performs side effects like fetching data or subscriptions
- C. It passes props to child components
- D. It handles component styling
- **Answer:** B ✓
- **Explanation:** useEffect lets you perform side effects (data fetching, subscriptions, timers) in functional components. It runs after every render by default.

**Question 5: What is the dependency array in useEffect for?**
- A. To store component dependencies
- B. To control when the effect runs based on dependency changes
- C. To manage props
- D. It's optional and doesn't affect behavior
- **Answer:** B ✓
- **Explanation:** The dependency array tells useEffect when to run. An empty array [] means run once on mount. [dep1, dep2] means run when those dependencies change.

---

## Quiz 5: Event Handling and Forms (5 Questions)

**Question 1: How do you handle a click event in React?**
- A. onclick='handleClick()' like in HTML
- B. onClick={handleClick} as a prop
- C. on:click={handleClick}
- D. click.addEventListener
- **Answer:** B ✓
- **Explanation:** In React, event handlers are passed as props using camelCase names. onClick={handleClick} is the correct syntax for handling click events.

**Question 2: What is event binding in React?**
- A. Connecting the event handler to the DOM element
- B. Creating a new instance of the component
- C. Passing event data through props
- D. Preventing default event behavior
- **Answer:** A ✓
- **Explanation:** Event binding connects event handlers to DOM elements. In functional components, this is handled automatically. In class components, you might need to bind in the constructor.

**Question 3: How do you prevent default form submission in React?**
- A. return false from the handler
- B. Call e.preventDefault() in the event handler
- C. Use return: false in the form tag
- D. It's handled automatically
- **Answer:** B ✓
- **Explanation:** To prevent default form submission, call e.preventDefault() in your submit handler. This prevents the page from reloading and allows you to handle the submission with JavaScript.

**Question 4: What is a controlled component in React?**
- A. A component that controls other components
- B. An input whose value is controlled by React state
- C. A component with many event handlers
- D. A component imported from a library
- **Answer:** B ✓
- **Explanation:** A controlled component is an input (text, textarea, select) where the value is controlled by React state. You update state onChange and display it with value={state}.

**Question 5: Why use controlled components over uncontrolled?**
- A. They are faster
- B. They provide better control and validation of form data
- C. They don't require state
- D. They are required in modern React
- **Answer:** B ✓
- **Explanation:** Controlled components give you full control over input values, making it easy to validate, format, or respond to changes in real-time.

---

## Quiz 6: Conditional Rendering (5 Questions)

**Question 1: What is conditional rendering?**
- A. Rendering HTML based on a condition
- B. Using CSS media queries
- C. Rendering different components based on conditions
- D. Both A and C
- **Answer:** D ✓
- **Explanation:** Conditional rendering means rendering different content based on conditions. This can be done with if/else, ternary operators, or logical AND operators.

**Question 2: Which approach is commonly used for ternary operators in JSX?**
- A. if (condition) return <A /> else return <B />
- B. condition ? <A /> : <B />
- C. {condition && <A />}
- D. switch(condition) case <A />
- **Answer:** B ✓
- **Explanation:** Ternary operators are useful for inline conditionals: condition ? <CompA /> : <CompB /> renders CompA if true, CompB if false.

**Question 3: How do you render something only if a condition is true?**
- A. condition ? <Component /> : null
- B. condition && <Component />
- C. Both A and B work
- D. You must use if statements
- **Answer:** C ✓
- **Explanation:** Both approaches work. The logical AND operator && is cleaner for single conditions: condition && <Component /> renders nothing if false.

**Question 4: What should you avoid in conditional rendering?**
- A. Using ternary operators
- B. Rendering null
- C. Using && with 0 or empty string on the left
- D. Checking boolean props
- **Answer:** C ✓
- **Explanation:** Avoid using && with 0 or empty strings on the left because they're falsy. Example: 0 && <Component /> renders '0' instead of nothing.

**Question 5: How do you conditionally apply CSS classes?**
- A. className={condition ? 'class1' : 'class2'}
- B. Use JavaScript string concatenation
- C. Use template literals: className={`class ${condition && 'active'}`}
- D. All of the above
- **Answer:** D ✓
- **Explanation:** All approaches work. The most common are ternary operators for two classes, or template literals for more complex logic.

---

## Quiz 7: Lists and Keys (5 Questions)

**Question 1: How do you render a list of items in React?**
- A. Using a for loop inside JSX
- B. Using the map() function
- C. Using forEach() method
- D. Manually creating each item
- **Answer:** B ✓
- **Explanation:** Use the map() function to transform an array into a list of React elements. Example: items.map(item => <li key={item.id}>{item.name}</li>)

**Question 2: Why do list items in React need a key prop?**
- A. To prevent errors
- B. To help React identify which items have changed, been added, or removed
- C. To improve styling
- D. It's not necessary but recommended
- **Answer:** B ✓
- **Explanation:** Keys help React identify which items have changed. Without keys, React might re-render more than necessary, affecting performance.

**Question 3: What should you use as a key?**
- A. The index of the array
- B. A unique identifier from the data
- C. The item's name
- D. Any unique string
- **Answer:** B ✓
- **Explanation:** Use a unique ID from your data as the key (not the array index). Array indices can change if items are reordered, causing bugs.

**Question 4: What happens if you use the array index as a key?**
- A. It works perfectly fine
- B. Performance issues and bugs with reordering, filtering, or adding items
- C. It prevents component state from working
- D. Keys are not used by React
- **Answer:** B ✓
- **Explanation:** Using array indices as keys causes problems when lists are filtered, sorted, or items are added/removed because indices change.

**Question 5: How do you render a filtered list?**
- A. items.map() then filter with if statements
- B. items.filter().map() to first filter, then render
- C. Use a for loop to manually filter
- D. Filter on the server only
- **Answer:** B ✓
- **Explanation:** Chain filter() and map() methods: items.filter(item => item.active).map(item => <li key={item.id}>{item.name}</li>)

---

## Summary Statistics

| Quiz | Topic | Questions | Answers | Explanations |
|------|-------|-----------|---------|--------------|
| 1 | What is React? | 5 | 5 | 5 |
| 2 | Understanding JSX | 5 | 5 | 5 |
| 3 | Components and Props | 5 | 5 | 5 |
| 4 | State and Hooks | 5 | 5 | 5 |
| 5 | Event Handling | 5 | 5 | 5 |
| 6 | Conditional Rendering | 5 | 5 | 5 |
| 7 | Lists and Keys | 5 | 5 | 5 |
| **TOTAL** | | **35** | **35** | **35** |

---

## Definitions Included

All definitions are provided in the quiz system:
- React
- Component
- JSX
- Props
- State
- Virtual DOM
- Hook
- useState
- useEffect
- Rendering
- Re-rendering
- Conditional Rendering
- Event Handler
- Controlled Component
- Key
- Dependency Array
- Binding
- Prop Drilling
- Side Effect

---

## How to Access

1. **In Code:** `lib/quizzesData.ts` - Complete question data
2. **In App:** Login → Browse Courses → Select Lesson → Take Quiz
3. **API:** `GET /api/quizzes` - Returns all quizzes with questions

---

## Status

✅ All 35 questions written
✅ All correct answers marked
✅ All explanations provided
✅ All definitions created
✅ Auto-grading implemented
✅ Results tracking enabled
✅ Retake functionality available

---

**Ready to test your knowledge!** 🎓
