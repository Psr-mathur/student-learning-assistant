import { dbPromise } from '@/lib/db';
import type { TCodingQuestion, TDocument, TQuizQuestion, TSubject, TTheoryQuestion } from '@/types/lessons.types';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default class {
  static async getSubjects() {
    const db = await dbPromise;
    const subjects = await db.getAll('subject');
    return subjects;
  }

  static async createSubject(data: TSubject) {
    const db = await dbPromise;
    await db.put('subject', data);
    return data;
  }

  static async updateSubject({ data }: { data: TSubject }) {
    const db = await dbPromise;
    await db.put('subject', data);
    return data;
  }

  static async generateSummary({ document }: { document: TDocument }) {
    const summary = await document.blob.text();
    return summary;
  }

  static async generateQuizQuestions({ document }: { document: TDocument }) {
    const quizQuestions = await document.blob.text();
    return [] as TQuizQuestion[];
  }

  static async generateTheoryQuestions({ document }: { document: TDocument }) {
    const theoryQuestions = await document.blob.text();
    return [] as TTheoryQuestion[];
  }

  static async generateCodingQuestions({ document }: { document: TDocument }) {
    const codingQuestions = await document.blob.text();
    return [] as TCodingQuestion[];
  }
}


