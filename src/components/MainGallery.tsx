import React, { useState } from "react";
import Destination, { DestinationProps } from "./Destination";
import "../css/Main.css";

// Move this to Destination?

export interface MainGalleryProps {
  destinations: DestinationProps[];
  showArrows?: boolean;
}

const MainGallery: React.FC<MainGalleryProps> = ({ destinations, showArrows = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const numberOfDestinationsShown = 3;

  const goLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < destinations.length - 3
        ? prevIndex + 1
        : destinations.length - numberOfDestinationsShown
    );
  };

  return (
    <div className="maingallery">
      {showArrows && <button onClick={goLeft}>{"<"}</button>}
      {destinations
        .slice(currentIndex, currentIndex + numberOfDestinationsShown)
        .map((destination) => (
          <Destination
            key={destination.name} // Husk å legge til en nøkkel for hver destinasjon
            name={destination.name}
            imageSrc={destination.imageSrc}
          />
        ))}
      {showArrows && <button onClick={goRight}>{">"}</button>}
    </div>
  );
};

export default MainGallery;
