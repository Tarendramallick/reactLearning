'use server';

const practiceExercises = {
  quizzes: [
    {
      id: 'quiz-1',
      title: 'Variables & Data Types',
      difficulty: 'easy',
      questions: [
        {
          id: 1,
          question: 'What is the difference between let and const?',
          options: [
            'let is mutable, const is immutable',
            'const is mutable, let is immutable',
            'They are the same',
            'let is global, const is local'
          ],
          correct: 0
        },
        {
          id: 2,
          question: 'What will console.log(typeof []) return?',
          options: ['array', 'object', 'null', 'undefined'],
          correct: 1
        },
        {
          id: 3,
          question: 'Which is NOT a primitive type in JavaScript?',
          options: ['string', 'number', 'object', 'boolean'],
          correct: 2
        }
      ]
    },
    {
      id: 'quiz-2',
      title: 'React Hooks Basics',
      difficulty: 'medium',
      questions: [
        {
          id: 1,
          question: 'What hook lets you add state to functional components?',
          options: ['useContext', 'useState', 'useEffect', 'useReducer'],
          correct: 1
        },
        {
          id: 2,
          question: 'What is the purpose of useEffect?',
          options: [
            'To manage component state',
            'To handle side effects',
            'To pass props to children',
            'To create new components'
          ],
          correct: 1
        },
        {
          id: 3,
          question: 'How many times does useEffect run by default?',
          options: ['Once', 'Twice', 'After every render', 'Never'],
          correct: 2
        }
      ]
    }
  ],
  challenges: [
    {
      id: 'challenge-1',
      title: 'Create a Counter Component',
      difficulty: 'easy',
      description: 'Build a counter component with increment and decrement buttons',
      initialCode: `import React, { useState } from 'react';

export default function Counter() {
  // Add your state here
  
  return (
    <div>
      <p>Count: </p>
      {/* Add buttons here */}
    </div>
  );
}`,
      solution: `import React, { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}`,
      testCases: [
        { name: 'Component renders', test: 'Verify component displays' },
        { name: 'Counter increases', test: 'Click increment button' },
        { name: 'Counter decreases', test: 'Click decrement button' }
      ]
    },
    {
      id: 'challenge-2',
      title: 'Todo List Component',
      difficulty: 'medium',
      description: 'Create a todo list with add and delete functionality',
      initialCode: `import React, { useState } from 'react';

export default function TodoList() {
  // Implement your todo list here
  
  return (
    <div>
      {/* Your implementation */}
    </div>
  );
}`,
      solution: `import React, { useState } from 'react';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input }]);
      setInput('');
    }
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}`,
      testCases: [
        { name: 'Todos can be added', test: 'Type and add a todo' },
        { name: 'Todos can be deleted', test: 'Delete a todo' },
        { name: 'List displays all todos', test: 'Verify all todos show' }
      ]
    }
  ],
  projects: [
    {
      id: 'project-1',
      title: 'Personal Portfolio Website',
      difficulty: 'hard',
      description: 'Build a responsive portfolio showcasing your React skills',
      requirements: [
        'Hero section with introduction',
        'Projects showcase section',
        'Skills section',
        'Contact form with validation',
        'Responsive design',
        'Dark mode toggle'
      ],
      starterCode: `import React, { useState } from 'react';

export default function Portfolio() {
  return (
    <div className="portfolio">
      {/* Build your portfolio here */}
    </div>
  );
}`,
      resources: [
        'React documentation',
        'Tailwind CSS for styling',
        'React Router for navigation'
      ]
    },
    {
      id: 'project-2',
      title: 'Weather Application',
      difficulty: 'hard',
      description: 'Build a weather app that fetches real-time weather data',
      requirements: [
        'Search for cities',
        'Display current weather',
        'Show 5-day forecast',
        'Display temperature in F/C',
        'Store favorites',
        'Error handling'
      ],
      starterCode: `import React, { useState, useEffect } from 'react';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  
  return (
    <div className="weather-app">
      {/* Build your weather app here */}
    </div>
  );
}`,
      resources: [
        'OpenWeather API',
        'useEffect for data fetching',
        'Array mapping for forecasts'
      ]
    }
  ]
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  if (type === 'quizzes') {
    return Response.json(practiceExercises.quizzes);
  }
  if (type === 'challenges') {
    return Response.json(practiceExercises.challenges);
  }
  if (type === 'projects') {
    return Response.json(practiceExercises.projects);
  }
  
  return Response.json(practiceExercises);
}
