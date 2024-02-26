import { ReactNode } from "react";
import { child } from "firebase/database";

interface props {
  children: ReactNode[];
}

function gallery({ children }: props) {
  return <div>{children}</div>;
}
