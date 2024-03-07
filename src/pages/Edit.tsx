import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminOverview() {

    let navigate = useNavigate();
    const goToHomePage = () => {
      navigate("/");

    };

    return (

        <div className="AdminOverview">
          <NavBar handleLogoHomeClicked={goToHomePage} />
        </div>



    )}
