import { Button } from '@/components/ui/button';
import { useRole } from '@/hooks/role/use-role';

export const RoleSelector = () => {
  const { setRole } = useRole();

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setRole(role);
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Select Role</h2>
        <div className="flex justify-center gap-3">
          <Button className="bg-blue-500" onClick={() => handleRoleSelect('student')}>
            Student
          </Button>
          <Button className="bg-green-500" onClick={() => handleRoleSelect('teacher')}>
            Teacher
          </Button>
        </div>
      </div>
    </div>
  )
}
