import "../css/Main.css";
import profile from "../assets/profile.jpg";
import React, { useState } from "react";
import { Dropdown, Navbar, Container } from "react-bootstrap";

import BC_Logo from "../assets/LogoDestinasjonNorge.png";
// resize logo
// import { useWindowSize } from 'react-use';

const Logo = () => {
  return (
    <div>
      <img src={BC_Logo} width={125} height={125} alt="BC_Logo" />
    </div>
  );
};

//enkel måte å style en komponent på
// import styled from "styled-components";
// const Logo = styled.h1`
//     font-size: 1.5em;
//     margin: 0;
// `

//make horizontal navbar with logo and buttons
/* const NavBar = () => {
    return (
      <Navbar>
      <Container className="navbar-container">
        <Logo />
        <h1>Destinasjon Norge</h1>
        <ul className="navbar-nav">
          <li className="nav-item">Home</li>
          <li className="nav-item">Profile</li>
          <li className="nav-item">Settings</li>
        </ul>
      </Container>
    </Navbar>
    )
} */

const NavBar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <Navbar>
      <Container className="navbar-container">
        <Logo />
        <h1>Destinasjon Norge</h1>
        <button onClick={toggleMenu} id="menu-toggle">
          <img src={profile} width={50} height={50} alt="Profile" />
        </button>
        {showMenu && (
          <div className="menu">
            <button onClick={() => console.log("Navigating to Home")}>
              Home
            </button>
            <button onClick={() => console.log("Navigating to Profile")}>
              Profile
            </button>
            <button onClick={() => console.log("Navigating to Settings")}>
              Settings
            </button>
          </div>
        )}
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
