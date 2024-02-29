import { useEffect, useState } from "react";
import {
  createMissingData,
  getDestination,
} from "../controllers/fierbaseController";
import "../css/DestinationDetailed.css";
import Like from "../assets/Like.png";
import Unlike from "../assets/Unlike.png";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function DestinationDetailed() {
  const [destination, setDestination] = useState(createMissingData());
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const { id } = useParams<{ id: string }>();
  let currentDestinationId: string = id as string;

  const fetchAndSetData = async () => {
    const fetchedDestination = await getDestination(currentDestinationId);
    console.log(destination.name);
    setDestination(fetchedDestination);
  };

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className="destinationDetailed">
      <NavBar />
      <div className="container">
        <h1 className="header">{destination.name}</h1>

        <button
          className="favorite-button"
          id="toggleButton"
          onClick={toggleLike}
        >
          <img
            className="favorite"
            id="image"
            src={isLiked ? Like : Unlike}
            alt={isLiked ? "Like" : "Unlike"}
          />
        </button>
        <div className="image-container">
          <img src={destination.imageSrc} alt="Image" className="image" />
        </div>
        <div className="tags-ratings-container">
          <div className="tags">
            {destination.tags.map((tag) => (
              <ul>
                <li>#{tag}</li>
              </ul>
            ))}
          </div>
          <div className="ratings">Vurdering: 3.75/5</div>
        </div>
        <h2 className="sub-header">Beskrivelse</h2>
        <p id="textbeskrivelse" className="text">
          {destination.description}
        </p>
      </div>
      <h2 className="sub-header">Kommentarer</h2>
    </div>
  );
}
