'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, PlayCircle } from 'lucide-react';

interface LessonContentProps {
  lesson: {
    _id: string;
    title: string;
    description: string;
    content: string;
    keyPoints: string[];
    resources: Array<{
      title: string;
      url: string;
      type: string;
    }>;
    estimatedTime: number;
  };
  definitions: Record<string, string>;
}

export function LessonContent({ lesson, definitions }: LessonContentProps) {
  return (
    <div className="space-y-8">
      {/* Main Content */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-2xl">{lesson.title}</CardTitle>
          <CardDescription className="text-slate-300 text-base">{lesson.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lesson Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-slate-200 leading-relaxed whitespace-pre-wrap">
              {lesson.content}
            </div>
          </div>

          {/* Key Points */}
          {lesson.keyPoints && lesson.keyPoints.length > 0 && (
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
              <h3 className="text-purple-300 font-semibold mb-3">Key Points to Remember</h3>
              <ul className="space-y-2">
                {lesson.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">•</span>
                    <span className="text-slate-200">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Definitions */}
          {Object.keys(definitions).length > 0 && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="text-blue-300 font-semibold mb-3">Important Terms</h3>
              <div className="space-y-3">
                {Object.entries(definitions).map(([term, definition]) => (
                  <div key={term} className="border-l-2 border-blue-500/50 pl-3">
                    <p className="text-blue-300 font-semibold text-sm">{term}</p>
                    <p className="text-slate-300 text-sm">{definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resources */}
      {lesson.resources && lesson.resources.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Learning Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {lesson.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition border border-slate-600 hover:border-purple-500/50"
                >
                  <div className="flex items-center gap-3">
                    {resource.type === 'youtube' && <PlayCircle className="w-5 h-5 text-red-500" />}
                    {resource.type === 'documentation' && <ExternalLink className="w-5 h-5 text-blue-500" />}
                    <div>
                      <p className="text-white font-medium">{resource.title}</p>
                      <p className="text-slate-400 text-xs">{resource.type}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-slate-400" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
