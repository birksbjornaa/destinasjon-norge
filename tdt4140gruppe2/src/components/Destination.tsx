interface Props {
  name: string;
  src: string;
}

function Destination({ name, src }: Props) {
  return (
    <div className="Destination">
      <img src={src}></img>
      <span>{name}</span>
    </div>
  );
}

export default Destination;
