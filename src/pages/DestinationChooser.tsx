import { FilteringBar } from "../components/FilteringBar";
import { getAllDestinations } from "../controllers/fierbaseController";
import { DestinationProps } from "../components/GalleryDestination";
import "../css/DestinationChooser.css";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import DestinationsOverview from "../components/DestinationOverview";

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

  

  return (
    <div>
      <NavBar />
      <FilteringBar />
      <div className="DestinationOverview">
      <DestinationsOverview destinations={destinations} />
      </div>
    </div>
  );
}
