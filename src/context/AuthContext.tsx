import React from "react";
import "firebase/auth";

export interface User {
  id: string;
  loggedIn: boolean;
  email: string;
  role: string;
  tags: string[];
}

export interface UserState {
  user: User;
  handleLogin: () => Promise<void>;
  downloadAndSetUser: (email: string) => Promise<void>;
}
export const AuthContext = React.createContext<UserState | null>(null);
