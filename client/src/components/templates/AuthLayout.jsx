import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-pink-400">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
