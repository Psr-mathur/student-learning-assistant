import { Button } from '@/components/ui/button';

export const RoleSelector = () => {

  const handleRoleSelect = (role: string) => {
    sessionStorage.setItem('role', role);
    window.location.reload();
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
