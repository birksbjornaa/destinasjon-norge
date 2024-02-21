import React, { useState } from "react";
import Destination, { DestinationProps } from "./GalleryDestination";
import "../css/Main.css";

// Move this to Destination?

export interface MainGalleryProps {
  destinations: DestinationProps[];
}

const MainGallery: React.FC<MainGalleryProps> = ({ destinations }) => {
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
      <button onClick={goLeft}>{"<"}</button>
      {destinations
        .slice(currentIndex, currentIndex + numberOfDestinationsShown)
        .map((destination) => (
          <Destination
            name={destination.name}
            imageSrc={destination.imageSrc}
          />
        ))}
      <button onClick={goRight}>{">"}</button>
    </div>
  );
};

export default MainGallery;
