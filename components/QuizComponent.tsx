'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizProps {
  quiz: {
    id: number;
    title: string;
    questions: Question[];
    passingScore: number;
  };
  onSubmit: (answers: any[]) => Promise<any>;
  loading?: boolean;
}

export function QuizComponent({ quiz, onSubmit, loading = false }: QuizProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnswer = (questionId: string, answerIndex: number) => {
    if (!submitted) {
      setAnswers({ ...answers, [questionId]: answerIndex });
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== quiz.questions.length) {
      alert('Please answer all questions before submitting');
      return;
    }

    setIsLoading(true);
    try {
      const answersArray = quiz.questions.map((q) => ({
        questionId: q.id,
        selectedAnswer: answers[q.id],
      }));

      const response = await onSubmit(answersArray);
      setResults(response);
      setSubmitted(true);
    } catch (error) {
      alert('Error submitting quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = quiz.questions.length;

  if (submitted && results) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">{quiz.title} - Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Summary */}
          <div className={`p-6 rounded-lg ${results.passed ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{results.percentage}%</div>
              <div className={`text-lg font-semibold ${results.passed ? 'text-green-300' : 'text-yellow-300'}`}>
                {results.message}
              </div>
              <div className="text-slate-300 mt-2">
                {results.score} out of {results.totalQuestions} questions correct
              </div>
              <div className="text-slate-400 text-sm mt-2">
                Passing score: {results.passingScore}%
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Detailed Results</h3>
            {results.detailedResults.map((result: any, idx: number) => (
              <div key={idx} className="border border-slate-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white font-medium">{idx + 1}. {result.question}</p>
                  </div>
                  {result.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500 ml-2 flex-shrink-0" />
                  )}
                </div>

                <div className="space-y-2 ml-4">
                  {quiz.questions[idx].options.map((option, optIdx) => (
                    <div
                      key={optIdx}
                      className={`p-2 rounded text-sm ${
                        optIdx === quiz.questions[idx].correctAnswer
                          ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                          : optIdx === result.userAnswer
                          ? 'bg-red-500/20 text-red-300 border border-red-500/50'
                          : 'text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {option}
                    </div>
                  ))}
                </div>

                {!result.isCorrect && (
                  <div className="mt-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                    <p className="text-blue-300 text-sm font-semibold mb-1">Explanation:</p>
                    <p className="text-slate-300 text-sm">{result.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-white text-2xl">{quiz.title}</CardTitle>
          </div>
          <Badge variant="outline">
            {answeredCount}/{totalQuestions} answered
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {quiz.questions.map((question, idx) => (
          <div key={question.id} className="border border-slate-700 rounded-lg p-5">
            <p className="text-white font-semibold mb-4">
              {idx + 1}. {question.question}
            </p>
            <div className="space-y-2">
              {question.options.map((option, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => handleAnswer(question.id, optIdx)}
                  disabled={submitted}
                  className={`w-full p-3 rounded-lg text-left transition border ${
                    answers[question.id] === optIdx
                      ? 'bg-purple-500/30 border-purple-500 text-purple-200'
                      : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-purple-500/50 hover:bg-slate-700'
                  }`}
                >
                  <span className="font-semibold">{String.fromCharCode(65 + optIdx)}.</span> {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        <Button
          onClick={handleSubmit}
          disabled={answeredCount !== totalQuestions || isLoading || loading}
          className="w-full"
          size="lg"
        >
          {isLoading || loading ? 'Submitting...' : 'Submit Quiz'}
        </Button>
      </CardContent>
    </Card>
  );
}
