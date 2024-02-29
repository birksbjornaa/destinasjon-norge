import React, { useState } from "react";
import Destination, { DestinationProps } from "./GalleryDestination";
import "../css/Main.css";

export interface MainGalleryProps {
  destinations: DestinationProps[];
  neverShowArrows?: boolean;
}

const MainGallery: React.FC<MainGalleryProps> = ({
  destinations,
  neverShowArrows = false,
}) => {
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
      {!neverShowArrows && (
        <button className="galleryButton" onClick={goLeft}>
          {"<"}
        </button>
      )}
      {destinations
        .slice(currentIndex, currentIndex + numberOfDestinationsShown)
        .map((destination) => (
          <Destination
            key={destination.name}
            name={destination.name}
            imageSrc={destination.imageSrc}
          />
        ))}
      {!neverShowArrows && (
        <button className="galleryButton" onClick={goRight}>
          {">"}
        </button>
      )}
    </div>
  );
};

export default MainGallery;
