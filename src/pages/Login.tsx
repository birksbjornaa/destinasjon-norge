import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { getUser } from "../controllers/userController"

let LoggedIn: boolean = false;

export function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then(async (result) => {
      LoggedIn = true;

      const token = await result.user.getIdToken();
      if (result.user.email) {
        const email: string = result.user.email;
        getUser(token, email);
      } else {
        console.log("No user email");
      }

      navigate('/');
    }).catch((error) => {
      console.log('handlelogin', error);
    });
  };

  useEffect(() => {
    const navigateHome = onAuthStateChanged(auth, (user) => {
    if (user) {
      LoggedIn = true;
      navigate('/');
    } else {
      handleLogin();
    }
  });

  return () => navigateHome();
  }, [auth, navigate]);

return (<div><NavBar handleLogoHomeClicked={() => navigate("/")}/></div>);
}

export { LoggedIn };
  