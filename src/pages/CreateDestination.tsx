import Form from "../components/Form";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";

export default function CreateDestination() {
  let navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  const goToNewDestination = (destinationId: string) => {
    navigate("/destination/" + destinationId);
  };
  return (
    <div>
      <NavBar handleLogoHomeClicked={goToHomePage} />
      <Form goToDestination={goToNewDestination} />
    </div>
  );
}
