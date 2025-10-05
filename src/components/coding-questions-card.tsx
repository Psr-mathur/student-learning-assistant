import type { TPracticeQuestion } from '@/types/lessons.types';
import { Play, RotateCcw } from 'lucide-react';
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const CodingQuestionsCard = ({ questions, solutions, onSolutionChange }: { questions: Extract<TPracticeQuestion, { type: "coding" }>[]; solutions: Record<string, string>; onSolutionChange: (questionId: string, code: string) => void }) => {

  const [selectedQuestion, setSelectedQuestion] = useState<Extract<TPracticeQuestion, { type: "coding" }> | undefined>(questions.at(0));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {questions.map((question) => (
              <Card
                key={question.id}
                className={`cursor-pointer transition-colors ${selectedQuestion?.id === question.id ? "border-primary" : "hover:border-primary/50"
                  }`}
                onClick={() => setSelectedQuestion(question)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-medium text-sm">{question.question}</p>
                  </div>
                  <Badge
                    variant={
                      question.difficulty === "easy"
                        ? "secondary"
                        : question.difficulty === "medium"
                          ? "default"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {question.difficulty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="lg:col-span-2">
        <Tabs defaultValue="question" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="question">Question</TabsTrigger>
            <TabsTrigger value="editor">Editor</TabsTrigger>
          </TabsList>

          <TabsContent value="question" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedQuestion?.question}</CardTitle>
                  <Badge
                    variant={
                      selectedQuestion?.difficulty === "easy"
                        ? "secondary"
                        : selectedQuestion?.difficulty === "medium"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {selectedQuestion?.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm text-foreground leading-relaxed">{selectedQuestion?.question}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Test Cases</h3>
                  <div className="space-y-2">
                    {selectedQuestion?.testCases.map((testCase, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-3 text-sm">
                          <div className="space-y-1">
                            <p>
                              <span className="text-muted-foreground">Input:</span>{" "}
                              <code className="text-foreground">{testCase.input}</code>
                            </p>
                            <p>
                              <span className="text-muted-foreground">Expected Output:</span>{" "}
                              <code className="text-indigo-900">{testCase.expectedOutput}</code>
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="editor" className="space-y-4">
            <Editor
              value={solutions?.[selectedQuestion?.id || ""] || ""}
              onValueChange={code => onSolutionChange(selectedQuestion?.id || "", code)}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontSize: 12,
                minHeight: "400px",
                border: "1px solid #e5e7eb"
              }}
            />
            <div className="flex gap-3">
              <Button className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Run Code
              </Button>
              <Button className="flex-1" variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
