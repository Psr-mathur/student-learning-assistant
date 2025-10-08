import { FileUpload } from "@/components/file-upload"
import { QuizDisplay } from "@/components/quiz-display"
import { SummaryDisplay } from "@/components/summary-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LessonsService from '@/services/lessons/lessons.service'
import type { TDocument } from '@/types/lessons.types'
import { BookOpen, FileText, HelpCircle } from "lucide-react"
import { useState } from "react"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCurrentSubjectStore } from '../lessons.store'

export default function PostClassPage() {
  const { selectedSubject } = useCurrentSubjectStore()
  const navigate = useNavigate();
  const [uploadedDoc, setUploadedDoc] = useState<TDocument | null>(null)
  const generateQuizMutation = LessonsService.useGenerateQuizQuestions();
  const generateSummaryMutation = LessonsService.useGenerateSummary();
  const updateSubjectMutation = LessonsService.useUpdateSubject();

  const currentSummary = selectedSubject?.postClass?.summary
  const currentQuizQuestions = selectedSubject?.postClass?.quizQuestions

  const handleFileSelect = async (file: File) => {

    const blob = await file.arrayBuffer().then((buffer) => new Blob([buffer]));

    const doc: TDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: file.name.endsWith(".pdf") ? "pdf" : "doc",
      uploadedAt: new Date(),
      blob: blob
    }
    setUploadedDoc(doc);
    updateSubjectMutation.mutate({
      id: selectedSubject.id,
      data: {
        ...selectedSubject,
        postClass: {
          ...selectedSubject.postClass,
          document: doc
        }
      }
    })
  }

  const handleGenerateSummary = async () => {
    if (!uploadedDoc) return;

    generateSummaryMutation.mutate({
      document: uploadedDoc
    }, {
      onSuccess: (data) => {
        updateSubjectMutation.mutate({
          id: selectedSubject.id,
          data: {
            ...selectedSubject,
            postClass: {
              ...selectedSubject.postClass!,
              summary: data,
            }
          }
        })
      }
    })
  }

  const handleGenerateQuiz = async () => {
    if (!uploadedDoc) return

    generateQuizMutation.mutate({
      document: uploadedDoc
    }, {
      onSuccess: (data) => {
        updateSubjectMutation.mutate({
          id: selectedSubject.id,
          data: {
            ...selectedSubject,
            postClass: {
              ...selectedSubject.postClass!,
              quizQuestions: data,
            }
          }
        })
      }
    })
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Post-Class Review</h1>
        <p className="text-muted-foreground text-lg">Upload post-class materials and test your understanding</p>
        <p className="text-sm text-muted-foreground mt-1">Current Subject: {selectedSubject?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="h-4 w-4" />
              Upload Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Step 1</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Review Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Step 2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <HelpCircle className="h-4 w-4" />
              Test Knowledge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Step 3</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Post-Class Document</CardTitle>
            <CardDescription>Upload your review materials, homework, or additional notes</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onFileSelect={handleFileSelect} disabled={generateSummaryMutation.isPending || generateQuizMutation.isPending} />
          </CardContent>
        </Card>

        {uploadedDoc && (
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
                      <Button onClick={handleGenerateSummary} disabled={generateSummaryMutation.isPending}>
                        {generateSummaryMutation.isPending ? (
                          <>
                            <Spinner className="mr-2" />
                            Generating Summary...
                          </>
                        ) : (
                          "Generate Summary"
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
                      <Button onClick={handleGenerateQuiz} disabled={generateQuizMutation.isPending}>
                        {generateQuizMutation.isPending ? (
                          <>
                            <Spinner className="mr-2" />
                            Generating Quiz...
                          </>
                        ) : (
                          "Generate Quiz"
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
        )}
      </div>

      <div className="flex justify-between mt-4">
        <Button onClick={() => navigate('/lessons/lecture')}>Prev</Button>
        <Button onClick={() => {
          if (!uploadedDoc) {
            toast.error('Please upload a post-class document')
            return
          }
          navigate('/lessons/practice')
        }}>Next</Button>
      </div>
    </div>
  )
}
