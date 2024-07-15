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
    Observaciones: "",
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

  // Maneja el cambio en el campo de observaciones
  const handleObservacionesChange = (e) => {
    setFormData({ ...formData, Observaciones: e.target.value });
  };

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
      if (!formData.fecha || !formData.Observaciones.trim()) {
        setError("Por favor complete todos los campos.");
        return;
      }

      const response = await instance.post(
        `/cita/guardar`,
        formData
      );
      //console.log(formData)
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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="shadow-lg p-3 mb-5 bg-white rounded w-100">
        <Col md={6} className="mx-auto">
          <h2 className="text-center mb-4">Registrar Cita</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={guardarCita}>
            <Form.Group controlId="formFecha" className="mb-4">
              <Form.Label className="d-block text-center mb-2">
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
              />
            </Form.Group>
            <Form.Group controlId="floatingTextarea2" className="mb-4">
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Observaciones"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "150px" }}
                  value={formData.Observaciones}
                  onChange={handleObservacionesChange}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="formEspecialidad" className="mb-4">
              <Form.Label>Seleccione una Especialidad</Form.Label>
              <Form.Select
                aria-label="Seleccione una especialidad"
                value={formData.id_especialidades}
                onChange={handleEspecialidadChange}
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
