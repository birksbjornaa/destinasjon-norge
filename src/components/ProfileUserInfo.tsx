import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profilePicture from "../assets/profilePicture.png";
import MainGallery from "../components/MainGallery";
import { getAllDestinations } from '../controllers/fierbaseController';
import '../css/Main.css';
import '../css/Profile.css';
import { currentUserEmail } from "../pages/Login";
import FilteringBar from './FilteringBar';
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

  const applyFilters = async (tags: string[], price: number) => {
    const filteredDestinations = (await getAllDestinations()).filter(
      (destination) => {
        console.log(destination.tags);
        return (
          destination.price <= price &&
          tags.filter((tag) => !destination.tags.includes(tag)).length == 0
        );
      }
    );
    setDestinations(filteredDestinations);
  };
  
  // må lage en const for å si hva som skjer når du trykker på knappen ved filterne
  // const saveFiltersToProfile
  const navigate = useNavigate();
  
  const handleDestinationTileClicked = (destinationId: string) => {
    navigate("/destination/" + destinationId);
  };

  return (
    <div className="profile-page">
      <div className="user-profile">
        <div className="profile-image">
          <img src={profilePicture} alt="Profile" />
        </div>
        <div className="email">
          <p>{currentUserEmail}</p>
          <br></br>
          <p>Bla ned for å se en oversikt over dine foretrukne tags, dine besøkte <br></br>destinasjoner, favorittdestinasjoner og dine egne vurderinger</p>
        </div>
      </div>
      {/* finne en måte vi ikke får med prisnivå? */}
      <div className="tags">
        <h2>Mine foretrukne tags</h2>
        <div className="filter">
          <FilteringBar applyFilters={applyFilters} showSlider={false} />
        </div>
      </div>
      <div className="visited">
        <h2>Besøkte destinasjoner</h2>
        <div className="MainGalleryProfile">
          <MainGallery
              destinations={destinations}
              // handleTileClicked={saveFiltersToProfile} til når vi vil lagre dette til bruker
              handleTileClicked={handleDestinationTileClicked}
              neverShowArrows={false}
            />
            </div>
      </div>
      <div className="favourite">
        <h2>Mine favorittdestinasjoner</h2>
        <div className="MainGalleryProfile">
          <MainGallery
              destinations={destinations}
              // handleTileClicked={saveFiltersToProfile}
              handleTileClicked={handleDestinationTileClicked}
              neverShowArrows={false}
            />
        </div>
      </div>
      <div>
        <h2>Mine kommentarer</h2>
        <p>Her vil det stå kommentarer når vi har lagt til rette for det</p>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};

export default UserProfile;