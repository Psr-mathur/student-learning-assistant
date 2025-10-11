import { useEffect, useState, type ReactNode } from 'react';
import type { Role } from './role.context';
import { RoleContext } from './role.context';

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role>();

  useEffect(() => {
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole as Role);
    }
  }, []);

  const updateRole = (newRole: Role) => {
    setRole(newRole);
    if (newRole) {
      sessionStorage.setItem('role', newRole);
    } else {
      sessionStorage.removeItem('role');
    }
  };

  const value = {
    role: role,
    setRole: updateRole,
    isTeacher: role === 'teacher',
    isStudent: role === 'student'
  };

  return (
    <RoleContext.Provider value={value} > {children} </RoleContext.Provider>
  );
};