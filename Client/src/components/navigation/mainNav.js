import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";

import { AuthContext } from "../context/auth-context";

const MainNav = ({ token }) => {
  const auth = useContext(AuthContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Food App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated Action
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {auth.isLoggedIn && (
            <>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link onClick={auth.logout}>Logout</Nav.Link>
            </>
          )}
          {!auth.isLoggedIn && <Nav.Link href="/login">Login</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
