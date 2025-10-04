import { useMutation, useQuery, type QueryKey, type UseMutationOptions, type UseMutationResult, type UseQueryOptions, type UseQueryResult, } from '@tanstack/react-query';

export function createQueryHook<TArgs, TData>({ queryKey, queryFn, ...baseOptions }: {
  queryKey: (args: TArgs) => QueryKey;
  queryFn: (args: TArgs) => Promise<TData>;
} & Omit<UseQueryOptions<TData, CustomError, TData>, 'queryKey' | 'queryFn'>) {
  return function useGeneratedQuery(
    args: TArgs,
    options?: Omit<UseQueryOptions<TData, CustomError, TData>, 'queryKey' | 'queryFn'>
  ): UseQueryResult<TData, CustomError> {
    return useQuery<TData, CustomError, TData>({
      queryKey: queryKey(args),
      queryFn: () => queryFn(args),
      ...baseOptions,
      ...options, // runtime overrides
    });
  };
}

export function createMutationHook<TData, TVariables, TContext = unknown>(
  { mutationFn, ...baseOptions }: {
    mutationFn: (variables: TVariables) => Promise<TData>;
  } & Omit<UseMutationOptions<TData, CustomError, TVariables, TContext>, 'mutationFn'>
) {
  return function useGeneratedMutation(
    options?: Omit<UseMutationOptions<TData, CustomError, TVariables, TContext>, 'mutationFn'>
  ): UseMutationResult<TData, CustomError, TVariables, TContext> {
    return useMutation<TData, CustomError, TVariables, TContext>({
      mutationFn: mutationFn,
      ...baseOptions,
      ...options, // runtime override
    });
  };
}

// Use Cases
// In Service Class
/**
export default class UserService {

  static useGetUserById = createQueryHook({
    queryKey: (args: { id: string }) => ['user', args.id],
    queryFn: UserApi.getUserById,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  static useUpdateUser = createMutationHook({
    mutationFn: UserApi.updateUser,
    onError: (error) => {
      toast.error(errorMessageFormatter(error));
    },
  });

}
*/

// Usage In Component
/**
const userRes = UserService.useGetUserById({ id: userId }, {
  enabled: !!userId,
  retry: 1, // overrides default retry if needed
});
 */
