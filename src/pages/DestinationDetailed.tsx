import { useEffect, useState } from "react";
import { getAllDestinations } from "../controllers/fierbaseController";
import "../css/DestinationDetailed.css";
import { DestinationProps } from "../components/GalleryDestination";
import Like from "../assets/Like.png";
import Unlike from "../assets/Unlike.png";
import { useParams } from "react-router-dom";

export default function DestinationDetailed() {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  let { id } = useParams();

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className="homepage">

      <div className="container">

        <h1 className="header">[DestinasjonFraDatabase]</h1>

        <button className="favorite-button" id="toggleButton" onClick={toggleLike}>
          <img className="favorite" id="image" src={isLiked ? Like : Unlike} alt={isLiked ? "Like" : "Unlike"} />
        </button>

        <div className="image-container">

          <button className="arrow-button">&#60;</button>

          <img src="image-url" alt="Image" className="image" />

          <button className="arrow-button">&#62;</button>

        </div>

        <div className="tags-ratings-container">

          <div className="tags">
            <ul>
              <li>#Historie</li>
              <li>#Mat</li>
              <li>#Kultur</li>
            </ul>
          </div>

          <div className="ratings">Vurdering: 3.75/5</div>

        </div>

        <h2 className="sub-header">Beskrivelse</h2>

        <p id="textbeskrivelse" className="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
        culpa qui officia deserunt mollit anim id est laborum.
        </p>

      </div>

      <h2 className="sub-header">Kommentarer</h2>

    </div>
  );
}
