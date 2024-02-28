import { getAuth, getRedirectResult, signInWithRedirect, GoogleAuthProvider, AuthCredential } from "firebase/auth";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

// let LoggedIn: boolean = false;
// export {loggedIn};

export default function Login() { 
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const provider = new GoogleAuthProvider();
    // For users security
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    
    provider.setCustomParameters({
        'login_hint': 'user@gmail.com'
      });
    
    const auth = getAuth();
    signInWithRedirect(auth, provider);
    
    getRedirectResult(auth)
      .then((result) => {
        if (result){
          // This gives you a Google Access Token. You can use it to access Google APIs.
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential?.accessToken;
          // The signed-in user info.
          // const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          if (result && result.user) {
            // If a user is logged in, update LoggedIn variable and set isLoading to false
            // LoggedIn = true;
            setLoggedIn(true);
          }
        }
        else{
          // Logic for handling the case where result is null
        }
      }).catch((error) => {
        // Handle Errors here.
        const errorCode: string = error.code;
        const errorMessage: string = error.message;
        // The email of the user's account used.
        const email: string | undefined = error.customData?.email;
        // The AuthCredential type that was used.
        // const credential: AuthCredential | null = GoogleAuthProvider.credentialFromError(error);
        // ...
        
        console.log(errorCode, errorMessage, "email trying to login:",);
      });

  })
    if (loggedIn){
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
}
