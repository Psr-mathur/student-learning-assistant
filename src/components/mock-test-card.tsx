import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TMockTest } from '@/types/mock-tests.types'
import { Clock, FileText, Trophy } from "lucide-react"
import { useMockTestsStore } from '../pages/mock-test/mock-tests.store'

interface MockTestCardProps {
  test: TMockTest
  onStart: () => void
}


export function MockTestCard({ test, onStart }: MockTestCardProps) {
  const { isTestCompleted, calculateTestDifficulty, calculateTestScore } = useMockTestsStore()
  const difficulty = calculateTestDifficulty(test);
  const isCompleted = isTestCompleted(test);
  const { mcq, coding, outOf } = calculateTestScore(test);
  const score = Math.round((mcq + coding) / outOf * 100)

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg">{test.title}</CardTitle>
          {isCompleted && <Trophy className="h-5 w-5 text-accent flex-shrink-0" />}
        </div>
        <p className="text-sm text-muted-foreground">{test.subject}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={
              difficulty === "easy" ? "secondary" : difficulty === "medium" ? "default" : "destructive"
            }
          >
            {difficulty}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {test.duration} min
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <FileText className="h-3 w-3" />
            {test.questions.length} questions
          </Badge>
        </div>

        {isCompleted && (
          <div className="p-3 bg-accent/10 rounded-lg">
            <p className="text-sm font-medium">Previous Score: {score}%</p>
          </div>
        )}

        <Button onClick={onStart} className="w-full">
          {isCompleted ? "Retake Test" : "Start Test"}
        </Button>
      </CardContent>
    </Card>
  )
}
