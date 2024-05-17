import { Outlet } from 'react-router-dom';

import { Footer, Header } from '../organisms';

const BaseLayout = () => {
  return (
    <>
      <Header />

      <main className="max-w-screen-xl px-4 mx-auto">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default BaseLayout;
