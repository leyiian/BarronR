// Navbar.js

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function Navigation() {
  const location = useLocation();

  // Lista de rutas donde no queremos mostrar la navbar
  const hideNavbarRoutes = ['/login', '/registro'];

  // Verifica si la ruta actual está en la lista de rutas ocultas
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  if (shouldHideNavbar) {
    return null; // No renderizar la navbar si la ruta está en la lista de rutas ocultas
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/home">UTTEC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/especialidades">
              Especialidad
            </Nav.Link>
            <Nav.Link as={NavLink} to="/nueva_cita" >Generar cita</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
