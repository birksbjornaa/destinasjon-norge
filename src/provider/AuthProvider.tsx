import React, { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { createNewUser, getUser, hasUser } from "../controllers/userController";
import { AuthContext } from "../context/AuthContext";
import { User } from "../context/AuthContext";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [user, setUser] = useState<User>({
    id: "",
    loggedIn: false,
    email: "",
    role: "not logged in",
    tags: [],
  });

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      if (userEmail && !(await hasUser(userEmail))) {
        await createNewUser(userEmail);
      }

      await downloadAndSetUser(user.email);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser?.email) {
        await downloadAndSetUser(authUser.email);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  async function downloadAndSetUser(email: string) {
    const userData = await getUser(email);

    if (userData) {
      setUser({
        ...userData,
        loggedIn: true,
      });
    }
  }

  const value = {
    user,
    handleLogin,
    downloadAndSetUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
