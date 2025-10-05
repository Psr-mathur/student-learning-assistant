import type { TMockTest } from '@/types/mock-tests.types';
import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

enableMapSet();


type TSolution = {
  testId: string
  questionId: string
  answer: number | string
}

type FormStore = {

  completedTests: Set<string>
  addCompletedTest: (testId: string) => void
  isTestCompleted: (test: TMockTest) => boolean
  calculateTestScore: (test: TMockTest) => {
    mcq: number,
    coding: number,
    outOf: number
  }
  calculateTestDifficulty: (test: TMockTest) => "easy" | "medium" | "hard",

  userSolution: TSolution[]
  addUserSolution: (solution: TSolution) => void
  getSolution: (testId: string, questionId: string) => TSolution | undefined

  activeTest: TMockTest | null
  setActiveTest: (test: TMockTest | null) => void
}

const SCORE_MAP = {
  easy: 10,
  medium: 20,
  hard: 30,
}


export const useMockTestsStore = create(
  immer<FormStore>((set, get) => ({
    completedTests: new Set(),
    addCompletedTest: (testId) => set((state) => {
      state.completedTests.add(testId)
    }),
    isTestCompleted: (test) => {
      return get().completedTests.has(test.id)
    },
    calculateTestScore: (test) => {
      const mcqScores = test.questions.filter((q) => q.type === "mcq").map((q) => {
        const solution = [...get().userSolution].find((s) => s.testId === test.id && s.questionId === q.id)
        return solution?.answer === q.correctAnswer ? SCORE_MAP[q.difficulty] : 0
      })

      const codingScores = test.questions.filter((q) => q.type === "coding").map((q) => {
        const solution = [...get().userSolution].find((s) => s.testId === test.id && s.questionId === q.id)
        return solution?.answer === "test-passed" ? SCORE_MAP[q.difficulty] : 0
      })

      return {
        mcq: mcqScores.reduce((a, b) => a + b, 0),
        coding: codingScores.reduce((a, b) => a + b, 0),
        outOf: test.questions.reduce((a, b) => a + SCORE_MAP[b.difficulty], 0)
      }
    },
    calculateTestDifficulty: (test) => {
      const mostFrequentDifficulty = Object.entries(
        test.questions.reduce((acc, q) => {
          acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
          return acc;
        }, {} as Record<"easy" | "medium" | "hard", number>)
      ).reduce((max, curr) => (curr[1] > max[1] ? curr : max))[0];
      return mostFrequentDifficulty as "easy" | "medium" | "hard"
    },

    userSolution: [],
    addUserSolution: (solution) => set((state) => {
      // if exist with same testId and questionId, update the answer
      const existingSolutionIndex = [...state.userSolution].findIndex((s) => s.testId === solution.testId && s.questionId === solution.questionId)
      if (existingSolutionIndex !== -1) {
        state.userSolution[existingSolutionIndex] = solution
      } else {
        state.userSolution.push(solution)
      }
    }),
    getSolution: (testId, questionId) => {
      return get().userSolution.find((s) => s.testId === testId && s.questionId === questionId)
    },



    activeTest: null,
    setActiveTest: (test) => set({ activeTest: test }),
  }))
)
