import "../css/Main.css";
import profile from "../assets/profile.jpg";
import React, { useState } from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LoggedIn } from "../pages/Login.tsx";

import imgLogo from "../assets/LogoDestinasjonNorge.png";

interface navBarProps {
  handleLogoHomeClicked: () => void;
}

const NavBar: React.FC<navBarProps> = ({ handleLogoHomeClicked }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <Navbar>
      <Container className="navbar-container">
        <div className="logo">
          <img
            src={imgLogo}
            width={125}
            height={125}
            alt="imgLogo"
            onClick={() => handleLogoHomeClicked()}
          />
        </div>
        <h1>Destinasjon Norge</h1>
        <div id="dropdown">
          <button onClick={toggleMenu} id="menu-toggle">
            <img id="menuimg" src={profile} alt="Profile" />
          </button>
          {showMenu && (
            <ul className="menu-list">
              <li className="menu">
                <button onClick={() => console.log("Navigating to Home")}>
                  Home
                </button>
                <button onClick={() => handleLogoHomeClicked()}>Home</button>
              </li>
              {LoggedIn ? (
                <li>
                  <button onClick={() => console.log("Navigating to Profile")}>
                    Profile
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <button onClick={() => console.log("Navigating to Login")}>
                      Login
                    </button>
                  </Link>
                </li>
              )}
              <li>
                <button onClick={() => console.log("Navigating to Settings")}>
                  Settings
                </button>
              </li>
            </ul>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
