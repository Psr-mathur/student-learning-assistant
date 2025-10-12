import { CodingQuestionsCard } from '@/components/coding-questions-card'
import { QuizQuestion } from '@/components/quiz-question'
import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { TMockTest } from '@/types/mock-tests.types'
import { useMockTestsStore } from './mock-tests.store'

export const MockTestInterface = ({ test }: { test: TMockTest }) => {
  const { setActiveTest, addCompletedTest, addUserSolution, getSolution, userSolution } = useMockTestsStore();

  const mcqQuestions = test.quizQuestions ?? []
  const codingQuestions = test.codingQuestions ?? []

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button onClick={() => setActiveTest(null)}>
              Back
            </Button>
            <Button onClick={() => {
              addCompletedTest(test.id)
              setActiveTest(null)
            }}>
              Submit Test
            </Button>
          </div>
        </CardHeader>
      </Card>
      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>
        <TabsContent value="theory" className="space-y-4">
          {mcqQuestions.map((q) => (
            <Card className='p-4'>
              <QuizQuestion
                key={q.id}
                question={q}
                value={getSolution(test.id, q.id)?.answer?.toString() ?? undefined}
                onValueChange={(value) =>
                  addUserSolution({
                    testId: test.id,
                    questionId: q.id,
                    answer: Number.parseInt(value),
                  })
                }
              />
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="coding" className="space-y-4">
          <CodingQuestionsCard
            questions={codingQuestions}
            solutions={[...userSolution].reduce((acc, q) => ({ ...acc, [q.questionId]: q.answer }), {})}
            onSolutionChange={(questionId, code) => addUserSolution({
              testId: test.id,
              questionId,
              answer: code
            })}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
