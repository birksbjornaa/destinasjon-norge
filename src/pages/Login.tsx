import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

let LoggedIn: boolean = false;

export default function Login() { 
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  
  signInWithRedirect(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
    if (user !== null){
      LoggedIn = true;
      console.log("Logged in");
      return (
        <Button>Go to home page
          <Link to="/"/>
        </Button>
      );
    } else {
      return (
        <div>
          <NavBar />
          <h1>Please wait</h1>
        </div>
      );}
  }).catch((error) => {
    console.log(error);
  });
  }
  export {LoggedIn};
  