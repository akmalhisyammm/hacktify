import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { API_URL } from '../../constants/url';
import { TopTrackItem } from '../molecules';

const TopTrackList = () => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        if (!localStorage.getItem('spotify_access_token')) return;

        const response = await axios.get(`${API_URL}/users/top/tracks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
          },
        });
        setTopTracks(response.data.items);
      } catch (error) {
        toast.error(error.response.data.message, { position: 'bottom-center' });
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <section className="flex flex-col gap-4 my-4">
      <div className="text-3xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          My Top Tracks
        </span>
      </div>
      <article className="grid grid-cols-1 gap-0 md:gap-4 md:grid-cols-2">
        {topTracks.map((track, index) => (
          <TopTrackItem key={track.id} track={track} index={index} />
        ))}
      </article>
    </section>
  );
};

export default TopTrackList;
