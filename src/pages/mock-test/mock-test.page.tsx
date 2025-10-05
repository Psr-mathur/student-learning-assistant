import { MockTestCard } from "@/components/mock-test-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MockTestsService from '@/services/mock-tests/mock-tests.service'
import type { TMockTest } from '@/types/mock-tests.types'
import { FileText, Target, Trophy } from "lucide-react"
import { MockTestInterface } from './mock-test-interface'
import { useMockTestsStore } from './mock-tests.store'


export function MockTestPage() {
  const { completedTests, setActiveTest, activeTest } = useMockTestsStore();
  const { data: mockTests = [] } = MockTestsService.useGetMockTests({})

  const handleStartTest = (test: TMockTest) => {
    setActiveTest(test)
  }

  if (activeTest) {
    return (
      <MockTestInterface test={activeTest} />
    )
  }

  const completedCount = completedTests.size

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Mock Tests</h1>
        <p className="text-muted-foreground text-lg">Assess your knowledge with comprehensive practice tests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Total Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{mockTests.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Trophy className="h-4 w-4" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-accent">{completedCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4" />
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{0}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTests.map((test) => (
          <MockTestCard
            key={test.id}
            test={test}
            onStart={() => handleStartTest(test)}
          />
        ))}
      </div>
    </div>
  )
}
