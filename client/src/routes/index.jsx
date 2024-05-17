import { createBrowserRouter, redirect } from 'react-router-dom';

import { BaseLayout } from '../components/templates';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import HomePage from '../views/HomePage';
import FavoritesPage from '../views/FavoritesPage';
import ProfilePage from '../views/ProfilePage';
import EditProfilePage from '../views/EditProfilePage';

const router = createBrowserRouter([
  {
    path: '/auth/spotify',
    loader: ({ request }) => {
      const url = new URL(request.url);
      localStorage.setItem('spotify_access_token', url.searchParams.get('access_token'));
      localStorage.setItem('spotify_refresh_token', url.searchParams.get('refresh_token'));
      return redirect('/profile');
    },
  },
  {
    loader: () => (localStorage.getItem('default_access_token') ? redirect('/') : null),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <BaseLayout />,
    loader: () => (!localStorage.getItem('default_access_token') ? redirect('/login') : null),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/profile/edit',
        element: <EditProfilePage />,
      },
    ],
  },
]);

export default router;
