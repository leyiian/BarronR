import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Calendar } from "primereact/calendar";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Config from "../Config";
import { useNavigate } from "react-router-dom";

function Citas() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    id_paciente: null,
    fecha: null,
    Observaciones: "",
    id_consultorio: null,
    id_doctor: null,
  });

  // Manejo del id del localStorage
  useEffect(() => {
    const id_paciente = localStorage.getItem("idUsuario");
    if (id_paciente) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id_paciente: id_paciente,
      }));
    }
  }, []);

  // Maneja el cambio en el campo de observaciones
  const handleObservacionesChange = (e) => {
    setFormData({ ...formData, Observaciones: e.target.value });
  };

  // Función para manejar el cambio en el calendario
  const handleCalendarChange = (e) => {
    setFormData({ ...formData, fecha: e.value });
  };

  // Función para guardar la cita
  const guardarCita = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validar datos antes de enviar la solicitud
      if (!formData.fecha || !formData.Observaciones.trim()) {
        setError("Por favor complete todos los campos.");
        return;
      }

      const response = await axios.post(
        `${Config.baseURL}/cita/guardar`,
        formData
      );
      if (response.data === "Ok") {
        navigate("/home");
      } else {
        setError(response.data.error || "Ocurrió un error desconocido.");
      }
    } catch (error) {
      setError("Ocurrió un error al registrar la cita.");
      console.error("Ocurrió un error: ", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="shadow-lg p-3 mb-5 bg-white rounded w-100">
        <Col md={6} className="mx-auto">
          <h2 className="text-center mb-4">Registrar Cita</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={guardarCita}>
            <Form.Group controlId="formFecha" className="mb-4">
              <Form.Label className="d-block text-center mb-2">Seleccione la Fecha y Hora</Form.Label>
              <Calendar
                id="calendar-24h"
                value={formData.fecha}
                onChange={handleCalendarChange}
                showTime
                hourFormat="24"
                showIcon
                className="w-100"
              />
            </Form.Group>
            <Form.Group controlId="floatingTextarea2" className="mb-4">
              <FloatingLabel controlId="floatingTextarea2" label="Observaciones">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "150px" }}
                  value={formData.Observaciones}
                  onChange={handleObservacionesChange}
                />
              </FloatingLabel>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Guardar Cita
              </Button>
              <Button variant="secondary" onClick={() => navigate("/home")}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Citas;
