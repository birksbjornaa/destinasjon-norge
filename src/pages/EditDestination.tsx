import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import EditForm from "../components/EditForm";

export default function AdminOverview() {
  let navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  const goToEditDestination = (destinationId: string) => {
    navigate("/destination/" + destinationId);
  };

  return (
    <div className="AdminOverview">
      <NavBar handleLogoHomeClicked={goToHomePage} />
      <EditForm goToDestination={goToEditDestination} />
    </div>
  );
}
