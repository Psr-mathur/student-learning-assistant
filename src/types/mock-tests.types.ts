import type { TPracticeQuestion } from './lessons.types'

export type TMockTest = {
  id: string
  subject: string
  title: string
  duration?: number
  questions: TPracticeQuestion[]
}