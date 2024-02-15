import { addDoc, collection } from "@firebase/firestore";
import { SyntheticEvent, useRef } from 'react';
import { firestore } from "../components/firebaseConfig";
import Header from "../components/Header";
import profile from '../assets/profile.jpg';
import { Nav } from "react-bootstrap";
import NavBar from "../components/NavBar";
import MainText from "../components/MainText";
import MainGallery from "../components/MainGallery";
import SubHeader from "../components/SubHeader";
import SubList from "../components/SubList";

export default function Home() {
  const messageRef = useRef<HTMLInputElement>(null);
  const ref = collection(firestore,"messages");

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

  return(
    <div>
      <NavBar />
      {/* <MainText /> */}
      <MainGallery />
      <SubHeader string = 'Mest populære' />
      <SubList />
      <SubHeader string = 'Anbefalt' />
      <SubList />
    </div>
  )
}