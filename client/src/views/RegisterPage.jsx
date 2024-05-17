import { useEffect } from 'react';

import { RegisterForm } from '../components/organisms';

const RegisterPage = () => {
  useEffect(() => {
    document.title = 'Register | Hacktify';
  }, []);

  return <RegisterForm />;
};

export default RegisterPage;
