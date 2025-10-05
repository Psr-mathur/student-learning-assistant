import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLessonsStore } from "./lessons.store";

export const LessonsLayout = () => {
  const { selectedSubject } = useLessonsStore();
  const location = useLocation();

  const isClassSetupRoute = location.pathname === "/lessons/class-setup";

  if (!selectedSubject && !isClassSetupRoute) {
    return <Navigate to="/lessons/class-setup" replace />;
  }

  return <Outlet />;
};