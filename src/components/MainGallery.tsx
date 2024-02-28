import React, { useState } from "react";
import Destination, { DestinationProps } from "./GalleryDestination";
import "../css/Main.css";

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
      {showArrows && <button className="galleryButton" onClick={goLeft}>{"<"}</button>}
      {destinations
        .slice(currentIndex, currentIndex + numberOfDestinationsShown)
        .map((destination) => (
          <Destination
            key={destination.name}
            name={destination.name}
            imageSrc={destination.imageSrc}
            price={destination.price}
          />
        ))}
      {showArrows && <button className="galleryButton" onClick={goRight}>{">"}</button>}
    </div>
  );
};

export default MainGallery;
