import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import { createNewUser, getUser, hasUser } from "../controllers/userController";

let user = { loggedIn: false, token: "", email: "", role: "user" };
export function Login() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        user.token = await result.user.getIdToken();
        user.email = result.user.email as string;
        if (user.email === null) {
          throw new Error("Email is null");
        }
        if (!(await hasUser(user.email))) {
          await createNewUser(user.token, user.email);
        }
        const databaseUser = await getUser(user.email);
        if (databaseUser) {
          user.role = databaseUser.role;
        }
        user.loggedIn = true;
        navigate("/");
      })
      .catch((error) => {
        // Handle errors here
      });
  };

  useEffect(() => {
    // time break 10 sek

    const navigateHome = onAuthStateChanged(auth, (inputUser) => {
      if (inputUser) {
        user.loggedIn = true;
        navigate("/");
      } else {
        handleLogin();
      }
    });

    return () => navigateHome();
  }, [auth, navigate]);

  return (
    <div>
      <NavBar handleLogoHomeClicked={() => navigate("/")} />
    </div>
  );
}

export { user };
