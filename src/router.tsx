import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ClassSetupPage } from './pages/lessons/class-setup/class-setup.page';
import { LessonsPage } from './pages/lessons/lessons.page';
import { PreClassPage } from './pages/lessons/pre-class/pre-class.page';
import { RootLayout } from './pages/root-layout';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout />
    ),
    children: [
      {
        path: "/",
        element: <DashboardPage />
      },
      {
        path: "/lessons",
        element: <LessonsPage />
      },
      {
        path: "/lessons/class-setup",
        element: <ClassSetupPage />
      },
      {
        path: "/lessons/pre-class",
        element: <PreClassPage />
      }
    ]
  }
])