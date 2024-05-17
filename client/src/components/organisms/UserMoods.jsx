import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { API_URL } from '../../constants/url';

const UserMoods = () => {
  const [generatedMoods, setGeneratedMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateMoods = async () => {
    try {
      if (!localStorage.getItem('spotify_access_token')) return;

      setIsLoading(true);

      const response = await axios.get(`${API_URL}/users/moods/detect`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('spotify_access_token')}`,
        },
      });
      toast.success('Successfully generated moods', { position: 'bottom-center' });
      setGeneratedMoods(response.data.moods);
    } catch (error) {
      toast.error('Failed to generate moods', { position: 'bottom-center' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 my-8">
      <div className="text-3xl font-bold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          Your Moods
        </span>
      </div>
      {isLoading ? (
        <div>
          <img src="/pikachu-loading.gif" alt="Pikachu loading" width={120} className="mx-auto" />
          <p className="font-bold text-center animate-pulse">Loading moods...</p>
        </div>
      ) : generatedMoods.length ? (
        <div className="flex gap-2">
          {generatedMoods.map((mood, index) => (
            <div key={index} className="badge badge-outline">
              {mood}
            </div>
          ))}
        </div>
      ) : (
        <button className="btn btn-secondary" onClick={handleGenerateMoods}>
          Generate
        </button>
      )}
    </section>
  );
};

export default UserMoods;
