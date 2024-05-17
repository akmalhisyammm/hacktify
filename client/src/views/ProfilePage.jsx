import { useEffect } from 'react';

import { TopTrackList, MoodsGenerator, UserProfile } from '../components/organisms';

const ProfilePage = () => {
  useEffect(() => {
    document.title = 'Profile | Hacktify';
  }, []);

  return (
    <>
      <UserProfile />

      {localStorage.getItem('spotify_access_token') && (
        <>
          <MoodsGenerator />
          <TopTrackList />
        </>
      )}
    </>
  );
};

export default ProfilePage;
