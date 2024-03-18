import React from "react";
import "firebase/auth";

export interface User {
  loggedIn: boolean;
  email: string;
  role: string;
}

export interface UserState {
  user: User;
  handleLogin: () => Promise<void>;
}
export const AuthContext = React.createContext<UserState | null>(null);
