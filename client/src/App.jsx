import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import { store } from './app/store';
import router from './routes';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-center" />
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default App;
