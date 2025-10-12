import { createMutationHook, createQueryHook } from '@/hooks/tanstack-hook';
import { generateFromAI } from '@/lib/ai';
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

  static useGenerateFromAI = createMutationHook({
    mutationKey: ['lessons', 'generateFromAI'],
    mutationFn: generateFromAI,
  });
}