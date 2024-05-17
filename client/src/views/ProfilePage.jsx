import { TopTrackList, UserMoods, UserProfile } from '../components/organisms';

const ProfilePage = () => {
  return (
    <>
      <UserProfile />

      {localStorage.getItem('spotify_access_token') && (
        <>
          <UserMoods />
          <TopTrackList />
        </>
      )}
    </>
  );
};

export default ProfilePage;
