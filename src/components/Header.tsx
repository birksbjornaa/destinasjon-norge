import React from "react";
import profile from "../assets/profile.jpg";

interface HeaderProps {
  myProfile: "strprofiing"; //dette skal være et bilde av en bruker + funksjonalitet senere
  onClick: () => void;
  homeButton: string; //her skal det være bilde av logo + tittel slik at man kan trykke på alt av det og komme til startside
}

const Header: React.FC<HeaderProps> = ({
  onClick,
  homeButton,
  myProfile = profile,
}) => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
      }}
    >
      <button
        onClick={onClick}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <img src={homeButton} alt="" style={{ height: "50px" }} /> {}
      </button>

      <img src={myProfile} alt="Profile" style={{ height: "50px" }} />
    </header>
  );
};

export default Header;
