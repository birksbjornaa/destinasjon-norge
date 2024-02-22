import { addDoc, collection } from "@firebase/firestore";
import { SyntheticEvent, useRef } from "react";
import { firestore } from "../components/firebaseConfig";
import NavBar from "../components/NavBar";
import MainGallery from "../components/MainGallery";
import SubHeader from "../components/SubHeader";
import "../css/Main.css";
import { destinationsDemoData } from "../components/DemoData";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const messageRef = useRef<HTMLInputElement>(null);
  const ref = collection(firestore, "messages");

  const handleSave = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(messageRef.current?.value);

    let data = {
      message: messageRef.current?.value,
    };

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleHomeClick = () => {
    // Logikken for å navigere tilbake til hjemmesiden
  };

  return (
    <div className="homepage">
      <div>
        <NavBar />
      </div>
      <SearchBar />
      <div className="mainDestinations">
        <MainGallery destinations={destinationsDemoData} />
      </div>
      <SubHeader string="Mest populære" />
      <div className="mainDestination">
          <MainGallery destinations={destinationsDemoData}
          showArrows={false}
          />{" "}
          {/** Legg inn data her */}
      </div>
      <SubHeader string="Vi anbefaler" />
      <div className="mainDestination">
        <MainGallery destinations={destinationsDemoData}
          showArrows={false}
        />{" "}
        {/** Legg inn data her */}
      </div>
    </div>
  );
}
