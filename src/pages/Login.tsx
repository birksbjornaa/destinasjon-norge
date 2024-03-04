import { GoogleAuthProvider, getAuth, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/NavBar";
import { useEffect } from "react";


let LoggedIn: boolean = false;

export default function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      LoggedIn = true;
      navigate('/');
    }).catch((error) => {
      console.log(error);
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
  