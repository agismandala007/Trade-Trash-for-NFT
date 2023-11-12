import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap';
import { BrowserRouter, NavLink } from "react-router-dom";
import DarkMode from '../assets/DarkMode/DarkMode';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Navigation() {
  return (
    <body>
    <Navbar expand="lg" className="bg-body-success">
      <Container>
        <Navbar.Brand href="/"><span>Kelola Sampah</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className='navbar-link' href="/">Beranda</Nav.Link>
            <Nav.Link className='navbar-link' href="/about">Tentang Kami</Nav.Link>
            <Nav.Link className='navbar-link' href="/">Kelola Sampah</Nav.Link>
            <Nav.Link className='navbar-link' href="/">Rewards</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <div className='metamask'>
          <ConnectButton 
            chainStatus="icon"
            accountStatus="avatar"
          />
          </div>
        </Navbar.Collapse>
        {/* <div className='theme-toggle'><i class="ri-moon-line"></i></div> */}
        <div className='darkmode'><DarkMode /></div>
      </Container>
    </Navbar>
    </body>
  );
}

export default Navigation;