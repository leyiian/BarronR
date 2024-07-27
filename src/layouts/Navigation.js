import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "../css/Navbar.css"; // Archivo CSS para estilos personalizados

function Navigation() {
  const location = useLocation();

  // Lista de rutas donde no queremos mostrar la navbar
  const hideNavbarRoutes = ["/", "/registro"];

  // Verifica si la ruta actual está en la lista de rutas ocultas
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  if (shouldHideNavbar) {
    return null; // No renderizar la navbar si la ruta está en la lista de rutas ocultas
  }

  const handleLogout = () => {
    localStorage.clear();
    // Redirige al usuario a la página de inicio o login después de cerrar sesión
    window.location.href = '/';
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/home" className="custom-brand">
          Hospital Yes I DO
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/nueva_cita" className="nav-link">
              Generar cita
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ver_citas" className="nav-link">
              Ver mis citas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/aviso_privacidad" className="nav-link">
              Aviso de Privacidad
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sobre_nosotros" className="nav-link">
              Sobre Nosotros
            </Nav.Link> 
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown title="Cuenta" id="account-nav-dropdown" align="end">
              <NavDropdown.Item as={NavLink} to="/">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/" onClick={handleLogout}>
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
