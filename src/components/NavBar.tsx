import "../css/Main.css";
import profile from "../assets/profile.jpg";
import React, { useState } from "react";
import { Dropdown, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import {loggedIn } from "../pages/Login.tsx";

import imgLogo from "../assets/LogoDestinasjonNorge.png";
// resize logo
// import { useWindowSize } from 'react-use';

const Logo = () => {
  return (
    <div>
      <img src={imgLogo} width={125} height={125} alt="imgLogo" />
    </div>
  );
};

// const LoggedIn: boolean = false;

const NavBar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <Navbar>
      <Container className="navbar-container">
        <Logo />
        <h1>Destinasjon Norge</h1>
        <div id="dropdown">
          <button onClick={toggleMenu} id="menu-toggle">
            <img id="menuimg" src={profile} alt="Profile" />
          </button>
          {showMenu && (
            <ul className="menu-list">
              <li className="menu">
                <button onClick={() => console.log("Navigating to Home")} >
                  Home
                </button>
              </li>
              {loggedIn? (
                <li>
                  {/* <button onClick={() => console.log("Navigating to Profile")}>
                    Profile
                  </button> */}
                  <Link to="/login">
                    <button onClick={() => console.log("Navigating to Login")}>
                       Login
                    </button>
                </Link>
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

{
  /* <ul>
    <Logo />
    <li>Home</li>
    <li>Profile</li>
    <li>Settings</li>
</ul> */
}
