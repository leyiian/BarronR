import React, { useEffect, useState } from "react";
import { Container, Alert, Row, Col } from "react-bootstrap";
import styles from "../css/Home.css";

function Home() {
  const [nombreUsuario, setNombreUsuario] = useState("");

  useEffect(() => {
    const nombre = localStorage.getItem("nombreUsuario");
    if (nombre) {
      setNombreUsuario(nombre);
    }
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            {nombreUsuario && (
              <Alert variant="success" className={styles.alertContainer}>
                <h2 className={styles.alertTitle}>¡Bienvenido, {nombreUsuario}!</h2>
                <p className={styles.alertText}>
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
