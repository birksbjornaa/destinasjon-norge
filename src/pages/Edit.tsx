import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import FormChange from "../components/FormChange";

export default function AdminOverview() {

    let navigate = useNavigate();
    const goToHomePage = () => {
      navigate("/");
    };


    const goToeditDestination = (destinationId: string) => {
      navigate("/destination/" + destinationId);
    };

    return (

        <div className="AdminOverview">
          <NavBar handleLogoHomeClicked={goToHomePage} />
          <FormChange goToDestination={goToeditDestination}/>
        </div>



    )}
