import { FileUpload } from "@/components/file-upload"
import { QuizDisplay } from "@/components/quiz-display"
import { SummaryDisplay } from "@/components/summary-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { documentToFile } from '@/lib/ai'
import LessonsService from '@/services/lessons/lessons.service'
import type { TDocument } from '@/types/lessons.types'
import { FileText, HelpCircle } from "lucide-react"
import { init } from 'pptx-preview'
import { useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCurrentSubjectStore } from '../lessons.store'

export default function TrainingPage() {
  const { selectedSubject, setSelectedSubject } = useCurrentSubjectStore();
  const navigate = useNavigate();
  const generateFromAIMutation = LessonsService.useGenerateFromAI();
  const updateSubjectMutation = LessonsService.useUpdateSubject();
  const pptWrapperRef = useRef<HTMLDivElement>(null);

  const currentSummary = selectedSubject?.training?.summary
  const currentQuizQuestions = selectedSubject?.training?.quizQuestions
  const handleFileSelect = async (file: File) => {

    const blob = await file.arrayBuffer().then((buffer) => new Blob([buffer]));

    const doc: TDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: "ppt",
      uploadedAt: new Date(),
      blob: blob
    }
    updateSubjectMutation.mutate({
      data: {
        ...selectedSubject,
        training: {
          ...selectedSubject.training,
          document: doc
        }
      }
    }, {
      onSuccess: (data) => {
        setSelectedSubject(data);
      }
    })
  }

  useEffect(() => {
    if (selectedSubject?.training?.document && pptWrapperRef.current) {
      const pptxViewer = init(pptWrapperRef.current, {
        width: 1080,
        height: 640,
        mode: "list"
      })
      selectedSubject.training.document.blob.arrayBuffer().then(async (buffer) => {
        await pptxViewer.preview(buffer);
      });
    }
  }, [selectedSubject.training?.document])

  const handleGenerateSummaryAndQuiz = async () => {
    console.log('hello')
    if (!selectedSubject?.training?.document) return;
    console.log('hello2')
    generateFromAIMutation.mutate({
      document: selectedSubject?.training?.document,
      options: ["summary", "quiz", "coding", "theory"]
    }, {
      onSuccess: (data) => {
        updateSubjectMutation.mutate({
          data: {
            ...selectedSubject,
            training: {
              ...selectedSubject.training!,
              summary: data.summary,
              quizQuestions: data.quiz,
              theoryQuestions: data.theory,
              codingQuestions: data.coding
            }
          }
        }, {
          onSuccess: (data) => {
            setSelectedSubject(data);
          }
        })
      },
      onError: (error) => {
        toast.error(error.message);
      }
    })
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Training Presentation</h1>
        <p className="text-muted-foreground text-lg">
          Upload your training PPT and generate comprehensive study materials
        </p>
        <p className="text-sm text-muted-foreground mt-1">Current Subject: {selectedSubject?.name}</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Training Presentation</CardTitle>
            <CardDescription>Upload your PowerPoint or presentation files</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload
              onFileSelect={handleFileSelect}
              accept=".pptx"
              disabled={generateFromAIMutation.isPending}
              defaultFile={selectedSubject?.training?.document ? documentToFile(selectedSubject?.training?.document) : undefined}
            />
          </CardContent>
        </Card>
        {/* Regenerate Button */}
        <Button onClick={handleGenerateSummaryAndQuiz} disabled={generateFromAIMutation.isPending}>
          {generateFromAIMutation.isPending ? (
            <>
              <Spinner className="mr-2" />
              Regenerating Summary and Quiz...
            </>
          ) : (
            "Regenerate Summary and Quiz"
          )}
        </Button>

        {selectedSubject?.training?.document && (
          <>
            <div ref={pptWrapperRef} />

            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
              </TabsList>

              <TabsContent value="summary" className="space-y-4">
                {!currentSummary ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No summary generated yet</p>
                        <Button onClick={handleGenerateSummaryAndQuiz} disabled={generateFromAIMutation.isPending}>
                          {generateFromAIMutation.isPending ? (
                            <>
                              <Spinner className="mr-2" />
                              Generating Summary and Quiz...
                            </>
                          ) : (
                            "Generate Summary and Quiz"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <SummaryDisplay summary={currentSummary} />
                )}
              </TabsContent>

              <TabsContent value="quiz" className="space-y-4">
                {!currentQuizQuestions ? (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center py-8">
                        <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground mb-4">No quiz generated yet</p>
                        <Button onClick={handleGenerateSummaryAndQuiz} disabled={generateFromAIMutation.isPending}>
                          {generateFromAIMutation.isPending ? (
                            <>
                              <Spinner className="mr-2" />
                              Generating Summary and Quiz...
                            </>
                          ) : (
                            "Generate Summary and Quiz"
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <QuizDisplay quiz={currentQuizQuestions} />
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <Button onClick={() => navigate('/lessons/pre-class')}>Prev</Button>
        <Button onClick={() => {
          if (!selectedSubject?.training?.document) {
            toast.error('Please upload a training presentation')
            return
          }
          navigate('/lessons/lecture')
        }}>Next</Button>
      </div>
    </div>
  )
}
