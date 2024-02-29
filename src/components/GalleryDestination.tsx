import "../css/Main.css";

export interface DestinationProps {
  name: string;
  imageSrc: string;
  price: number;
}

function Destination({ name, imageSrc, price }: DestinationProps) {
  return (
    <div className="Destination">
      <img src={imageSrc} alt={name} className="destination-image" />
      <span className="destination-name">{name}</span>
      <span className="destination-price">{price}</span>
    </div>
  );
}

export default Destination;
