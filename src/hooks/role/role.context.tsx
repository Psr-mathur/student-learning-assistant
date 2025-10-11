import { createContext } from 'react';

export type Role = 'student' | 'teacher';
export type RoleContextType = {
  role?: Role;
  setRole: (role: Role) => void;
  isTeacher: boolean;
  isStudent: boolean;
}

export const RoleContext = createContext<RoleContextType>({
  isStudent: false,
  isTeacher: false,
  role: undefined,
  setRole: () => { }
});