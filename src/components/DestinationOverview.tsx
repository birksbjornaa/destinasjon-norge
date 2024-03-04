import Destination, { DestinationProps } from "./GalleryDestination";
import "../css/DestinationChooser.css";

export interface MainGalleryProps {
  destinations: DestinationProps[];
}

const DestinationsOverview: React.FC<MainGalleryProps> = ({ destinations }) => {
  return (
    <div className="DestinationOverview">
      {destinations.map((destination) => (
        <div key={destination.name} className="SingleDestination">
          <Destination
            name={destination.name as string}
            imageSrc={destination.imageSrc as string}
          />
        </div>
      ))}
    </div>
  );
};

export default DestinationsOverview;
