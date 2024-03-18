import { useContext, useEffect, useState } from "react";
import {
  createMissingData,
  getDestination,
  deleteDestination,
} from "../controllers/fierbaseController";
import "../css/DestinationDetailed.css";
import Like from "../assets/Like.png";
import Unlike from "../assets/Unlike.png";
import Visited from "../assets/Visited.png";
import Unvisited from "../assets/Unvisited.png";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import DeleteButton from "../components/DeleteButton"; // Import the DeleteButton component
import { AuthContext } from "../context/AuthContext";

export default function DestinationDetailed() {
  const [destination, setDestination] = useState(createMissingData());
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isVisited, setIsVisited] = useState<boolean>(false);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const { id } = useParams<{ id: string }>();
  let currentDestinationId: string = id as string;

  const fetchAndSetData = async () => {
    const fetchedDestination = await getDestination(currentDestinationId);
    setDestination(fetchedDestination);
  };

  const toggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const toggleLike2 = () => {
    setIsVisited((prevIsVisited) => !prevIsVisited);
  };

  const handleDelete = async () => {
    try {
      await deleteDestination(currentDestinationId);
      alert("Destination deleted successfully!"); // Optionally provide feedback to the user
      navigate("/");
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Failed to delete destination. Please try again later."); // Optionally provide error feedback
    }
  };

  let navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  const handleDestinationTileClicked = (destinationId: string) => {
    navigate("/edit/" + destinationId);
  };
  const currentUser = useContext(AuthContext)?.user;
  return (
    <div className="destinationDetailed">
      <NavBar handleLogoHomeClicked={goToHomePage} />
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

        <button
          className="visited-button"
          id="toggleButton2"
          onClick={toggleLike2}
        >
          <img
            className="visited"
            id="image2"
            src={isVisited ? Visited : Unvisited}
            alt={isVisited ? "Visited" : "Unvisited"}
          />
        </button>

        <div className="image-container">
          <img src={destination.imageSrc} alt="Image" className="image" />
        </div>
        <br />
        <div className="edit-delete-container">
          {currentUser &&
            currentUser.loggedIn &&
            currentUser.role === "admin" && (
              <>
                <button
                  className="edit-button"
                  id="Edit"
                  onClick={() => handleDestinationTileClicked(destination.id)}
                >
                  Rediger
                </button>
                <button className="delete-button" id="Delete">
                  Slett
                </button>
              </>
            )}
        </div>
        <div className="tags-ratings-container">
          <div className="tags">
            {destination.tags.map((tag) => (
              <ul key={tag}>
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
        <a
          href={`https://www.yr.no/nb/v%C3%A6rvarsel/daglig-tabell/${destination.yrid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://www.yr.no/nb/innhold/${destination.yrid}/meteogram.svg`}
            alt="Image"
            className="image"
          />
        </a>
      </div>
      <h2 className="sub-header">Kommentarer</h2>
    </div>
  );
}
