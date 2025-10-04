export type TSubject = {
  id: string
  name: string
  syllabus: string[]
}

export type TDocument = {
  id: string
  name: string
  type: "pdf" | "doc" | "ppt"
  uploadedAt: Date
  content?: string,
}

export type TSummary = {
  id: string
  documentId: string
  content: string
  generatedAt: Date
}

export type TQuiz = {
  id: string
  documentId: string
  questions: TQuizQuestion[]
  generatedAt: Date
}

export type TQuizQuestion = {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}