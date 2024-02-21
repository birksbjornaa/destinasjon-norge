import "../css/Main.css";

export interface DestinationProps {
  name: string;
  imageSrc: string;

}

function Destination({ name, imageSrc }: DestinationProps) {
  return (
    <div className="Destination">
    <img src={imageSrc} alt={name} className="destination-image" />
    <span className="destination-name">{name}</span>
  </div>
  );
}

export default Destination;
