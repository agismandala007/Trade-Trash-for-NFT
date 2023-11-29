import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { BrowserRouter, NavLink } from "react-router-dom";
import DarkMode from '../assets/DarkMode/DarkMode';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from '../assets/img/logo.webp'
function Navigation() {
  return (
    <body>
    <Navbar expand="lg" className="bg-body-success">
      <Container>
        <Navbar.Brand href="/"><img src={logo}></img><span className='GroupName'>SWM |<span>| Group</span></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav m-auto">
            <Nav.Link className='navbar-link' href="/">Beranda</Nav.Link>
            <Nav.Link className='navbar-link' href="/about">Tentang Kami</Nav.Link>
            <Nav.Link className='navbar-link' href="/kelola">Kelola Sampah</Nav.Link>
            <Nav.Link className='navbar-link' href="/nft">Rewards</Nav.Link>
          </Nav>
          <div className='metamask'>
          <ConnectButton 
            chainStatus="icon"
            accountStatus="avatar"
          />
          </div>
        <div className='darkmode'><DarkMode /></div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </body>
  );
}

export default Navigation;