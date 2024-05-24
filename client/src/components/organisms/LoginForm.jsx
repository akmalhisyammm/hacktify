import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../../lib/axios';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleGoogleLogin = async (codeResponse) => {
    try {
      const response = await axios.get('/auth/google', {
        headers: {
          token: codeResponse.credential,
        },
      });

      localStorage.setItem('default_access_token', response.data.access_token);
      toast.success('Successfully logged in');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', form);

      localStorage.setItem('default_access_token', response.data.access_token);
      toast.success('Successfully logged in');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="w-full p-8 m-4 shadow-xl card glass max-w-96">
      <h1 className="flex justify-center gap-4 mb-6 text-2xl font-bold">
        <img src="/hacktify.png" alt="Hacktify" width={30} />
        Login to Hacktify
        <img src="/hacktify.png" alt="Hacktify" width={30} />
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
        <label className="flex items-center gap-2 input input-bordered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>
        <label className="flex items-center gap-2 input input-bordered">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
      <p className="mt-6 mb-2 text-center">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="link link-primary">
          Register
        </Link>
      </p>
      <div className="divider">OR</div>
      <div className="flex justify-center">
        <GoogleLogin onSuccess={handleGoogleLogin} />
      </div>
    </section>
  );
};

export default LoginForm;
