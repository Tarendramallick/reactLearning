import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { verifyToken } from "@/lib/authUtils";
import { ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  try {
    const lessonTitle = request.nextUrl.searchParams.get("lessonTitle");
    const { db } = await connectToDatabase();

    let query: any = {};
    if (lessonTitle) {
      query.lessons = { $in: [lessonTitle] };
    }

    const quizzes = await db.collection("quizzes").find(query).toArray();

    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error("Quiz fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 401 }
      );
    }

    const { quizId, answers } = await request.json();

    const { db } = await connectToDatabase();

    const quiz = await db.collection("quizzes").findOne({
      _id: new ObjectId(quizId),
    });

    if (!quiz) {
      return NextResponse.json(
        { error: "Quiz not found" },
        { status: 404 }
      );
    }

    // Calculate score
    let score = 0;

    const detailedResults = quiz.questions.map((q: any) => {
      const userAnswer = answers.find(
        (a: any) => a.questionId === q._id || a.questionId === q.question
      );

      const isCorrect =
        userAnswer && userAnswer.selectedAnswer === q.correctAnswer;

      if (isCorrect) score++;

      return {
        questionId: q._id,
        question: q.question,
        userAnswer: userAnswer?.selectedAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const percentage = Math.round(
      (score / quiz.questions.length) * 100
    );

    const passed = percentage >= quiz.passingScore;

    await db.collection("quiz_attempts").insertOne({
      userId: new ObjectId(decoded.userId),
      quizId,
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      passed,
      answers: detailedResults,
      attemptedAt: new Date(),
    });

    return NextResponse.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage,
      passed,
      passingScore: quiz.passingScore,
      detailedResults,
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}