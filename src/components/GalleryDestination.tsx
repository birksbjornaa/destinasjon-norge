import "../css/Main.css";

export interface DestinationProps {
  id: string;
  name: string;
  imageSrc: string;
  region: string;
  description: string;
}

function Destination({
  id,
  name,
  imageSrc,
  region,
  description,
}: DestinationProps) {
  return (
    <div className="Destination">
      <img src={imageSrc} alt={name} className="destination-image" />
      <span className="destination-name">{name}</span>
    </div>
  );
}

export default Destination;
