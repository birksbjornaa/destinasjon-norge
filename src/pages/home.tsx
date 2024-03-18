import MainGallery from "../components/MainGallery";
import SubHeader from "../components/SubHeader";
import "../css/Main.css";
import { getAllDestinations } from "../controllers/fierbaseController";
import { DestinationProps } from "../components/GalleryDestination";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { db } from "../config/firebaseConfig";
import { collection, doc } from "@firebase/firestore";
import { currentToken } from "../pages/Login";
import { getDoc } from "firebase/firestore";

export default function Home() {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);
  const [recommended, setRecommended] = useState<DestinationProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndSetData();
      const favoriteTags = await fetchFavoriteTags();
      const newRecommended = await getRecommendedDestinations(favoriteTags);
      setRecommended(newRecommended);
    };

    fetchData();
  }, []);

  const fetchFavoriteTags = async () => {
    const colRef = collection(db, "Users");
    const docRef = doc(colRef, currentToken);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().tags;
    } else {
      return [];
    }
  };

  const getRecommendedDestinations = async (tags: string[]) => {
    const filteredDestinations = (await getAllDestinations()).filter(
      (destination) => {
        return (
          tags.filter((tag) => !destination.tags.includes(tag)).length == 0
        );
      }
    );
    return filteredDestinations;
  };

  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };

  let navigate = useNavigate();

  const handleDestinationTileClicked = (destinationId: string) => {
    navigate("/destination/" + destinationId);
  };

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="homepage">
      <NavBar handleLogoHomeClicked={goToHomePage} />
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
          destinations={recommended}
          handleTileClicked={handleDestinationTileClicked}
          neverShowArrows={false}
        />{" "}
      </div>
    </div>
  );
}
