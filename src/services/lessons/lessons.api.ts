import { dbPromise } from '@/lib/db';
import type { TDocument, TSubject } from '@/types/lessons.types';

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
}


