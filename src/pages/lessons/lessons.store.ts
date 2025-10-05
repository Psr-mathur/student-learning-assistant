import type { TDocument, TPractice, TQuiz, TSubject, TSummary } from '@/types/lessons.types'
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type TModules = 'pre-class' | 'training' | 'lecture' | 'post-class'

type FormStore = {
  selectedSubject: TSubject | null
  setSelectedSubject: (subject: TSubject | null) => void

  documents: Record<TModules, TDocument | null>
  addDocument: (module: TModules, doc: TDocument) => void

  summaries: TSummary[]
  addSummary: (summary: TSummary) => void

  quizzes: TQuiz[]
  addQuiz: (quiz: TQuiz) => void

  practices: TPractice[]
  addPractice: (practiceQuestions: TPractice) => void
}


export const useLessonsStore = create(
  immer<FormStore>((set) => ({
    selectedSubject: null,
    setSelectedSubject: (subject) => set({ selectedSubject: subject }),

    documents: {
      'pre-class': null,
      training: null,
      lecture: null,
      'post-class': null,
    },
    addDocument: (module, doc) => set((state) => {
      state.documents[module] = doc
    }),

    summaries: [],
    addSummary: (summary) => set((state) => {
      state.summaries.push(summary)
    }),

    quizzes: [],
    addQuiz: (quiz) => set((state) => {
      state.quizzes.push(quiz)
    }),

    practices: [],
    addPractice: (practice) => set((state) => {
      state.practices.push(practice)
    }),
  }))
)
