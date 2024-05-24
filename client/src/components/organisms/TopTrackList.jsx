import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Heading } from '../atoms';
import { TopTrackItem } from '../molecules';
import axios from '../../lib/axios';

const TopTrackList = () => {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        if (!localStorage.getItem('spotify_access_token')) return;

        const response = await axios.get('/users/top/tracks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
          },
        });
        setTopTracks(response.data.items);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchTopTracks();
  }, []);

  return (
    <section className="flex flex-col gap-4 my-4">
      <Heading>My Top Tracks</Heading>
      <article className="grid grid-cols-1 gap-0 md:gap-4 md:grid-cols-2">
        {topTracks.map((track, index) => (
          <TopTrackItem key={track.id} track={track} index={index} />
        ))}
      </article>
    </section>
  );
};

export default TopTrackList;
