import type { TCodingQuestion, TQuizQuestion, TTheoryQuestion } from './lessons.types'

export type TMockTest = {
  id: string
  subject: string
  title: string
  duration?: number
  codingQuestions?: TCodingQuestion[]
  theoryQuestions?: TTheoryQuestion[]
  quizQuestions?: TQuizQuestion[]
}