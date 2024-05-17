import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Heading } from '../atoms';
import { API_URL } from '../../constants/url';

const MoodsGenerator = () => {
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
      toast.error(error.response.data.message, { position: 'bottom-center' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4 my-8">
      <Heading>Your Moods</Heading>
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

export default MoodsGenerator;
