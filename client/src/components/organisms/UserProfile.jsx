import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Heading } from '../atoms';
import { API_URL } from '../../constants/url';
import { fetchUser } from '../../features/user/userSlice';

const UserProfile = () => {
  const { data, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDisconnectSpotify = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <section className="flex flex-col gap-4 my-4">
      <Heading>My Profile</Heading>
      {loading ? (
        <div>
          <img src="/pikachu-loading.gif" alt="Pikachu loading" width={120} className="mx-auto" />
          <p className="font-bold text-center animate-pulse">Loading profile...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <figure className="w-32 h-32">
              <img src={data?.Profile.picture} alt={data?.Profile.name} className="w-full h-full" />
            </figure>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{data?.Profile.name}</h3>
              <p>Email: {data?.email}</p>
              <p>Gender: {data?.Profile.gender || '-'}</p>
              <p>Phone: {data?.Profile.phone || '-'}</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 sm:justify-start">
            {localStorage.getItem('spotify_access_token') ? (
              <button className="btn btn-error text-base-100" onClick={handleDisconnectSpotify}>
                Disconnect from Spotify
              </button>
            ) : (
              <a href={`${API_URL}/auth/spotify`} className="btn btn-success text-base-100">
                Connect to Spotify
              </a>
            )}
            <Link to="/profile/edit" className="btn btn-warning">
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserProfile;
