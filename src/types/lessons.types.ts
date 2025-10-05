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

export type TPractice = {
  id: string
  documentId: string
  questions: TPracticeQuestion[]
  generatedAt: Date
}

export type TPracticeQuestion = {
  id: string
  type: "theory"
  question: string
  answer: string
  difficulty: "easy" | "medium" | "hard"
} | {
  id: string
  type: "coding"
  question: string
  testCases: TTestCase[]
  difficulty: "easy" | "medium" | "hard"
} | {
  id: string
  type: "mcq"
  question: string
  options: string[]
  correctAnswer: number
  difficulty: "easy" | "medium" | "hard"
}

export type TTestCase = {
  input: string
  expectedOutput: string
}