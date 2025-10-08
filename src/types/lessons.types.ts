export type TSubject = {
  id: string;
  name: string;
  syllabus: string[];
  preClass?: TPreClass;
  training?: TTraining;
  lecture?: TLecture;
  postClass?: TPostClass;
};

export type TDocument = {
  id: string;
  name: string;
  type: "pdf" | "doc" | "ppt";
  uploadedAt: Date;
  blob: Blob;
};

export type TSummary = string

export type TTestCase = {
  input: string
  expectedOutput: string
}

export type TQuizQuestion = {
  id: string
  question: string
  options: string[]
  correctAnswer: number
}

export type TTheoryQuestion = {
  id: string
  question: string
  answer: string
  difficulty: "easy" | "medium" | "hard"
}

export type TCodingQuestion = {
  id: string
  question: string
  testCases: TTestCase[]
  difficulty: "easy" | "medium" | "hard"
}


export type TPreClass = {
  document: TDocument
  summary?: TSummary
  quizQuestions?: TQuizQuestion[]
}

export type TTraining = {
  document: TDocument
  summary?: TSummary
  quizQuestions?: TQuizQuestion[]
  theoryQuestions?: TTheoryQuestion[]
  codingQuestions?: TCodingQuestion[]
}

export type TLecture = {
  document: TDocument
  summary?: TSummary
}

export type TPostClass = {
  document: TDocument
  summary?: TSummary
  quizQuestions?: TQuizQuestion[]
}
