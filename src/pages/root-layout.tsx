import { Sidebar } from '@/components/sidebar';
import { useRole } from '@/hooks/role/use-role';
import { Outlet } from 'react-router-dom';
import { RoleSelector } from './_comp/role-selector';
;

export const RootLayout = () => {
  const { role } = useRole();

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
