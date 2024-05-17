import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_URL } from '../../constants/url';
import { fetchUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleDisconnectSpotify = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
  };

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message, {
        position: 'bottom-center',
      });
    }
  }, [error]);

  return (
    <section className="flex flex-col gap-4 my-4">
      <div className="text-3xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Profile
        </span>
      </div>
      {error ? (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 stroke-current shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Failed to load favorites. Please try again later.</span>
        </div>
      ) : loading ? (
        <div>
          <img src="/pikachu-loading.gif" alt="Pikachu loading" width={120} className="mx-auto" />
          <p className="font-bold text-center animate-pulse">Loading profile...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <figure className="w-32 h-32">
              <img src={user?.Profile.picture} alt={user?.Profile.name} className="w-full h-full" />
            </figure>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold">{user?.Profile.name}</h3>
              <p>Email: {user?.email}</p>
              <p>Gender: {user?.Profile.gender || '-'}</p>
              <p>Phone: {user?.Profile.phone || '-'}</p>
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
