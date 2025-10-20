import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import PageList from '../features/pages/PageList';
import LoginPage from '../features/auth/LoginPage';
import { useAuthStore } from '../store/authSotre';
import NewPage from '../features/pages/NewPage';
import SignupPage from '../features/auth/SignupPage';

import MainDashboard from '../features/pages/MainDashboard';
import LandingPage from '../features/pages/LandingPage';

// Protected wrapper as a route element
function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((s) => s.token);
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
}
// Conditional landing / dashboard at root
function HomeWrapper() {
  const user = useAuthStore((s) => s.user);
  return user ? <MainDashboard /> : <LandingPage />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeWrapper /> },
      {
        path: '/pages',
        element: (
          <RequireAuth>
            <PageList />
          </RequireAuth>
        ),
      },
      {
        path: '/page/new',
        element: (
          <RequireAuth>
            <NewPage />
          </RequireAuth>
        ),
      },
      // {
      //   path: '/page/:id',
      //   element: (
      //     <RequireAuth>
      //       <PageEditor />
      //     </RequireAuth>
      //   ),
      // },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
]);
