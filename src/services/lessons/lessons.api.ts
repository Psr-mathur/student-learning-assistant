import type { TPractice, TPracticeQuestion, TQuiz, TQuizQuestion, TSubject, TSummary } from '@/types/lessons.types';
import { axiosInstance } from '@/utils/axios';
import { delay } from '@/utils/delay';

export default class {
  static async getSubjects() {
    const res = await axiosInstance.get<TSubject[]>("/subjects");
    return res.data;
  }

  static async getQuizzes(_documentId: string) {
    const res = await axiosInstance.get<TQuizQuestion[]>("/quizzes");
    return res.data;
  }

  static async getSummary(_documentId: string) {
    const res = await axiosInstance.get<TSummary[]>("/summaries");
    return res.data;
  }

  static async generateSummary({ documentId }: { documentId: string }): Promise<TSummary> {
    await delay(1500)

    return {
      id: `summary-${Date.now()}`,
      documentId,
      content: `This is a comprehensive summary of the uploaded document. The document covers key concepts including fundamental principles, practical applications, and advanced topics. Main points include: 1) Introduction to core concepts and their significance in the field. 2) Detailed explanation of methodologies and best practices. 3) Real-world examples demonstrating practical implementation. 4) Advanced techniques for optimization and efficiency. 5) Common pitfalls and how to avoid them.`,
      generatedAt: new Date(),
    }
  }

  static async generateQuiz({ documentId }: { documentId: string }): Promise<TQuiz> {
    await delay(2000)

    const questions: TQuizQuestion[] = [
      {
        id: `q1-${Date.now()}`,
        question: "What is the primary concept discussed in this document?",
        options: [
          "Basic fundamentals and core principles",
          "Advanced optimization techniques",
          "Historical background only",
          "Future predictions",
        ],
        correctAnswer: 0,
        explanation:
          "The document primarily focuses on establishing fundamental concepts before moving to advanced topics.",
      },
      {
        id: `q2-${Date.now()}`,
        question: "Which methodology is recommended for practical implementation?",
        options: [
          "Trial and error approach",
          "Systematic step-by-step methodology",
          "Random experimentation",
          "Theoretical analysis only",
        ],
        correctAnswer: 1,
        explanation: "A systematic approach ensures better results and reduces errors.",
      },
      {
        id: `q3-${Date.now()}`,
        question: "What is the key benefit of following best practices?",
        options: [
          "Faster completion time",
          "Improved efficiency and reliability",
          "Reduced documentation needs",
          "Simplified testing requirements",
        ],
        correctAnswer: 1,
        explanation: "Best practices lead to more efficient and reliable implementations.",
      },
      {
        id: `q4-${Date.now()}`,
        question: "How should common pitfalls be addressed?",
        options: [
          "Ignore them initially",
          "Learn from mistakes after they occur",
          "Proactive prevention through awareness",
          "Wait for automated detection",
        ],
        correctAnswer: 2,
        explanation: "Being aware of common pitfalls helps prevent them before they occur.",
      },
      {
        id: `q5-${Date.now()}`,
        question: "What is the recommended approach for advanced topics?",
        options: [
          "Skip fundamentals and jump directly",
          "Build upon foundational knowledge",
          "Study independently without context",
          "Focus only on theoretical aspects",
        ],
        correctAnswer: 1,
        explanation: "Advanced topics are best understood when built upon a solid foundation.",
      },
    ]

    return {
      id: `quiz-${Date.now()}`,
      documentId,
      questions,
      generatedAt: new Date(),
    }
  }

  static async generatePractice(
    { documentId }: { documentId: string }
  ): Promise<TPractice> {
    await delay(1800)

    const questions: TPracticeQuestion[] = [
      {
        id: `pq1-${Date.now()}`,
        type: "theory",
        question: "Explain the key differences between synchronous and asynchronous programming paradigms.",
        answer:
          "Synchronous programming executes tasks sequentially, blocking execution until each task completes. Asynchronous programming allows tasks to run concurrently, enabling non-blocking operations and better resource utilization.",
        difficulty: "medium",
      },
      {
        id: `pq2-${Date.now()}`,
        type: "theory",
        question: "Describe the importance of data structures in algorithm efficiency.",
        answer:
          "Data structures directly impact algorithm performance by determining how data is organized, accessed, and modified. Choosing the right data structure can reduce time complexity from O(n²) to O(log n) or even O(1).",
        difficulty: "medium",
      },
      {
        id: `pq3-${Date.now()}`,
        type: "theory",
        question: "What are the SOLID principles in software engineering?",
        answer:
          "SOLID stands for: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion. These principles guide object-oriented design for maintainable and scalable code.",
        difficulty: "hard",
      },
      {
        id: `pq1-${Date.now()}`,
        type: "coding",
        question: "Write a function to reverse a string without using built-in reverse methods.",
        testCases: [
          { input: '"hello"', expectedOutput: '"olleh"' },
          { input: '"world"', expectedOutput: '"dlrow"' },
          { input: '"a"', expectedOutput: '"a"' },
        ],
        difficulty: "easy",
      },
      {
        id: `pq2-${Date.now()}`,
        type: "coding",
        question: "Implement a function to find the maximum element in an array.",
        testCases: [
          { input: "[1, 5, 3, 9, 2]", expectedOutput: "9" },
          { input: "[-1, -5, -3]", expectedOutput: "-1" },
          { input: "[42]", expectedOutput: "42" },
        ],
        difficulty: "easy",
      },
      {
        id: `pq3-${Date.now()}`,
        type: "coding",
        question: "Write a function to check if a string is a palindrome.",
        testCases: [
          { input: '"racecar"', expectedOutput: "true" },
          { input: '"hello"', expectedOutput: "false" },
          { input: '"a"', expectedOutput: "true" },
        ],
        difficulty: "medium",
      },
    ]

    return {
      id: `pq-${Date.now()}`,
      documentId,
      questions,
      generatedAt: new Date(),
    }
  }
}