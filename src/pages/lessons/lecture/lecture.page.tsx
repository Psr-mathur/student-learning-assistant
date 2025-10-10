"use client"

import { FileUpload } from "@/components/file-upload"
import { SummaryDisplay } from "@/components/summary-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import LessonsService from '@/services/lessons/lessons.service'
import type { TDocument } from '@/types/lessons.types'
import { FileText, Mic } from "lucide-react"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCurrentSubjectStore } from '../lessons.store'

export default function LecturePage() {
  const { selectedSubject, setSelectedSubject } = useCurrentSubjectStore();
  const navigate = useNavigate();
  const generateFromAIMutation = LessonsService.useGenerateFromAI();
  const updateSubjectMutation = LessonsService.useUpdateSubject();
  const currentSummary = selectedSubject?.lecture?.summary

  const handleFileSelect = async (file: File) => {

    const blob = await file.arrayBuffer().then((buffer) => new Blob([buffer]));

    const doc: TDocument = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: "pdf",
      uploadedAt: new Date(),
      blob: blob
    }
    updateSubjectMutation.mutate({
      data: {
        ...selectedSubject,
        lecture: {
          ...selectedSubject.lecture,
          document: doc
        }
      }
    }, {
      onSuccess: (data) => {
        setSelectedSubject(data);
      }
    })
  }

  const handleGenerateSummary = async () => {
    if (!selectedSubject.lecture?.document) return;

    generateFromAIMutation.mutate({
      document: selectedSubject.lecture.document,
      options: ["summary"]
    }, {
      onSuccess: (data) => {
        updateSubjectMutation.mutate({
          data: {
            ...selectedSubject,
            lecture: {
              ...selectedSubject.lecture!,
              summary: data.summary,
            }
          }
        }, {
          onSuccess: (data) => {
            setSelectedSubject(data);
          }
        })
      }
    })
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-balance">Class Lecture</h1>
        <p className="text-muted-foreground text-lg">Upload lecture notes or recording transcripts for summarization</p>
        <p className="text-sm text-muted-foreground mt-1">Current Subject: {selectedSubject?.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Lecture Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Upload written notes from the lecture</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Mic className="h-4 w-4" />
              Recording Transcript
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Upload transcribed audio from recordings</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload Lecture Materials</CardTitle>
            <CardDescription>Upload your lecture notes or recording transcripts</CardDescription>
          </CardHeader>
          <CardContent>
            <FileUpload onFileSelect={handleFileSelect} disabled={generateFromAIMutation.isPending} />
          </CardContent>
        </Card>

        {selectedSubject.lecture?.document && (
          <div className="space-y-4">
            {!currentSummary ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No summary generated yet</p>
                    <Button onClick={handleGenerateSummary} disabled={generateFromAIMutation.isPending}>
                      {generateFromAIMutation.isPending ? (
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
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={() => navigate('/lessons/training')}>Prev</Button>
        <Button onClick={() => {
          if (!selectedSubject.lecture?.document) {
            toast.error('Please upload a lecture material')
            return
          }
          navigate('/lessons/post-class')
        }}>Next</Button>
      </div>
    </div>
  )
}
