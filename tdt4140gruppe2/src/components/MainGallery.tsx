import React from 'react';
import Destination from './Destination';
import "../css/Main.css";


const destinations = [
  { name: 'Destination 1', image: '../assets/profile.jpg' },
  { name: 'Destination 2', image: 'image2.jpg' },
  { name: 'Destination 3', image: 'image3.jpg' },
  // Add more destinations as needed
];


const MainGallery: React.FC = () => {
  return (
    <div className="maingallery">
      {destinations.map((destination, index) => (
        <Destination key={index} name={destination.name} src={destination.image} />
      ))}
    </div>
  );
};

export default MainGallery;
