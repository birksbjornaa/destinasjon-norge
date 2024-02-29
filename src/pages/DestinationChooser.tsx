import { FilteringBar } from "../components/FilteringBar";
import { getAllDestinations } from "../controllers/fierbaseController";
import { DestinationProps } from "../components/GalleryDestination";
import "../css/DestinationChooser.css";
import { useEffect, useState } from "react";
import DestinationsOverview from "../components/DestinationOverview";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function DestinationChooser() {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);

  useEffect(() => {
    fetchAndSetData();
  }, []);
  //hente data fra nettsiden
  //filtrerer
  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };

  let navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div>
      <NavBar handleLogoHomeClicked={goToHomePage} />
      <FilteringBar />
      <div className="DestinationOverview">
        <DestinationsOverview destinations={destinations} />
      </div>
    </div>
  );
}
