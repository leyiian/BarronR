import React, { useEffect, useState } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import "../css/Home.css"; // Asegúrate de que la ruta sea correcta

function Home() {
  const [nombreUsuario, setNombreUsuario] = useState("");

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
            {nombreUsuario && (
              <Alert variant="success" className="alertContainer">
                <h2 className="alertTitle">¡Bienvenido, {nombreUsuario}!</h2>
                <p className="alertText">
                  Estamos felices de verte de nuevo. ¡Disfruta tu tiempo aquí!
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
