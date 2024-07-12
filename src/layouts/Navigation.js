// Navbar.js

import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import '../css/Navbar.css'; // Archivo CSS para estilos personalizados

function Navigation() {
  const location = useLocation();

  // Lista de rutas donde no queremos mostrar la navbar
  const hideNavbarRoutes = ['/', '/registro'];

  // Verifica si la ruta actual está en la lista de rutas ocultas
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  if (shouldHideNavbar) {
    return null; // No renderizar la navbar si la ruta está en la lista de rutas ocultas
  }

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/home" className="custom-brand">UTTEC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/especialidades">
              Especialidad
            </Nav.Link>

            <NavDropdown title="Citas" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to="/nueva_cita">Generar cita</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/ver_citas">Ver mis citas</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown title="Cuenta" id="account-nav-dropdown" align="end">
              <NavDropdown.Item as={NavLink} to="/">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/logout">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
