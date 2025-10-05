import { CodingQuestionsCard } from '@/components/coding-questions-card'
import { TheoryQuestionCard } from '@/components/theory-question-card'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Code, Trophy } from "lucide-react"
import { useLessonsStore } from '../lessons.store'

export default function PracticePage() {
  const { selectedSubject, practices } = useLessonsStore()

  const theoryQuestions = practices.map((q) => q.questions).flat().filter(q => q.type === "theory");

  const codingQuestions = practices.map((q) => q.questions).flat().filter(q => q.type === "coding");

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Practice Zone</h1>
        <p className="text-muted-foreground text-lg">Sharpen your coding skills with hands-on practice problems</p>
        <p className="text-sm text-muted-foreground mt-1">Current Subject: {selectedSubject?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Code className="h-4 w-4" />
              Total Problems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{5}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-4 w-4" />
              Solved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">{0}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              100%
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="theory" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theory">Theory</TabsTrigger>
          <TabsTrigger value="coding">Coding</TabsTrigger>
        </TabsList>
        <TabsContent value="theory" className="space-y-4">
          {theoryQuestions.map((question, index) => (
            <TheoryQuestionCard key={question.id} question={question} index={index} />
          ))}
        </TabsContent>
        <TabsContent value="coding" className="space-y-4">
          <CodingQuestionsCard questions={codingQuestions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
