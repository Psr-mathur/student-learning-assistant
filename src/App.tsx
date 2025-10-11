import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { RoleProvider } from './hooks/role/role.provider'
import { router } from './router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 0.5 * 60 * 1000, // 5 minutes
    },
  },
})

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RoleProvider>
          <RouterProvider router={router} />
        </RoleProvider>
        <Toaster />
      </QueryClientProvider>
    </>
  )
}

export default App
