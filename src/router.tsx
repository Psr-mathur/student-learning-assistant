import { createBrowserRouter } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard/dashboard.page';
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
      }
    ]
  }
])