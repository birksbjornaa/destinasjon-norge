import MainGallery from "../components/MainGallery";
import SubHeader from "../components/SubHeader";
import "../css/Main.css";
import { getAllDestinations } from "../controllers/fierbaseController";
import { DestinationProps } from "../components/GalleryDestination";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";

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

  return (
    <div className="homepage">
      <SearchBar />
      <div className="mainDestinations">
        <MainGallery destinations={destinations} />
      </div>
      <SubHeader string="Mest populære" />
      <div className="mainDestination">
        <MainGallery destinations={destinations} neverShowArrows={false} />{" "}
      </div>
      <SubHeader string="Vi anbefaler" />
      <div className="mainDestination">
        <MainGallery destinations={destinations} neverShowArrows={false} />{" "}
      </div>
    </div>
  );
}
