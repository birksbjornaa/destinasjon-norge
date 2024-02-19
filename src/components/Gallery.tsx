import { ReactNode } from "react";
import Destination from "./Destination"
import { child } from "firebase/database";


  interface props {
    children: ReactNode[];
  }

function gallery({children}:props){
    return (

        <div>
            {children}
        </div>

    )

}



