import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePicture from "../assets/profilePicture.png";
import MainGallery from "../components/MainGallery";
import { getAllDestinations } from "../controllers/fierbaseController";
import "../css/Main.css";
import "../css/Profile.css";
import FilteringBar from "./FilteringBar";
import { DestinationProps } from "./GalleryDestination";
import { AuthContext } from "../context/AuthContext";
import { updateProfileTags } from "../controllers/userController";

const UserProfile: React.FC = () => {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);
  const [statusTags, setStatusTags] = useState<string>("");
  const context = useContext(AuthContext);
  const currentUser = context?.user;

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };

  const applyFilters = async (tags: string[]) => {
    if (!currentUser) {
      return;
    }
    const isUpdated = await updateProfileTags(currentUser, tags);
    if (isUpdated) {
      setStatusTags("Oppdatering av tags gikk fint!");
      await context.downloadAndSetUser(currentUser.email);
    } else {
      setStatusTags("Noe gikk galt!");
    }
    excecuteShake();
  };

  const navigate = useNavigate();

  const handleDestinationTileClicked = (destinationId: string) => {
    navigate("/destination/" + destinationId);
  };
  const [shake, setShake] = useState(false);

  const excecuteShake = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500); // (0.5s)
  };

  return (
    <div className="profile-page">
      <div className="user-profile">
        <div className="profile-image">
          <img src={profilePicture} alt="Profile" />
        </div>
        <div className="email">
          <p>{currentUser ? currentUser.email : ""}</p>
          <br></br>
          <p>
            Bla ned for å se en oversikt over dine foretrukne tags, dine besøkte{" "}
            <br></br>destinasjoner, favorittdestinasjoner og dine egne
            vurderinger
          </p>
          <p>
            Bla ned for å se en oversikt over dine foretrukne tags, dine besøkte{" "}
            <br></br>destinasjoner, favorittdestinasjoner og dine egne
            vurderinger
          </p>
        </div>
      </div>
      <div className="tags">
        <h2>Mine foretrukne tags</h2>
        <div className="filter">
          <FilteringBar applyFilters={applyFilters} showSlider={false} />
          <h3 className={shake ? "shake-animation" : ""}>{statusTags}</h3>
        </div>
      </div>
      <div>
        <h2>Besøkte destinasjoner</h2>
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
