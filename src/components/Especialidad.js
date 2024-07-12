import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Row, Button, Container, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Config from "../Config/Config";
import instance from "../Config/AxiosConfig";

function Especialidad() {
  const [especialidad, setEspecialidad] = useState("");
  const { id } = useParams();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fnEspecialidad();
    }
  }, [id]);

  const fnEspecialidad = async () => {
    try {
      const response = await instance.post(`/especialidad`, { id });
      setEspecialidad(response.data.nombre);
    } catch (error) {
      setError("Ocurrió un error al cargar la especialidad");
      console.error("Ocurrió un error: ", error);
    }
  };

  const enviarEspecialidad = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post(`/especialidad/guardar`, {
        id,
        nombre: especialidad,
      });
      if (response.data === "OK") {
        navigate("/home");
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Ocurrió un error en el servidor");
      console.error("Ocurrió un error: ", error);
    }
  };

  return (
    <Container className="mt-5">
      <Col md={{ span: 6, offset: 3 }}>
        <h1 className="text-center mb-4">Especialidades</h1>
        <Form onSubmit={enviarEspecialidad} className="p-4 border rounded shadow">
          <Form.Group controlId="formId" className="d-none">
            <Form.Control type="text" value={id} readOnly />
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formEspecialidad">
            <Form.Label column sm="3">
              Especialidad
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Ingrese la especialidad"
                value={especialidad}
                required
                onChange={(e) => setEspecialidad(e.target.value)}
              />
            </Col>
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="outline-success" type="submit" className="w-100 mt-3">
            Guardar
          </Button>
        </Form>
      </Col>
    </Container>
  );
}

export default Especialidad;
