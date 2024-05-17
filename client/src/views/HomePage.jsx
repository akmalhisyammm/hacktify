import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import { API_URL } from '../constants/url';
import { SpotifyPlayer } from '../components/organisms';

const HomePage = () => {
  const [keyword, setKeyword] = useState('');
  const [generatedTracks, setGeneratedTracks] = useState([]);
  const [searchedTrack, setSearchedTrack] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateTracks = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `${API_URL}/tracks/generate?q=${encodeURIComponent(keyword)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
          },
        }
      );
      toast.success('Successfully generated tracks', { position: 'bottom-center' });
      setGeneratedTracks(response.data.tracks);
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-center' });
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleAddFavorite = async (track) => {
    try {
      await axios.post(
        `${API_URL}/favorites`,
        {
          name: track.name,
          artist: track.artist,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
          },
        }
      );
      toast.success('Successfully added to favorite', { position: 'bottom-center' });
    } catch (error) {
      toast.error('Failed to add to favorite', { position: 'bottom-center' });
    }
  };

  return (
    <>
      <section className="flex flex-col gap-4 my-4">
        <div className="text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Generate Tracks
          </span>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter your keywords..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full input input-bordered"
          />
          <button className="btn btn-secondary" disabled={isLoading} onClick={handleGenerateTracks}>
            Generate
          </button>
        </div>
        {searchedTrack && <SpotifyPlayer trackId={searchedTrack.id} />}
        {isLoading ? (
          <div>
            <img src="/pikachu-loading.gif" alt="Pikachu Loading" width={120} className="mx-auto" />
            <p className="font-bold text-center animate-pulse">Generating tracks...</p>
          </div>
        ) : (
          <>
            {!!generatedTracks.length && !localStorage.getItem('spotify_access_token') && (
              <div role="alert" className="-mt-4 alert alert-warning">
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
              {generatedTracks.map((track, index) => (
                <div key={index} className="card glass">
                  <div className="card-body">
                    <h2 className="card-title">{track.name}</h2>
                    <p>{track.artist}</p>
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
                              onClick={() => handleSearchTrack(track, index)}
                            >
                              Show Spotify Player
                            </button>
                          )}
                        </>
                      )}
                      <button className="btn btn-primary" onClick={() => handleAddFavorite(track)}>
                        Add to Favorite
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HomePage;
