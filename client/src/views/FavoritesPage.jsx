import { useEffect } from 'react';

import { FavoriteList } from '../components/organisms';

const FavoritesPage = () => {
  useEffect(() => {
    document.title = 'Favorites | Hacktify';
  }, []);

  return <FavoriteList />;
};

export default FavoritesPage;
