import { Sidebar } from '@/components/sidebar'
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className='p-2'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
