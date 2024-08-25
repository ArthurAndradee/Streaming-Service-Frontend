// ProfilePicker.tsx
import { useNavigate, useLocation } from 'react-router-dom';
import ProfileBubble from '../../Components/Profile-Picker/Profile-Bubble/profile-bubble';
import './profile-picker.css';
import { Profile } from '../../utils/interfaces/objects';

function ProfilePicker() {
  const navigate = useNavigate();
  const location = useLocation();
  const profiles = location.state?.profiles || [];

  const handleProfileSelect = (userName: string) => {
    localStorage.setItem('selectedProfile', userName);
    navigate('/home');
  };

  return (
    <div className='main-profile-picker d-flex flex-column align-items-center text-light'>
      <h3 className='profile-title'>Who is watching?</h3>
      <div className='profiles-container'>
        {profiles.map((profile: Profile) => (
          <ProfileBubble
            userName={profile.name}
            userPicture={profile.picture}
            onClick={() => handleProfileSelect(profile.name)}
          />
        ))}
      </div>
      <button className='btn btn-dark edit-profile-button' style={{width:'150px'}} onClick={() => navigate('/home')}>Editar</button>
    </div>
  );
}

export default ProfilePicker;
