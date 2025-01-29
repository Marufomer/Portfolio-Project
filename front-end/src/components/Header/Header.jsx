import React from 'react'
import './navbar.css'
import { Container, NavbarBrand, NavbarOffcanvas, NavbarToggle, Offcanvas, OffcanvasBody, Navbar, Nav, Button, NavLink, Col} from 'react-bootstrap'
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Modal_Search from '../Modal_Search/Modal_Search';


function Header() {

  

  function handleLogOut() {
    localStorage.removeItem('token');
  }
  return (
    <Navbar
      bg="white"
      expand="lg"
      className="header-outer py-3 shado position-sticky w-100 "
      style={{
        zIndex: "99",
        top: "0",
      }}
    >
      <Container>
        <Col>
          <Nav>
            <h2 className="logo">alx</h2>
          </Nav>
        </Col>

        <Col>
          <div className="search-outer">
            <Modal_Search />
          </div>
        </Col>
        <Col className="header-right">
          <NavbarToggle
            aria-controls={`offcanvasNavbar-expand-lg`}
          ></NavbarToggle>
          <NavbarOffcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <OffcanvasBody>
              <Nav className="justify-content-end flex-grow-1">
                <Nav.Link className="mx-3" href="/">
                  <HomeIcon className="icon-col" />
                </Nav.Link>

                <NavLink className="mx-3" href="/profile">
                  <PersonIcon className="icon-col" />
                </NavLink>
                <Nav.Link className="mx-3" onClick={handleLogOut} href='/login'>
                  <LogoutIcon className="icon-col" />
                </Nav.Link>
              </Nav>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header