import "../css/Profile.css";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import ProfileUserInfo from "../components/ProfileUserInfo";

export function Profile() {
  // om vi trenger å hente data, se Home

  let navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className="homepage">
      <NavBar handleLogoHomeClicked={goToHomePage} />
      <ProfileUserInfo />
    </div>
  );
}