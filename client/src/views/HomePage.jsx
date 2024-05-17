import { useEffect } from 'react';

import { TracksGenerator } from '../components/organisms';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Home | Hacktify';
  }, []);

  return <TracksGenerator />;
};

export default HomePage;
