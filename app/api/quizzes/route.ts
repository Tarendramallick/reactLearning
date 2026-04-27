import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { verifyToken } from '@/lib/authUtils';
import { QUIZZES, QUIZ_DEFINITIONS } from '@/lib/quizzesData';
import { ObjectId } from 'mongodb';
import { checkRateLimit } from '@/lib/rateLimiter';

// ✅ GET QUIZZES
export async function GET(request: NextRequest) {
  try {
    const lessonTitle = request.nextUrl.searchParams.get('lessonTitle');

    let quizzes;
    if (lessonTitle) {
      quizzes = QUIZZES.filter(
        q => q.lessonTitle === decodeURIComponent(lessonTitle)
      );
    } else {
      quizzes = QUIZZES;
    }

    return NextResponse.json({
      quizzes,
      definitions: QUIZ_DEFINITIONS,
    });
  } catch (error) {
    console.error('Quiz fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}

// ✅ SUBMIT QUIZ (WITH RATE LIMIT)
export async function POST(request: NextRequest) {
  try {
    // 🔐 AUTH
    const token = request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded: any = verifyToken(token);

    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // 🚦 RATE LIMIT
    const ip =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const rateKey = decoded.userId || decoded.email || ip;

    const rateLimit = checkRateLimit(rateKey);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many submissions. Try again later.',
          retryAfter: Math.ceil((rateLimit.remainingTime ?? 0) / 1000),
        },
        { status: 429 }
      );
    }

    // 📥 BODY
    const { quizId, answers } = await request.json();

    if (!quizId || !answers) {
      return NextResponse.json(
        { error: 'quizId and answers are required' },
        { status: 400 }
      );
    }

    // 📚 FIND QUIZ
    const quiz = QUIZZES.find(q => q.id === parseInt(quizId));

    if (!quiz) {
      return NextResponse.json(
        { error: 'Quiz not found' },
        { status: 404 }
      );
    }

    // 🧠 CALCULATE SCORE
    let correctCount = 0;
    const detailedResults: any[] = [];

    quiz.questions.forEach((question) => {
      const userAnswer = answers.find(
        (a: any) => a.questionId === question.id
      );

      const isCorrect =
        userAnswer &&
        userAnswer.selectedAnswer === question.correctAnswer;

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

    const percentage = Math.round(
      (correctCount / quiz.questions.length) * 100
    );

    const passed = percentage >= quiz.passingScore;

    // 💾 SAVE TO DB
    const { db } = await connectToDatabase();

    await db.collection('quiz_attempts').insertOne({
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

    // ✅ RESPONSE
    return NextResponse.json({
      quizId: quiz.id,
      score: correctCount,
      totalQuestions: quiz.questions.length,
      percentage,
      passed,
      passingScore: quiz.passingScore,
      message: passed
        ? 'Congratulations! You passed!'
        : 'Keep practicing!',
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