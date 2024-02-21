import { addDoc, collection } from "@firebase/firestore";
import { SyntheticEvent, useRef } from "react";
import { firestore } from "../components/firebaseConfig";
import NavBar from "../components/NavBar";
import MainGallery from "../components/MainGallery";
import SubHeader from "../components/SubHeader";
import SubList from "../components/SubList";
import "../css/Main.css";
import { destinationsDemoData } from "../components/DemoData";

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
      <NavBar />
      {/* <MainText /> */}
      <MainGallery destinations={destinationsDemoData} />
      <SubHeader string="Mest populære" />
      <SubList />
      <SubHeader string="Anbefalt" />
      <SubList />
    </div>
  );
}
