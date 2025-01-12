import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DestinationsOverview from "../components/DestinationOverview";
import { FilteringBar } from "../components/FilteringBar";
import { DestinationProps } from "../components/GalleryDestination";
import NavBar from "../components/NavBar";
import { getAllDestinations } from "../controllers/fierbaseController";
import "../css/DestinationChooser.css";

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

  const applyFilters = async (tags: string[], price: number) => {
    const filteredDestinations = (await getAllDestinations()).filter(
      (destination) => {
        return (
          destination.price <= price &&
          tags.filter((tag) => !destination.tags.includes(tag)).length == 0
        );
      }
    );

    setDestinations(filteredDestinations);
  };

  let navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  let navigate1 = useNavigate();
  const handleDestinationTileClicked = (destinationId: string) => {
    navigate1("/destination/" + destinationId);
  };

  return (
    <div>
      <NavBar handleLogoHomeClicked={goToHomePage} />
      <FilteringBar applyFilters={applyFilters} showSlider={true} />

      <DestinationsOverview
        destinations={destinations}
        handleTileClicked={handleDestinationTileClicked}
      />
    </div>
  );
}
