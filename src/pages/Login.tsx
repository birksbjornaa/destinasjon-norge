import { getAuth, getRedirectResult, signInWithRedirect, GoogleAuthProvider, AuthCredential } from "firebase/auth";
import NavBar from "../components/NavBar";

export default function Login() {
  const provider = new GoogleAuthProvider();
  // For users security
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

  provider.setCustomParameters({
      'login_hint': 'user@gmail.com'
    });

  const auth = getAuth();
  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then((result) => {
      if (result){
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
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
      const credential: AuthCredential | null = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

    return (
      <div>
        <NavBar />
        <h1>Please wait</h1>
      </div>
    );
}