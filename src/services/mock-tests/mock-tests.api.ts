import { axiosInstance } from '@/utils/axios';

import type { TMockTest } from '@/types/mock-tests.types';

export default class MockTestsApi {
  static async getMockTests() {
    const res = await axiosInstance.get<TMockTest[]>("/mock-tests");
    return res.data;
  }
}