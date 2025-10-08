import { Sidebar } from '@/components/sidebar';
import { Outlet } from 'react-router-dom';
import { RoleSelector } from './_comp/role-selector';

export const RootLayout = () => {

  const role = sessionStorage.getItem('role');

  if (!role) {
    return <RoleSelector />
  }

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
