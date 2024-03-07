import Destination, { DestinationProps } from "./GalleryDestination";
import "../css/DestinationChooser.css";

export interface MainGalleryProps {
  destinations: DestinationProps[];
  handleTileClicked: (destinationID: string) => void;
}

const DestinationsOverview: React.FC<MainGalleryProps> = ({
  destinations,
  handleTileClicked,
}) => {
  return (
    <div className="DestinationOverview">
      {destinations.map((destination) => (
        <div key={destination.name} className="SingleDestination">
          <button onClick={() => handleTileClicked(destination.id)}>
            <Destination
              name={destination.name}
              imageSrc={destination.imageSrc}
              key={destination.id}
              id={destination.id}
              region={destination.region}
              description={destination.region}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default DestinationsOverview;
