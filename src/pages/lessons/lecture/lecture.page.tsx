"use client"

import { FileUpload } from "@/components/file-upload"
import { SummaryDisplay } from "@/components/summary-display"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import LessonsService from '@/services/lessons/lessons.service'
import type { TDocument } from '@/types/lessons.types'
import { FileText, Mic } from "lucide-react"
import { useState } from "react"
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCurrentSubjectStore } from '../lessons.store'

export default function LecturePage() {
  const { selectedSubject } = useCurrentSubjectStore();
  const navigate = useNavigate();
  const [uploadedDoc, setUploadedDoc] = useState<TDocument | null>(null);
  const generateSummaryMutation = LessonsService.useGenerateSummary();
  const updateSubjectMutation = LessonsService.useUpdateSubject();
  const currentSummary = selectedSubject?.lecture?.summary

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
        lecture: {
          ...selectedSubject.lecture,
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
            lecture: {
              ...selectedSubject.lecture!,
              summary: data,
            }
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
            <FileUpload onFileSelect={handleFileSelect} disabled={generateSummaryMutation.isPending} />
          </CardContent>
        </Card>

        {uploadedDoc && (
          <div className="space-y-4">
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
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Button onClick={() => navigate('/lessons/training')}>Prev</Button>
        <Button onClick={() => {
          if (!uploadedDoc) {
            toast.error('Please upload a lecture material')
            return
          }
          navigate('/lessons/post-class')
        }}>Next</Button>
      </div>
    </div>
  )
}
