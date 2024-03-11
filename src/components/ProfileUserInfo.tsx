import React, { useEffect, useState } from 'react';
import profilePicture from "../assets/profilePicture.png";
import { currentUserEmail } from "../pages/Login";
import '../css/Profile.css';
import MainGallery from "../components/MainGallery";
import FilteringBar from './FilteringBar';
import { getAllDestinations } from '../controllers/fierbaseController';
import { DestinationProps } from './GalleryDestination';


const UserProfile: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };
  return (
    <div className="user-profile">
      <div className="profile-image">
        <img src={profilePicture} alt="Profile" />
      </div>
      <div className="email">
        <p>{currentUserEmail}</p>
      </div>
      <div className="tags">
        <FilteringBa
      </div>
      <div className="visited">
      <MainGallery
          destinations={destinations}
          handleTileClicked={handleDestinationTileClicked}
          neverShowArrows={false}
        />
      </div>
    </div>
  );
};

export default UserProfile;