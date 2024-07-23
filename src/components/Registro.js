import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../Config/Config";
import styles from "../css/Registro.css";

function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apPat: "",
    apMat: "",
    email: "",
    password: "",
    telefono: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${Config.baseURL}/paciente/guardar`,
        formData
      );
      if (response.data === "Ok") {
        navigate("/");
      } else {
        setError("Error al registrar. Intente de nuevo.");
      }
    } catch (error) {
      setError("Ocurrió un error al registrar. Intente de nuevo.");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registroBackground}>
      <Container className={`d-flex justify-content-center align-items-center ${styles.registroContainer}`}>
        <Card className={styles.registroCard}>
          <Card.Body className={styles.registroCardBody}>
            <h2 className={styles.registroTitle}>
              Registro de Paciente
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre(s)</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Nombre(s)"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className={styles.registroInput}
                />
              </Form.Group>
              <div className="mb-3 d-flex">
                <div className="me-2 flex-grow-1">
                  <Form.Label>Apellido Paterno</Form.Label>
                  <Form.Control
                    type="text"
                    name="apPat"
                    placeholder="Apellido Paterno"
                    value={formData.apPat}
                    onChange={handleChange}
                    required
                    className={styles.registroInput}
                  />
                </div>
                <div className="flex-grow-1">
                  <Form.Label>Apellido Materno</Form.Label>
                  <Form.Control
                    type="text"
                    name="apMat"
                    placeholder="Apellido Materno"
                    value={formData.apMat}
                    onChange={handleChange}
                    required
                    className={styles.registroInput}
                  />
                </div>
              </div>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.registroInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={styles.registroInput}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  className={styles.registroInput}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                  className={styles.registroButton}
                >
                  {isLoading ? "Registrando..." : "Registrar"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/")}
                  className={styles.registroOutlineButton}
                >
                  Iniciar Sesión
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Registro;
