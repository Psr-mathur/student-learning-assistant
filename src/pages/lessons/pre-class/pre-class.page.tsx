import { FileUpload } from "@/components/file-upload"
import { BlobPdfViewer } from '@/components/pdf-viewer'
import { QuizDisplay } from "@/components/quiz-display"
import { SummaryDisplay } from '@/components/summary-display'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRole } from '@/hooks/role/use-role'
import { documentToFile } from '@/lib/ai'
import LessonsService from '@/services/lessons/lessons.service'
import type { TDocument } from "@/types/lessons.types"
import { BookOpen, FileText, HelpCircle } from "lucide-react"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCurrentSubjectStore } from '../lessons.store'

export function PreClassPage() {
  const { role } = useRole();
  const { selectedSubject, setSelectedSubject } = useCurrentSubjectStore();
  const navigate = useNavigate();

  const generateFromAIMutation = LessonsService.useGenerateFromAI();
  const updateSubjectMutation = LessonsService.useUpdateSubject();

  const currentSummary = selectedSubject?.preClass?.summary;
  const currentQuizQuestions = selectedSubject?.preClass?.quizQuestions;
  const currentDocument = selectedSubject?.preClass?.document;

  const handleFileSelect = async (file: File) => {
    const blob = await file.arrayBuffer().then((buffer) => new Blob([buffer]));

    const doc: TDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: "pdf",
      uploadedAt: new Date(),
      blob,
    };

    updateSubjectMutation.mutate(
      {
        data: {
          ...selectedSubject,
          preClass: {
            ...selectedSubject.preClass,
            document: doc,
          },
        },
      },
      {
        onSuccess: (data) => setSelectedSubject(data),
      }
    );
  };

  const handleGenerateSummaryAndQuiz = async () => {
    if (!currentDocument) return;

    generateFromAIMutation.mutate(
      {
        document: currentDocument,
        options: ["summary", "quiz"],
      },
      {
        onSuccess: (data) => {
          updateSubjectMutation.mutate(
            {
              data: {
                ...selectedSubject,
                preClass: {
                  ...selectedSubject.preClass!,
                  summary: data.summary,
                  quizQuestions: data.quiz,
                },
              },
            },
            {
              onSuccess: (data) => setSelectedSubject(data),
            }
          );
        },
      }
    );
  };

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Pre-Class Preparation</h1>
        <p className="text-muted-foreground text-lg">
          {role === "teacher"
            ? "Upload your pre-class materials and generate study aids"
            : "Preview pre-class materials, read the summary, and take the quiz"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Current Subject: {selectedSubject?.name}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
              Generate Summary
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
              Take Quiz
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Step 3</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {role === "teacher" && (
          <Card>
            <CardHeader>
              <CardTitle>Upload Pre-Class Document</CardTitle>
              <CardDescription>
                Upload your reading materials, notes, or study documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileSelect={handleFileSelect}
                disabled={generateFromAIMutation.isPending}
                defaultFile={
                  currentDocument ? documentToFile(currentDocument) : undefined
                }
              />
            </CardContent>
          </Card>
        )}
        {(role === "teacher" && (currentSummary || currentQuizQuestions)) && (
          <Button
            onClick={handleGenerateSummaryAndQuiz}
            disabled={generateFromAIMutation.isPending}
          >
            {generateFromAIMutation.isPending ? (
              <>
                <Spinner className="mr-2" />
                Regenerating Summary and Quiz...
              </>
            ) : (
              "Regenerate Summary and Quiz"
            )}
          </Button>
        )}

        {currentDocument && (
          <div>
            <BlobPdfViewer blob={currentDocument.blob} />

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
                        <p className="text-muted-foreground mb-4">
                          No summary available yet
                        </p>
                        {role === "teacher" && (
                          <Button
                            onClick={handleGenerateSummaryAndQuiz}
                            disabled={generateFromAIMutation.isPending}
                          >
                            {generateFromAIMutation.isPending ? (
                              <>
                                <Spinner className="mr-2" />
                                Generating Summary and Quiz...
                              </>
                            ) : (
                              "Generate Summary and Quiz"
                            )}
                          </Button>
                        )}
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
                        <p className="text-muted-foreground mb-4">
                          No quiz available yet
                        </p>
                        {role === "teacher" && (
                          <Button
                            onClick={handleGenerateSummaryAndQuiz}
                            disabled={generateFromAIMutation.isPending}
                          >
                            {generateFromAIMutation.isPending ? (
                              <>
                                <Spinner className="mr-2" />
                                Generating Summary and Quiz...
                              </>
                            ) : (
                              "Generate Summary and Quiz"
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <QuizDisplay quiz={currentQuizQuestions} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <Button onClick={() => navigate('/lessons/class-setup')}>Prev</Button>
        <Button onClick={() => {
          if (!selectedSubject.preClass?.document) {
            toast.error('Please upload a pre-class document')
            return
          }
          navigate('/lessons/training')
        }}>Next</Button>
      </div>
    </div>
  );
}
