import { createMutationHook, createQueryHook } from '@/hooks/tanstack-hook';
import lessonsApi from './lessons.api';

export default class LessonsService {
  static useGetSubjects = createQueryHook({
    queryKey: () => ['lessons', 'subjects'],
    queryFn: lessonsApi.getSubjects,
  });

  static useUpdateSubject = createMutationHook({
    mutationKey: ['lessons', 'subject'],
    mutationFn: lessonsApi.updateSubject,
  });

  static useCreateSubject = createMutationHook({
    mutationKey: ['lessons', 'subject'],
    mutationFn: lessonsApi.createSubject,
  });

  static useGenerateSummary = createMutationHook({
    mutationKey: ['lessons', 'summary'],
    mutationFn: lessonsApi.generateSummary,
  });

  static useGenerateQuizQuestions = createMutationHook({
    mutationKey: ['lessons', 'quizQuestions'],
    mutationFn: lessonsApi.generateQuizQuestions,
  });

  static useGenerateTheoryQuestions = createMutationHook({
    mutationKey: ['lessons', 'theoryQuestions'],
    mutationFn: lessonsApi.generateTheoryQuestions,
  });

  static useGenerateCodingQuestions = createMutationHook({
    mutationKey: ['lessons', 'codingQuestions'],
    mutationFn: lessonsApi.generateCodingQuestions,
  });
}