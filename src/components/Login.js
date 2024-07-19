import axios from "axios";
import { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Config from "../Config/Config";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const loginValidate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(`${Config.baseURL}/login`, formData, {
        headers: Config.getHeaders(),
      });
      if (response.data.acceso === "OK") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("idUsuario", response.data.idUsuario);
        localStorage.setItem("nombreUsuario", response.data.nombreUsuario);

        console.log("Datos guardados en localStorage:", {
          token: response.data.token,
          idUsuario: response.data.idUsuario,
          nombreUsuario: response.data.nombreUsuario,
        });

        navigate("/home");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError(
        "Ocurrió un error al iniciar sesión. Por favor, intente de nuevo."
      );
      console.error("Ocurrió un error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: '#e9f5f9',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ width: "100%", maxWidth: "450px" }}
      >
        <Card
          className="shadow-lg border-0"
          style={{
            width: "100%",
            borderRadius: "12px", // Bordes redondeados del card
          }}
        >
          <Card.Body>
            <h2 className="text-center mb-4" style={{ color: "#003d5b" }}>
              Iniciar Sesión
            </h2>{" "}
            {/* Color profesional */}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={loginValidate}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    borderRadius: "8px",
                    borderColor: "#d6d6d6",
                    boxShadow: "none", // Elimina sombra del borde
                  }}
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
                  style={{
                    borderRadius: "8px",
                    borderColor: "#d6d6d6",
                    boxShadow: "none", // Elimina sombra del borde
                  }}
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
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate("/registro")}
                  style={{ borderRadius: "8px" }} // Bordes redondeados para el botón de registro
                >
                  Registrarse
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
