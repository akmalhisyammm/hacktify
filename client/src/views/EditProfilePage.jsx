import { useEffect } from 'react';
import { EditProfileForm } from '../components/organisms';

const EditProfilePage = () => {
  useEffect(() => {
    document.title = 'Edit Profile | Hacktify';
  }, []);

  return <EditProfileForm />;
};

export default EditProfilePage;
