import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import { Heading } from '../atoms';
import { API_URL } from '../../constants/url';

const EditProfileForm = () => {
  const [form, setForm] = useState({
    name: '',
    gender: '',
    picture: '',
    phone: '',
  });

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/users/me`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('default_access_token')}`,
        },
      });

      toast.success('Successfully updated profile', { position: 'bottom-center' });
      navigate('/profile');
    } catch (error) {
      toast.error(error.response.data.message, { position: 'bottom-center' });
    }
  };

  useEffect(() => {
    if (user) {
      setForm({
        name: user.Profile.name,
        gender: user.Profile.gender,
        picture: user.Profile.picture,
        phone: user.Profile.phone,
      });
    }
  }, [user]);

  return (
    <section className="flex flex-col gap-4 my-4">
      <Heading>Edit Profile</Heading>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full input input-bordered"
            required
          />
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <select
            className="w-full select select-bordered"
            value={form.gender}
            onChange={(e) => setForm({ ...form, gender: e.target.value })}
            required
          >
            <option value="">Select gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Picture URL</span>
          </div>
          <input
            type="text"
            value={form.picture}
            onChange={(e) => setForm({ ...form, picture: e.target.value })}
            className="w-full input input-bordered"
            required
          />
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Phone</span>
          </div>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full input input-bordered"
          />
        </label>

        <button type="submit" className="my-2 btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
};

export default EditProfileForm;
