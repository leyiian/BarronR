import React, { useEffect, useState } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import "../css/Home.css"; // Asegúrate de que la ruta sea correcta
import useAuth from "../Service/Auth"; // Importa el hook de autenticación

function Home() {
  const [nombreUsuario, setNombreUsuario] = useState("");

  // Usar el hook de autenticación para manejar la lógica de autenticación
  useAuth();

  useEffect(() => {
    const nombre = localStorage.getItem("nombreUsuario");
    if (nombre) {
      setNombreUsuario(nombre);
    }
  }, []);

  return (
    <div className="homeContainer">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {nombreUsuario ? (
              <Alert variant="success" className="alertContainer">
                <h2 className="alertTitle">¡Bienvenido de nuevo, {nombreUsuario}!</h2>
                <p className="alertText">
                  Estamos felices de verte de nuevo. ¡Disfruta tu tiempo aquí!
                </p>
              </Alert>
            ) : (
              <Alert variant="info" className="alertContainer">
                <h2 className="alertTitle">¡Bienvenido a nuestro sitio!</h2>
                <p className="alertText">
                  Por favor, inicia sesión para disfrutar de todas las funcionalidades.
                </p>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

