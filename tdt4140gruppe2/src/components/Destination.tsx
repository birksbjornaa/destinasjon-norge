export interface DestinationProps {
  name: string;
  imageSrc: string;
}

function Destination({ name, imageSrc }: DestinationProps) {
  return (
    <div className="Destination">
      <img src={imageSrc}></img>
      <span>{name}</span>
    </div>
  );
}

export default Destination;
