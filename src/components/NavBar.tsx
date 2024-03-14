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

              </li>
              {LoggedIn ? (
                <li>
                  <Link to="/profile">
                    <button>Profile</button>
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <button>Login</button>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default NavBar;
