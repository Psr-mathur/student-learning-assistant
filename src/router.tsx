import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { ClassSetupPage } from './pages/lessons/class-setup/class-setup.page';
import LecturePage from './pages/lessons/lecture/lecture.page';
import { LessonsLayout } from './pages/lessons/lessons.layout';
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
        index: true,
        element: <DashboardPage />
      },
      {
        path: "lessons",
        element: <LessonsLayout />,
        children: [
          {
            index: true,
            element: <LessonsPage />
          },
          {
            path: "class-setup",
            element: <ClassSetupPage />
          },
          {
            path: "pre-class",
            element: <PreClassPage />
          },
          {
            path: "training",
            element: <TrainingPage />
          },
          {
            path: "lecture",
            element: <LecturePage />
          },
          {
            path: "post-class",
            element: <PostClassPage />
          },
          {
            path: "practice",
            element: <PracticePage />
          },
        ]
      }
    ]
  }
])