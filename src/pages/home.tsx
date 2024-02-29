import MainGallery from "../components/MainGallery";
import SubHeader from "../components/SubHeader";
import "../css/Main.css";
import { getAllDestinations } from "../controllers/fierbaseController";
import { DestinationProps } from "../components/GalleryDestination";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router";

export default function Home() {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };

  //const handleHomeClick = () => {
  // Logikken for å navigere tilbake til hjemmesiden
  //};

  let navigate = useNavigate();

  const handleDestinationTileClicked = (destinationId: string) => {
    navigate("/destinationdetailed/" + destinationId);
  };

  return (
    <div className="homepage">
      <SearchBar />
      <div className="mainDestinations">
        <MainGallery
          destinations={destinations}
          handleTileClicked={handleDestinationTileClicked}
        />
      </div>
      <SubHeader string="Mest populære" />
      <div className="mainDestination">
        <MainGallery
          destinations={destinations}
          handleTileClicked={handleDestinationTileClicked}
          neverShowArrows={false}
        />{" "}
      </div>
      <SubHeader string="Vi anbefaler" />
      <div className="mainDestination">
        <MainGallery
          destinations={destinations}
          handleTileClicked={handleDestinationTileClicked}
          neverShowArrows={false}
        />{" "}
      </div>
    </div>
  );
}
