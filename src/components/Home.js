import React, { useEffect, useState } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";

function Home() {
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const nombre = localStorage.getItem("nombreUsuario");
    if (nombre) {
      setNombreUsuario(nombre);
    }
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {nombreUsuario && (
              <Alert variant="success" className="text-center p-4 shadow-lg rounded">
                <h2 className="mb-3">¡Bienvenido, {nombreUsuario}!</h2>
                <p className="mb-0">Estamos felices de verte de nuevo. ¡Disfruta tu tiempo aquí!</p>
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
