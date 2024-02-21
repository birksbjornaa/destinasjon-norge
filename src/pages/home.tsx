import NavBar from "../components/NavBar";
import MainGallery from "../components/MainGallery";
import SubHeader from "../components/SubHeader";
import SubList from "../components/SubList";
import "../css/Main.css";
import { getAllDestinations } from "../controllers/fierbaseController";
import { DestinationProps } from "../components/GalleryDestination";
import { useEffect, useState } from "react";

export default function Home() {
  const [destinations, setDestinations] = useState<DestinationProps[]>([]);

  useEffect(() => {
    fetchAndSetData();
  }, []);

  const fetchAndSetData = async () => {
    const destinations = await getAllDestinations();
    setDestinations(destinations);
  };

  //const handleHomeClick = () => {
  // Logikken for å navigere tilbake til hjemmesiden
  //};

  // return (
  //   <div>
  //      <Header
  //       myProfile= {profile}
  //       homeButton="logoOgTittel" // Erstatt med stien til din hjem-logo
  //       onClick={handleHomeClick}
  //     />
  //     <form onSubmit={handleSave}>
  //       <label>Enter Message</label>
  //       <input type="text" ref={messageRef} />
  //       <button type="submit" >Save</button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="homepage">
      <NavBar />
      {/* <MainText /> */}
      <MainGallery destinations={destinations} />
      <SubHeader string="Mest populære" />
      <SubList />
      <SubHeader string="Anbefalt" />
      <SubList />
    </div>
  );
}
