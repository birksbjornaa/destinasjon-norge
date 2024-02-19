import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "../css/Main.css";


import BC_Logo from "../assets/LogoDestinasjonNorge.png";
// resize logo
// import { useWindowSize } from 'react-use';

const Logo = () => {
  return (
    <div>
      <img src={BC_Logo} width={125} height={125} alt="BC_Logo" />
    </div>
  )
}

//enkel måte å style en komponent på
// import styled from "styled-components";
// const Logo = styled.h1`
//     font-size: 1.5em;
//     margin: 0;
// `

//make horizontal navbar with logo and buttons
const NavBar = () => {
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
}

export default NavBar;


{/* <ul>
    <Logo />
    <li>Home</li>
    <li>Profile</li>
    <li>Settings</li>
</ul> */}