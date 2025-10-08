import type { TSubject } from '@/types/lessons.types';
import { openDB, type DBSchema } from 'idb';

interface SLA_DB extends DBSchema {
  subject: {
    key: string;
    value: TSubject;
  };
}

export const dbPromise = openDB<SLA_DB>('student-learning-assistant-db', 2, {
  async upgrade(db) {
    // Create store if missing
    const storeExists = db.objectStoreNames.contains('subject');
    const store = storeExists
      ? db.transaction('subject', 'readwrite').objectStore('subject')
      : db.createObjectStore('subject', { keyPath: 'id' });

    // Seed only if empty
    const existing = store.getAllKeys ? await store.getAllKeys() : [];
    if (existing.length === 0) {
      store.add({
        id: 'ds-algo',
        name: 'Data Structures & Algorithms',
        syllabus: [
          "Arrays and Strings",
          "Linked Lists",
          "Stacks and Queues",
          "Trees and Graphs",
          "Sorting Algorithms",
          "Searching Algorithms",
          "Dynamic Programming",
          "Greedy Algorithms",
          "Backtracking",
          "Divide and Conquer",
          "Bit Manipulation",
          "Recursion"
        ]
      });

      store.add({
        id: 'web-dev',
        name: 'Web Development',
        syllabus: [
          "HTML, CSS, and JavaScript",
          "Front-end Frameworks (e.g., React, Vue.js)",
          "Back-end Frameworks (e.g., Node.js, Express.js)",
          "Databases (e.g., MongoDB, MySQL)",
          "Version Control (e.g., Git)",
          "Deployment (e.g., Heroku, AWS)"
        ]
      });
    }
  },
});