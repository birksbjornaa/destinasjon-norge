import NavBar from "../components/NavBar";
import Form from "../components/Form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FacebookAuthProvider } from "firebase/auth/cordova";

// const goToHomePage = () => {
//   navigate("/");
// };


// let navigate = useNavigate();

export default function NewDestination() {
  return (

    <div>
          {/* <NavBar /> */}
      <h1>Her kommer mulighet for å leggtil/endre/slette destinasjoner</h1>
      <Form />

    </div>
  );
}
