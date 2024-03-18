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
    loggedIn: false,
    email: "",
    role: "not logged in",
  });

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;

      if (userEmail && !(await hasUser(userEmail))) {
        await createNewUser(userEmail);
      }
      const databaseUser = await getUser(user.email);

      setUser({
        loggedIn: true,
        email: userEmail || "",
        role: databaseUser.role,
      });
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser?.email) {
        const userEmail = authUser.email;
        const userData = await getUser(userEmail);
        setUser({
          loggedIn: true,
          email: userEmail,
          role: userData.role,
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const value = {
    user,
    handleLogin,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
