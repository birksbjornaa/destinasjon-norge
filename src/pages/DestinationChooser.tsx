import { FilteringBar } from "../components/FilteringBar";
import "../css/DestinationChooser.css";
import NavBar from "../components/NavBar";

export default function DestinationChooser() {
  //funkjson som henter data fra database
  //hente data fra nettsiden
  //filtrerer

  return (
    <div>
      {/* </div> liste.map */}
      {/* <Destination skrive inn data /> */}
      <NavBar />
      <FilteringBar />
      <h2>Her kommer destinasjoner</h2>
    </div>
  );
}
