import { useEffect } from 'react';

import { LoginForm } from '../components/organisms';

const LoginPage = () => {
  useEffect(() => {
    document.title = 'Login | Hacktify';
  }, []);

  return <LoginForm />;
};

export default LoginPage;
