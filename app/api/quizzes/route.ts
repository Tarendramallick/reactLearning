import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/authUtils';
import { QUIZZES, QUIZ_DEFINITIONS } from '@/lib/quizzesData';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const lessonTitle = request.nextUrl.searchParams.get('lessonTitle');
    const { db } = await connectToDatabase();

    let quizzes;
    if (lessonTitle) {
      quizzes = QUIZZES.filter(q => q.lessonTitle === decodeURIComponent(lessonTitle));
    } else {
      quizzes = QUIZZES;
    }

    return NextResponse.json({ quizzes, definitions: QUIZ_DEFINITIONS });
  } catch (error) {
    console.error('Quiz fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { quizId, answers } = await request.json();
    const { db } = await connectToDatabase();

    // Find the quiz
    const quiz = QUIZZES.find(q => q.id === parseInt(quizId));
    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    // Calculate score
    let correctCount = 0;
    const detailedResults: any[] = [];

    quiz.questions.forEach((question) => {
      const userAnswer = answers.find((a: any) => a.questionId === question.id);
      const isCorrect = userAnswer && userAnswer.selectedAnswer === question.correctAnswer;
      
      if (isCorrect) correctCount++;

      detailedResults.push({
        questionId: question.id,
        question: question.question,
        userAnswer: userAnswer?.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      });
    });

    const percentage = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = percentage >= quiz.passingScore;

    // Save to database
    const result = await db.collection('quiz_attempts').insertOne({
      userId: new ObjectId(decoded.userId),
      quizId: quiz.id,
      lessonTitle: quiz.lessonTitle,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      percentage,
      passed,
      answers: detailedResults,
      attemptedAt: new Date(),
    });

    return NextResponse.json({
      quizId: quiz.id,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      percentage,
      passed,
      passingScore: quiz.passingScore,
      message: passed ? 'Congratulations! You passed!' : 'Keep practicing!',
      detailedResults,
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}

const QUIZZES_DATA = [
  {
    title: 'React Fundamentals Quiz',
    lessons: ['What is React?', 'JSX and Components', 'Props: Passing Data to Components'],
    questions: [
      {
        question: 'What is the primary benefit of using React?',
        options: [
          'Faster server response times',
          'Easier to manage complex UIs with reusable components',
          'Reduces the need for CSS',
          'Automatically handles database operations',
        ],
        correctAnswer: 1,
        explanation: 'React excels at managing complex user interfaces through reusable, component-based architecture.',
      },
      {
        question: 'What does JSX stand for?',
        options: [
          'JavaScript External XML',
          'JavaScript and XML',
          'JavaServer eXtensible',
          'Java Syntax eXtension',
        ],
        correctAnswer: 1,
        explanation: 'JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript.',
      },
      {
        question: 'How do you pass data from a parent to a child component?',
        options: [
          'Through state variables',
          'Using props',
          'Through localStorage',
          'Using global variables',
        ],
        correctAnswer: 1,
        explanation: 'Props are the standard way to pass data from parent components to child components in React.',
      },
      {
        question: 'What is the correct way to render a list in React?',
        options: [
          'Using a for loop directly in JSX',
          'Using the .map() function with a key prop',
          'Using the .forEach() function',
          'Creating individual elements manually',
        ],
        correctAnswer: 1,
        explanation: 'The .map() function is the correct approach, and keys help React identify which items have changed.',
      },
      {
        question: 'Can you modify a prop directly in a component?',
        options: [
          'Yes, anytime',
          'Only in class components',
          'No, props are read-only',
          'Only if the prop is an object',
        ],
        correctAnswer: 2,
        explanation: 'Props are immutable (read-only). To manage changing data, use state instead.',
      },
    ],
    passingScore: 70,
  },
  {
    title: 'Advanced Hooks Quiz',
    lessons: ['useEffect: Side Effects', 'useContext: Global State', 'useReducer: Complex State', 'Custom Hooks'],
    questions: [
      {
        question: 'What is the purpose of the dependency array in useEffect?',
        options: [
          'To specify which props to receive',
          'To determine when the effect should run',
          'To manage component state',
          'To prevent memory leaks',
        ],
        correctAnswer: 1,
        explanation: 'The dependency array controls when an effect runs: empty array means once, with values means when they change.',
      },
      {
        question: 'When should you use useContext?',
        options: [
          'For simple props passing',
          'To avoid prop drilling through multiple levels',
          'To replace all state management',
          'For performance optimization',
        ],
        correctAnswer: 1,
        explanation: 'useContext is useful for sharing data across many components without passing props through every level.',
      },
      {
        question: 'What does a reducer function take as parameters?',
        options: [
          'Only the state',
          'Only the action',
          'State and action',
          'State, action, and props',
        ],
        correctAnswer: 2,
        explanation: 'A reducer function takes the current state and an action object, returning the new state.',
      },
      {
        question: 'How do you create a custom hook?',
        options: [
          'By extending React.Component',
          'By creating a function that starts with "use" and calls other hooks',
          'By using the @hook decorator',
          'By inheriting from React.Hook',
        ],
        correctAnswer: 1,
        explanation: 'Custom hooks are JavaScript functions that use React hooks and must start with "use".',
      },
      {
        question: 'What should you return from useEffect cleanup?',
        options: [
          'The new state',
          'A function that cleans up the effect',
          'An array of dependencies',
          'Nothing is required',
        ],
        correctAnswer: 1,
        explanation: 'Returning a function from useEffect runs cleanup when the component unmounts or before the effect runs again.',
      },
    ],
    passingScore: 70,
  },
  {
    title: 'Component Mastery Quiz',
    lessons: ['Functional Components & Hooks', 'Conditional Rendering', 'Lists and Keys'],
    questions: [
      {
        question: 'What is a functional component?',
        options: [
          'A component that only renders UI',
          'A JavaScript function that returns JSX',
          'A component that handles side effects',
          'A component with built-in performance optimization',
        ],
        correctAnswer: 1,
        explanation: 'Functional components are JavaScript functions that return JSX elements describing the UI.',
      },
      {
        question: 'Which conditional rendering pattern is best for simple true/false checks?',
        options: [
          'If statements',
          'Ternary operator',
          'Logical && operator',
          'Switch statements',
        ],
        correctAnswer: 2,
        explanation: 'The logical && operator is perfect for showing/hiding a single element based on a condition.',
      },
      {
        question: 'Why are keys important in lists?',
        options: [
          'They improve CSS styling',
          'They help React identify which items changed and preserve component state',
          'They make lists render faster',
          'They are required by HTML standards',
        ],
        correctAnswer: 1,
        explanation: 'Keys help React identify which items have changed, been added, or removed, enabling proper updates.',
      },
      {
        question: 'Is it good practice to use array indices as keys?',
        options: [
          'Yes, always',
          'No, only if the list is static and not filtered/reordered',
          'It depends on the data type',
          'No, never',
        ],
        correctAnswer: 1,
        explanation: 'Array indices as keys can cause issues when the list is reordered, filtered, or has items added/removed.',
      },
      {
        question: 'When should you use conditional rendering?',
        options: [
          'In every component',
          'Only when necessary to show/hide UI based on state or props',
          'Only in class components',
          'Never, it hurts performance',
        ],
        correctAnswer: 1,
        explanation: 'Use conditional rendering when you need to show different UI based on certain conditions or data.',
      },
    ],
    passingScore: 70,
  },
];

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(request: Request) {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const lessonTitle = searchParams.get('lessonTitle');

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const quizzesCollection = db.collection('quizzes');

      // Check if quizzes exist
      const existingQuizzes = await quizzesCollection.countDocuments();

      if (existingQuizzes === 0) {
        // Insert all quizzes
        await quizzesCollection.insertMany(QUIZZES_DATA);
      }

      // Get quizzes
      let query: any = {};
      if (lessonTitle) {
        query.lessons = { $in: [lessonTitle] };
      }

      const quizzes = await quizzesCollection
        .find(query)
        .toArray();

      return Response.json(
        { quizzes },
        { status: 200 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Quizzes fetch error:', error);
    return Response.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  if (!MONGODB_URI) {
    return Response.json(
      { error: 'MongoDB URI not configured' },
      { status: 500 }
    );
  }

  const authUser = await getAuthUser();
  if (!authUser) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { quizId, answers } = await request.json();

    if (!quizId || !answers) {
      return Response.json(
        { error: 'quizId and answers are required' },
        { status: 400 }
      );
    }

    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    try {
      const db = client.db('react-learning');
      const quizzesCollection = db.collection('quizzes');
      const attempsCollection = db.collection('quiz_attempts');

      // Get quiz
      const quiz = await quizzesCollection.findOne({
        _id: new (require('mongodb')).ObjectId(quizId),
      });

      if (!quiz) {
        return Response.json(
          { error: 'Quiz not found' },
          { status: 404 }
        );
      }

      // Score the quiz
      let score = 0;
      const scoredAnswers = answers.map((answer: any) => {
        const question = quiz.questions.find(
          (q: any) => q._id === answer.questionId || q.question === answer.questionId
        );

        if (!question) return { ...answer, isCorrect: false };

        const isCorrect = question.correctAnswer === answer.selectedAnswer;
        if (isCorrect) score++;

        return { ...answer, isCorrect };
      });

      const percentage = Math.round((score / quiz.questions.length) * 100);
      const passed = percentage >= quiz.passingScore;

      // Record attempt
      await attempsCollection.insertOne({
        email: authUser.email,
        quizId,
        score,
        totalQuestions: quiz.questions.length,
        answers: scoredAnswers,
        percentage,
        passed,
        completedAt: new Date(),
      });

      return Response.json(
        {
          score,
          totalQuestions: quiz.questions.length,
          percentage,
          passed,
          passingScore: quiz.passingScore,
        },
        { status: 200 }
      );
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error('Quiz submission error:', error);
    return Response.json(
      { error: 'Failed to submit quiz' },
      { status: 500 }
    );
  }
}
