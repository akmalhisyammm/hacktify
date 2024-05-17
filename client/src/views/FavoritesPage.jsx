import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { API_URL } from '../constants/url';
import { SpotifyPlayer } from '../components/organisms';
import { fetchFavorites } from '../features/favorites/favoritesSlice';

const FavoritesPage = () => {
  const [searchedTrack, setSearchedTrack] = useState(null);

  const { favorites, loading, error } = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  const handleSearchTrack = async (track, index) => {
    try {
      const response = await axios.get(
        `${API_URL}/tracks/search?q=${encodeURIComponent(`${track.name} - ${track.artist}`)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
          },
        }
      );
      setSearchedTrack({ ...response.data, index });
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-center' });
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await axios.delete(`${API_URL}/favorites/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
        },
      });
      dispatch(fetchFavorites());
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-center' });
    }
  };

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.response.data.message, { position: 'bottom-center' });
    }
  }, [error]);

  return (
    <section className="flex flex-col gap-4 my-4">
      <div className="text-3xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          My Favorites
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
          <p className="font-bold text-center animate-pulse">Loading favorites...</p>
        </div>
      ) : (
        <>
          {searchedTrack && <SpotifyPlayer trackId={searchedTrack.id} />}
          {favorites.length ? (
            <>
              {!localStorage.getItem('spotify_access_token') && (
                <div role="alert" className="alert alert-warning">
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
                  <span>
                    Please connect your Spotify account on the{' '}
                    <Link to="/profile" className="link">
                      Profile
                    </Link>{' '}
                    page to show the Spotify player.
                  </span>
                </div>
              )}
              <div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 rounded-xl"
                style={{
                  backgroundImage: searchedTrack && `url(${searchedTrack.album.images[0].url})`,
                  padding: searchedTrack && '1.5rem',
                }}
              >
                {favorites.map((favorite, index) => (
                  <div key={favorite.id} className="card glass">
                    <div className="card-body">
                      <h2 className="card-title">{favorite.name}</h2>
                      <p>{favorite.artist}</p>
                      <div className="flex flex-col gap-2 mt-4">
                        {localStorage.getItem('spotify_access_token') && (
                          <>
                            {searchedTrack && searchedTrack.index === index ? (
                              <button
                                className="btn btn-neutral"
                                onClick={() => setSearchedTrack(null)}
                              >
                                Remove Spotify Player
                              </button>
                            ) : (
                              <button
                                className="btn btn-success text-base-100"
                                onClick={() => handleSearchTrack(favorite, index)}
                              >
                                Show Spotify Player
                              </button>
                            )}
                          </>
                        )}
                        <button
                          className="btn btn-error text-base-100"
                          onClick={() => handleRemoveFavorite(favorite.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div>
              <img src="/pikachu-404.gif" alt="Pikachu 404" width={200} className="mx-auto" />
              <p className="font-bold text-center">You don&apos;t have any favorite yet</p>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FavoritesPage;
