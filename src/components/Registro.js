import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Config from "../Config";

function Registro() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const registroxd = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${Config.baseURL}/registro`, formData);
      if (response.data.acceso === "Ok") {
        navigate('/')
      } else {
        setError(response.data.error || 'Ocurrió un error desconocido.');
      }
    } catch (error) {
      setError('Ocurrió un error al registrar el usuario.');
      console.error('Ocurrió un error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center mb-4">Registro</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={registroxd}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingrese su contraseña"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    {isLoading ? 'Registrando...' : 'Registrarse'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center mt-3">
            ¿Ya tienes una cuenta? <a href="/">Inicia sesión</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Registro;