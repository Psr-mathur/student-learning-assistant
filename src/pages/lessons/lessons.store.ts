import type { TSubject } from '@/types/lessons.types'
import { create } from "zustand"
import { immer } from "zustand/middleware/immer"

type FormStore = {
  selectedSubject: TSubject
  setSelectedSubject: (subject: TSubject) => void
}


export const useCurrentSubjectStore = create(
  immer<FormStore>((set) => ({
    selectedSubject: {
      id: '',
      name: '',
      syllabus: []
    },
    setSelectedSubject: (subject) => set({ selectedSubject: subject })
  }))
)
