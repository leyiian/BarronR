import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Config from "../Config/Config";

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
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e9f5f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", backgroundColor: "#e9f5f9" }} // Color de fondo suave
      >
        <Card
          className="shadow-lg border-0"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: "#003d5b" }}>
              Registro de Paciente
            </h2>{" "}
            {/* Color profesional */}
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
                  style={{ borderRadius: "8px", borderColor: "#d6d6d6" }} // Borde suave
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
                    style={{ borderRadius: "8px", borderColor: "#d6d6d6" }} // Borde suave
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
                    style={{ borderRadius: "8px", borderColor: "#d6d6d6" }} // Borde suave
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
                  style={{ borderRadius: "8px", borderColor: "#d6d6d6" }} // Borde suave
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
                  style={{ borderRadius: "8px", borderColor: "#d6d6d6" }} // Borde suave
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
                  style={{ borderRadius: "8px", borderColor: "#d6d6d6" }} // Borde suave
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isLoading}
                  style={{
                    borderRadius: "8px",
                    backgroundColor: "#003d5b",
                    borderColor: "#003d5b",
                  }} // Color de botón profesional
                >
                  {isLoading ? "Registrando..." : "Registrar"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/")}
                  style={{ borderRadius: "8px" }} // Bordes redondeados para el botón de iniciar sesión
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
