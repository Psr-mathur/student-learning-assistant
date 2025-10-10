import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TQuizQuestion } from '@/types/lessons.types'
import { CheckCircle2, XCircle } from "lucide-react"
import { useState } from "react"
import { QuizQuestion } from './quiz-question'

interface QuizDisplayProps {
  quiz: TQuizQuestion[]
}

export function QuizDisplay({ quiz }: QuizDisplayProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [showResults, setShowResults] = useState(false)

  const question = quiz[currentQuestion]
  const isAnswered = selectedAnswers[currentQuestion] !== undefined
  const isLastQuestion = currentQuestion === quiz.length - 1

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1)
  }

  const calculateScore = () => {
    let correct = 0
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++
      }
    })
    return { correct, total: quiz.length, percentage: (correct / quiz.length) * 100 }
  }

  if (showResults) {
    const score = calculateScore()
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-primary mb-2">{score.percentage.toFixed(0)}%</div>
            <p className="text-lg text-muted-foreground">
              {score.correct} out of {score.total} correct
            </p>
          </div>

          <div className="space-y-4">
            {quiz.map((q, index) => {
              const userAnswer = selectedAnswers[index]
              const isCorrect = userAnswer === q.correctAnswer

              return (
                <Card key={q.id} className={isCorrect ? "border-accent" : "border-destructive"}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 text-accent mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium mb-2">{q.question}</p>
                        <div className="space-y-2 text-sm">
                          <p className="text-muted-foreground">
                            Your answer:{" "}
                            <span className={isCorrect ? "text-accent" : "text-destructive"}>
                              {q.options[userAnswer]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-muted-foreground">
                              Correct answer: <span className="text-accent">{q.options[q.correctAnswer]}</span>
                            </p>
                          )}
                          {/* {q.explanation && (
                            <p className="text-muted-foreground italic mt-2">
                              <HelpCircle className="h-3 w-3 inline mr-1" />
                              {q.explanation}
                            </p>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Button
            onClick={() => {
              setShowResults(false)
              setCurrentQuestion(0)
              setSelectedAnswers({})
            }}
            className="w-full"
          >
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    )
  }
  console.log(selectedAnswers);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Quiz</CardTitle>
          <Badge variant="secondary">
            Question {currentQuestion + 1} of {quiz.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizQuestion
          question={question}
          value={selectedAnswers[currentQuestion]?.toString() ?? undefined}
          onValueChange={(value) =>
            setSelectedAnswers((prev) => ({ ...prev, [currentQuestion]: Number.parseInt(value) }))
          }
          key={question.id}
        />

        <div className="flex justify-between gap-3">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!isAnswered}>
            {isLastQuestion ? "Submit Quiz" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
