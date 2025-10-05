import { createQueryHook } from '../../hooks/tanstack-hook';

import MockTestsApi from './mock-tests.api';

export default class MockTestsService {
  static useGetMockTests = createQueryHook({
    queryKey: () => ['mock-tests'],
    queryFn: MockTestsApi.getMockTests,
  });
}