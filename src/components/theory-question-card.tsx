import type { TTheoryQuestion } from '@/types/lessons.types';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';

export const TheoryQuestionCard = ({ question, index }: { question: TTheoryQuestion; index: number }) => {
  const [localAnswer, setLocalAnswer] = useState("")
  const [localShowAnswer, setLocalShowAnswer] = useState(false)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Question {index + 1}</CardTitle>
          <Badge
            variant={
              question.difficulty === "easy"
                ? "secondary"
                : question.difficulty === "medium"
                  ? "default"
                  : "destructive"
            }
          >
            {question.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">{question.question}</p>

        <div className="space-y-3">
          <label className="text-sm font-medium">Your Answer:</label>
          <Textarea
            placeholder="Type your answer here..."
            value={localAnswer}
            onChange={(e) => setLocalAnswer(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        {!localShowAnswer ? (
          <Button onClick={() => setLocalShowAnswer(true)} variant="outline" className="w-full">
            Show Model Answer
          </Button>
        ) : (
          <Card className="bg-accent/10 border-accent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-2 mb-2">
                <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                <p className="font-medium">Model Answer:</p>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{question.answer}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}