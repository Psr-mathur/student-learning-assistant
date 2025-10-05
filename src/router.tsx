import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ClassSetupPage } from './pages/lessons/class-setup/class-setup.page';
import LecturePage from './pages/lessons/lecture/lecture.page';
import { LessonsPage } from './pages/lessons/lessons.page';
import PostClassPage from './pages/lessons/post-class/post-class.page';
import PracticePage from './pages/lessons/practice/practice.page';
import { PreClassPage } from './pages/lessons/pre-class/pre-class.page';
import TrainingPage from './pages/lessons/training/training.page';
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
      },
      {
        path: "/lessons/training",
        element: <TrainingPage />
      },
      {
        path: "/lessons/lecture",
        element: <LecturePage />
      },
      {
        path: "/lessons/post-class",
        element: <PostClassPage />
      },
      {
        path: "/lessons/practice",
        element: <PracticePage />
      },
    ]
  }
])