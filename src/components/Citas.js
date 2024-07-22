import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Alert, Form } from "react-bootstrap";
import { Calendar } from "primereact/calendar";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useNavigate } from "react-router-dom";
import instance from "../Config/AxiosConfig";

function Citas() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [especialidades, setEspecialidades] = useState([]);
  const [formData, setFormData] = useState({
    idUsr: null,
    fecha: null,
    Observaciones: " ",
    estado: "Pendiente",
    id_especialidades: null,
    id_consultorio: null,
    id_doctor: null,
  });

  // Manejo del id del localStorage
  useEffect(() => {
    const obtenerEspecialidades = async () => {
      try {
        const response = await instance.get(`/especialidades`);
        setEspecialidades(response.data);
      } catch (error) {
        setError("Ocurrió un error al cargar las especialidades");
        console.error("Ocurrió un error: ", error);
      }
    };

    obtenerEspecialidades();

    const idUsr = localStorage.getItem("idUsuario");
    if (idUsr) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        idUsr: idUsr,
      }));
    }
  }, []);

  // Función para manejar el cambio en el calendario
  const handleCalendarChange = (e) => {
    setFormData({ ...formData, fecha: e.value });
  };

  // Función para manejar el cambio en el select de especialidades
  const handleEspecialidadChange = (e) => {
    setFormData({ ...formData, id_especialidades: e.target.value });
  };

  // Función para guardar la cita
  const guardarCita = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Validar datos antes de enviar la solicitud
      if (!formData.fecha ) {
        setError("Por favor complete todos los campos.");
        return;
      }

      const response = await instance.post(`/cita/guardar`, formData);
      if (response.data === "Ok") {
        navigate("/ver_citas");
      } else {
        setError(response.data.error || "Ocurrió un error desconocido.");
      }
    } catch (error) {
      setError("Ocurrió un error al registrar la cita.");
      console.error("Ocurrió un error: ", error);
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
        style={{ minHeight: "100vh" }}
      >
        <Row
          className="shadow-lg p-4 mb-5 bg-white rounded w-100"
          style={{ maxWidth: "600px" }}
        >
          <Col md={12} className="mx-auto">
            <h2 className="text-center mb-4" style={{ color: "#0056b3" }}>
              Registrar Cita
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={guardarCita}>
              <Form.Group controlId="formFecha" className="mb-4">
                <Form.Label className="d-block mb-2" style={{ color: "#333" }}>
                  Seleccione la Fecha y Hora
                </Form.Label>
                <Calendar
                  id="calendar-24h"
                  value={formData.fecha}
                  onChange={handleCalendarChange}
                  showTime
                  hourFormat="24"
                  showIcon
                  className="w-100"
                  style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                />
              </Form.Group>

              <Form.Group controlId="formEspecialidad" className="mb-4">
                <Form.Label style={{ color: "#333" }}>
                  Seleccione una Especialidad
                </Form.Label>
                <Form.Select
                  aria-label="Seleccione una especialidad"
                  value={formData.id_especialidades}
                  onChange={handleEspecialidadChange}
                  style={{ border: "1px solid #ced4da", borderRadius: "4px" }}
                >
                  <option value="">Seleccione una especialidad</option>
                  {especialidades.map((especialidad) => (
                    <option key={especialidad.id} value={especialidad.id}>
                      {especialidad.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" type="submit">
                  Guardar Cita
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={() => navigate("/home")}
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Citas;
