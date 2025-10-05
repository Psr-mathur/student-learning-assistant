import { createMutationHook, createQueryHook } from '@/hooks/tanstack-hook';
import lessonsApi from './lessons.api';

export default class LessonsService {
  static useGetSubjects = createQueryHook({
    queryKey: () => ['lessons', 'subjects'],
    queryFn: lessonsApi.getSubjects,
  });

  static useGetQuizzes = createQueryHook({
    queryKey: (documentId: string) => ['lessons', 'quizzes', documentId],
    queryFn: lessonsApi.getQuizzes,
  });

  static useGetSummary = createQueryHook({
    queryKey: (documentId: string) => ['lessons', 'summary', documentId],
    queryFn: lessonsApi.getSummary,
  });

  static useGenerateSummary = createMutationHook({
    mutationFn: lessonsApi.generateSummary,
  });

  static useGenerateQuiz = createMutationHook({
    mutationFn: lessonsApi.generateQuiz,
  });

  static useGeneratePractice = createMutationHook({
    mutationFn: lessonsApi.generatePractice,
  });

}